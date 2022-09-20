import * as express from 'express';
import * as todosRepository from './todos-repository';
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

router.use(authMiddleware);

router.get('/', (_, res) => {
  res.send({ todos: todosRepository.getTodos(res.locals.user) });
});

router.post('/', (req, res) => {
  const newTodo = todosRepository.addTodo(res.locals.user, req.body.label);
  res.send(newTodo);
});

router.put('/:id/toggle', (req, res) => {
  const newTodo = todosRepository.toggleTodo(req.params.id);
  res.send(newTodo);
});

router.delete('/:id', (req, res) => {
  todosRepository.removeTodo(req.params.id);
  res.send(req.params.id);
});

export default router;
