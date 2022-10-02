import * as express from 'express';
import { stiggClient } from '../stiggClient';

export const checkMeteredEntitlement =
  (
    featureId: string,
    { hasAccess, usageLimit }: { hasAccess: boolean; usageLimit: number },
    extractRequestUsage?: (req: express.Request) => number | undefined
  ) =>
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    const entitlement = await stiggClient!.getMeteredEntitlement({
      customerId: req.user.stiggCustomerId,
      featureId,
      options: {
        fallback: {
          hasAccess,
          usageLimit,
        },
        requestedUsage: extractRequestUsage
          ? extractRequestUsage(req)
          : undefined,
      },
    });

    if (!entitlement.hasAccess) {
      res.status(402);
      next(new Error(`Entitlement is required - ${featureId}`));
    }

    next();
  };
