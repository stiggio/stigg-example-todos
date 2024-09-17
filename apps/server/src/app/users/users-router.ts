import * as express from 'express';
import * as shortUUID from 'short-uuid';
import { authMiddleware } from '../middleware/authMiddleware';
import {
  stiggClient,
  ENTITLEMENTS_IDS,
  STARTER_PLAN_ID,
  createCustomerToken,
} from '../stiggClient';
import * as usersRepository from './users-repository';

const router = express.Router();

// For simplicity, we use email as the identity token instead of a JWT token
router.get('/:email', async (req, res) => {
  const { email } = req.params;

  const user = await usersRepository.getUserByEmail(email);
  const stiggCustomerToken = user
    ? createCustomerToken(user.stiggCustomerId)
    : null;

  res.json({ user, stiggCustomerToken });
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
    res.status(409).json({
      message: 'Email already exists',
    });
    return;
  }

  const customerStiggId = shortUUID.generate();
  const user = await usersRepository.signUp(email, password, customerStiggId);

  await stiggClient.provisionCustomer({
    customerId: customerStiggId,
    name: user.email.split('@')[0],
    email: user.email,
    subscriptionParams: {
      planId: STARTER_PLAN_ID,
    },
  });
  // The current user is considered as collaborator as well, therefore
  // reporting initial usage of 1
  await stiggClient.reportUsage({
    customerId: customerStiggId,
    featureId: ENTITLEMENTS_IDS.collaborators,
    value: 1,
  });

  return res.json({ user });
});

export default router;
