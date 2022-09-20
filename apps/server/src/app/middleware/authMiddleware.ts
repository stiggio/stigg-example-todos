import * as express from 'express';

export function authMiddleware(
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

  const userEmail = header.replace(/^Bearer /, '');

  // For simplicity we use user email as token and not JWT token
  res.locals.user = userEmail;

  next();
}
