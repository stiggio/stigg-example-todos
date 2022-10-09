import * as express from 'express';
import { authMiddleware } from '../middleware/authMiddleware';
import { checkMeteredEntitlement } from '../middleware/checkMeteredEntitlement';
import { ENTITLEMENTS_IDS, stiggClient } from '../stiggClient';
import * as collaboratorsRepository from './collaborators-repository';

const router = express.Router();

router.use(authMiddleware);

const checkCollaboratorsEntitlement = (requestUsage?: number) =>
  checkMeteredEntitlement(
    ENTITLEMENTS_IDS.collaborators,
    {
      hasAccess: true,
      usageLimit: 5,
    },
    () => requestUsage
  );

router.post(
  '/',
  checkCollaboratorsEntitlement(1),
  authMiddleware,
  async (req, res) => {
    const { collaborator } = req.body;
    const user = await collaboratorsRepository.addCollaborator(
      req.user.email,
      collaborator
    );
    await stiggClient.reportUsage({
      customerId: req.user.stiggCustomerId,
      featureId: ENTITLEMENTS_IDS.collaborators,
      value: 1,
    });
    res.json({ user });
  }
);

router.delete(
  '/:collaboratorEmail',
  checkCollaboratorsEntitlement(),
  async (req, res) => {
    const { collaboratorEmail } = req.params;
    const user = await collaboratorsRepository.removeCollaborator(
      req.user.email,
      collaboratorEmail
    );
    await stiggClient.reportUsage({
      customerId: req.user.stiggCustomerId,
      featureId: ENTITLEMENTS_IDS.collaborators,
      value: -1,
    });
    res.json({ user });
  }
);

router.post('/add-seats', checkCollaboratorsEntitlement(), async (req, res) => {
  const { additionalSeats } = req.body;
  const stiggCustomer = await stiggClient.getCustomer(req.user.stiggCustomerId);

  const [activeSubscription] = stiggCustomer.getActiveSubscriptions();
  if (activeSubscription?.price) {
    await stiggClient.updateSubscription({
      subscriptionId: activeSubscription.id,
      // The api gets the final desired quantity, therefore we add the additional quantity to the current quantity
      unitQuantity:
        (activeSubscription.price.feature?.unitQuantity || 0) + additionalSeats,
    });
  }
  res.end();
});

export default router;
