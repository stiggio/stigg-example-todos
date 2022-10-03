import * as express from 'express';
import * as usersRepository from '../users/users-repository';

export async function authMiddleware(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer')) {
    // Failed: no token provided
    const err = new Error('No `Authorization` header provided.');
    res.status(401);
    return next(err);
  }

  // For simplicity we use user email as token and not JWT token
  const userEmail = header.replace(/^Bearer /, '');

  const user = await usersRepository.getUserByEmail(userEmail);
  if (!user) {
    const err = new Error(`User with email ${userEmail} not found.`);
    res.status(401);
    return next(err);
  }

  req.user = user;

  next();
}
