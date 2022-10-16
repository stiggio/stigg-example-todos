import * as express from 'express';
import todosRouter from './todos/todos-router';
import collaboratorsRouter from './collaborators/collaborators-router';
import usersRouter from './users/users-router';

const router = express.Router();

router.use('/todos', todosRouter);
router.use('/collaborators', collaboratorsRouter);
router.use('/users', usersRouter);

router.use((req, res) => {
  res.status(404).json({
    message: 'Not found'
  });
});

export default router;
