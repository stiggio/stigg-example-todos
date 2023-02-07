import * as express from 'express';
import * as todosRepository from './todos-repository';
import { authMiddleware } from '../middleware/authMiddleware';
import { checkMeteredEntitlement } from '../middleware/checkMeteredEntitlement';
import { stiggClient, ENTITLEMENTS_IDS } from '../stiggClient';

const router = express.Router();

router.use(authMiddleware);

const checkTodosEntitlement = (requestUsage?: number) =>
  checkMeteredEntitlement(
    ENTITLEMENTS_IDS.todos,
    {
      hasAccess: true,
      usageLimit: 5,
    },
    () => requestUsage
  );

router.get('/', checkTodosEntitlement(), async (req, res) => {
  const bla = await stiggClient.getEntitlements(req.user.stiggCustomerId);
  console.log(`custpmer entitlements`, bla);
  const todos = await todosRepository.getTodos(req.user.email);
  res.send({ todos });
});

router.post('/', checkTodosEntitlement(1), async (req, res) => {
  const newTodo = await todosRepository.addTodo(req.user.email, req.body.label);
  await stiggClient.reportUsage({
    customerId: req.user.stiggCustomerId,
    featureId: ENTITLEMENTS_IDS.todos,
    value: 1,
  });
  res.send(newTodo);
});

router.put('/:id', checkTodosEntitlement(), async (req, res) => {
  const { completed, label } = req.body;
  const updatedTodo = await todosRepository.updateTodo(
    parseInt(req.params['id']),
    {
      completed,
      label,
    }
  );
  res.send(updatedTodo);
});

router.delete('/:id', checkTodosEntitlement(), async (req, res) => {
  const { id } = req.params;
  await todosRepository.removeTodo(parseInt(id));
  await stiggClient.reportUsage({
    customerId: req.user.stiggCustomerId,
    featureId: ENTITLEMENTS_IDS.todos,
    value: -1,
  });
  res.send(id);
});

export default router;
