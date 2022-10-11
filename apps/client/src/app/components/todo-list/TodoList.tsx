import { Grid, Typography, LinearProgress, Button } from '@mui/material';
import { useStiggContext } from '@stigg/react-sdk';
import { useEffect, useState } from 'react';
import {
  useTodos,
  fetchTodos,
  addTodo,
  removeTodo,
  updateTodo,
} from '../../hooks/todos/useTodos';
import { PaywallDialog } from '../paywall/PaywallDialog';
import { TodoItems } from './TodoItems';
import { TodoListFooter } from './TodoListFooter';
import { TodoListHeader } from './TodoListHeader';
import { StyledCard } from './TodosCard';
import { getUsagePercentage, getUsageProgressColor } from '../utils';
import { UpdateTodoModal } from './UpdateTodoModal';
import { Todo } from '../../types';

export function TodoList() {
  const { todos, isLoading, dispatch } = useTodos();
  const { stigg } = useStiggContext();
  const [isAdding, setIsAdding] = useState(false);
  const [isPaywallOpen, setIsPaywallOpen] = useState(false);
  const [todoToUpdate, setTodoToUpdate] = useState<Todo | null>(null);
  const [removedTodo, setRemovedTodo] = useState<string | null>(null);

  useEffect(() => {
    fetchTodos(dispatch);
  }, [dispatch]);

  const todosEntitlement = stigg.getMeteredEntitlement({
    featureId: 'feature-todos',
    options: {
      requestedUsage: 1,
      fallback: { usageLimit: 5, hasAccess: true },
    },
  });
  const canAddTodo = todosEntitlement.hasAccess;
  const todosLimit = todosEntitlement.usageLimit || 5;
  const isUnlimitedTodos = todosEntitlement.isUnlimited;

  const updateTodoEntitlement = stigg.getBooleanEntitlement({
    featureId: 'feature-update-todo',
  });
  const canUpdateTodo = updateTodoEntitlement.hasAccess;

  const onAddTodo = async (todoLabel: string) => {
    setIsAdding(true);
    await addTodo(dispatch, { todoLabel });
    await stigg?.refresh();
    setIsAdding(false);
  };

  const onToggleTodo = (todoId: string, completed: boolean) => {
    updateTodo(dispatch, { todoId, completed });
  };

  const onSaveChanges = async (label: string) => {
    if (todoToUpdate) {
      await updateTodo(dispatch, {
        todoId: todoToUpdate.id,
        label: label,
      });
    }
  };

  const onRemoveTodo = async (todoId: string) => {
    setRemovedTodo(todoId);
    await removeTodo(dispatch, { todoId });
    await stigg?.refresh();
    setRemovedTodo(null);
  };

  const onUpgrade = () => {
    setIsPaywallOpen(true);
  };

  const usagePercentage = isUnlimitedTodos
    ? 0
    : getUsagePercentage(todos.length, todosLimit);

  return (
    <Grid
      position="relative"
      container
      alignItems="center"
      justifyContent="center"
      mt={6}
    >
      <Grid
        item
        container
        maxWidth={700}
        flexDirection="column"
        alignItems="flex-start"
        justifyContent="center"
      >
        <Grid item mb={2}>
          <Typography color="text.primary" component="span">
            {todos.length} / {isUnlimitedTodos ? 'unlimited' : todosLimit} todos
          </Typography>
          <Button sx={{ margin: 0 }} onClick={onUpgrade}>
            Upgrade
          </Button>
          <LinearProgress
            variant="determinate"
            value={usagePercentage}
            color={getUsageProgressColor(usagePercentage)}
          />
        </Grid>
        <Grid item>
          <StyledCard elevation={8}>
            <Grid container flexDirection="column">
              <TodoListHeader
                onAddTodo={onAddTodo}
                canAddTodo={canAddTodo}
                isAdding={isAdding}
              />
              <TodoItems
                isLoading={isLoading}
                todos={todos}
                onToggleTodo={onToggleTodo}
                onRemoveTodo={onRemoveTodo}
                onUpdateTodo={(todo: Todo) => setTodoToUpdate(todo)}
                removedTodo={removedTodo}
                canUpdateTodo={canUpdateTodo}
                onUpgrade={onUpgrade}
              />
              <TodoListFooter todos={todos} />
            </Grid>
          </StyledCard>
        </Grid>
      </Grid>

      <PaywallDialog
        paywallIsOpen={isPaywallOpen}
        onClose={() => setIsPaywallOpen(false)}
      />
      <UpdateTodoModal
        open={!!updateTodo}
        onClose={() => setTodoToUpdate(null)}
        todo={todoToUpdate}
        onSave={onSaveChanges}
      />
    </Grid>
  );
}
