import * as express from 'express';
import { authMiddleware } from '../middleware/authMiddleware';
import * as usersRepository from './users-repository';

const router = express.Router();

router.get('/:email', async (req, res) => {
  const { email } = req.params;

  const user = await usersRepository.getUserByEmail(email);

  res.json({ user });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await usersRepository.getUserByEmail(email);
  if (user) {
    const verifiedPassword = user.password === password;
    if (verifiedPassword) {
      res.json({ user });
    }
  }

  res.status(401).end();
});

router.post('/signup', async (req, res) => {
  const { email, password } = req.body;

  const existingUser = await usersRepository.getUserByEmail(email);
  if (existingUser) {
    res.status(409);
    throw new Error('Email address already exists');
  }

  const user = await usersRepository.signUp(email, password);

  return res.json({ user });
});

router.post('/collaborator', authMiddleware, async (req, res) => {
  const { collaborator } = req.body;
  const user = await usersRepository.addCollaborator(
    res.locals.user,
    collaborator
  );
  res.json({ user });
});

router.delete(
  '/collaborator/:collaboratorEmail',
  authMiddleware,
  async (req, res) => {
    const { collaboratorEmail } = req.params;
    const user = await usersRepository.removeCollaborator(
      res.locals.user,
      collaboratorEmail
    );
    res.json({ user });
  }
);

export default router;
