import * as express from 'express';
import * as todosRepository from './todos-repository';
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

router.use(authMiddleware);

router.get('/', async (_, res) => {
  const todos = await todosRepository.getTodos(res.locals.user);
  res.send({ todos });
});

router.post('/', async (req, res) => {
  const newTodo = await todosRepository.addTodo(
    res.locals.user,
    req.body.label
  );
  res.send(newTodo);
});

router.put('/:id/toggle', async (req, res) => {
  const { completed } = req.body;
  const newTodo = await todosRepository.toggleTodo(
    parseInt(req.params.id),
    completed
  );
  res.send(newTodo);
});

router.delete('/:id', async (req, res) => {
  await todosRepository.removeTodo(parseInt(req.params.id));
  res.send(req.params.id);
});

export default router;
