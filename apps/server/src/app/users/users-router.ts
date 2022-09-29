import * as express from 'express';
import * as shortUUID from 'short-uuid';
import { authMiddleware } from '../middleware/authMiddleware';
import {
  getStiggClient,
  ENTITLEMENTS_IDS,
  STARTER_PLAN_ID,
} from '../stiggClient';
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

  const customerStiggId = shortUUID.generate();
  const user = await usersRepository.signUp(email, password, customerStiggId);

  const stiggClient = getStiggClient();
  await stiggClient.provisionCustomer({
    customerId: customerStiggId,
    name: user.email.split('@')[0],
    email: user.email,
    subscriptionParams: {
      planId: STARTER_PLAN_ID,
    },
    shouldSyncFree: false,
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

router.post('/collaborator', authMiddleware, async (req, res) => {
  const { collaborator } = req.body;
  const user = await usersRepository.addCollaborator(
    res.locals.user.email,
    collaborator
  );
  await getStiggClient().reportUsage({
    customerId: res.locals.user.stiggCustomerId,
    featureId: ENTITLEMENTS_IDS.collaborators,
    value: 1,
  });
  res.json({ user });
});

router.delete(
  '/collaborator/:collaboratorEmail',
  authMiddleware,
  async (req, res) => {
    const { collaboratorEmail } = req.params;
    const user = await usersRepository.removeCollaborator(
      res.locals.user.email,
      collaboratorEmail
    );
    await getStiggClient().reportUsage({
      customerId: res.locals.user.stiggCustomerId,
      featureId: ENTITLEMENTS_IDS.collaborators,
      value: -1,
    });
    res.json({ user });
  }
);

router.post('/collaborator/add-seats', authMiddleware, async (req, res) => {
  const { additionalSeats } = req.body;
  const stiggClient = getStiggClient();
  const stiggCustomer = await stiggClient.getCustomer(
    res.locals.user.stiggCustomerId
  );
  const [activeSubscription] = stiggCustomer.getActiveSubscriptions();
  if (activeSubscription) {
    await stiggClient.updateSubscription({
      subscriptionId: activeSubscription.id,
      unitQuantity:
        (activeSubscription.price.feature?.unitQuantity || 0) + additionalSeats,
    });
  }
  res.end();
});

router.post('/createSubscription', authMiddleware, async (req, res) => {
  const { customerId, planId, billingPeriod, unitQuantity } = req.body;
  const stiggClient = getStiggClient();
  await stiggClient.createSubscription({
    customerId,
    planId,
    billingPeriod,
    unitQuantity,
    awaitPaymentConfirmation: true,
  });

  res.end();
});

router.post('/checkout', authMiddleware, async (req, res) => {
  const {
    customerId,
    cancelUrl,
    successUrl,
    planId,
    billingPeriod,
    unitQuantity,
  } = req.body;
  const stiggClient = getStiggClient();
  let checkout = null;
  try {
    checkout = await stiggClient.initiateCheckout({
      planId,
      customerId,
      addons: [],
      billingPeriod,
      unitQuantity,
      cancelUrl,
      successUrl,
    });
  } catch (err) {
    console.warn(
      `Failed to initiate checkout for user ${customerId} for plan ${planId}`
    );
  }

  res.json({ checkout });
});

export default router;
