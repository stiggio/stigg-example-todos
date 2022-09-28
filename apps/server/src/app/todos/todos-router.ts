import * as express from 'express';
import * as todosRepository from './todos-repository';
import { authMiddleware } from '../middleware/authMiddleware';
import { ENTITLEMENTS_IDS, getStiggClient } from '../stiggClient';

const router = express.Router();

router.use(authMiddleware);

router.get('/', async (_, res) => {
  const todos = await todosRepository.getTodos(res.locals.user.email);
  res.send({ todos });
});

router.post('/', async (req, res) => {
  const newTodo = await todosRepository.addTodo(
    res.locals.user.email,
    req.body.label
  );
  await getStiggClient().reportUsage({
    customerId: res.locals.user.stiggCustomerId,
    featureId: ENTITLEMENTS_IDS.todos,
    value: 1,
  });
  res.send(newTodo);
});

router.put('/:id', async (req, res) => {
  const { completed, label } = req.body;
  const updatedTodo = await todosRepository.updateTodo(
    parseInt(req.params.id),
    {
      completed,
      label,
    }
  );
  res.send(updatedTodo);
});

router.delete('/:id', async (req, res) => {
  await todosRepository.removeTodo(parseInt(req.params.id));
  await getStiggClient().reportUsage({
    customerId: res.locals.user.stiggCustomerId,
    featureId: ENTITLEMENTS_IDS.todos,
    value: -1,
  });
  res.send(req.params.id);
});

export default router;
