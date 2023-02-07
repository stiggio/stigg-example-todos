import Stigg from '@stigg/node-server-sdk';
import { createHmac } from 'crypto';

export let stiggClient: Stigg;

export function initStiggClient(): Stigg {
  const apiKey = process.env['NX_STIGG_SERVER_API_KEY'];
  if (!apiKey) {
    throw new Error(
      'Make sure you define "NX_STIGG_SERVER_API_KEY" environment variable in .env file'
    );
  }

  if (stiggClient) {
    return stiggClient;
  }

  stiggClient = Stigg.initialize({
    apiKey,
    baseUri: 'https://api-staging.stigg.io',
    realtimeUpdatesEnabled: false,
    redis: {
      host: 'pubsub-elasticache-staging.gemlbt.ng.0001.use2.cache.amazonaws.com',
      db: 4,
      environmentPrefix: 'roy-test',
    },
  });

  return stiggClient;
}

export function createCustomerToken(customerId: string): string | null {
  const signingToken = process.env['NX_STIGG_SIGNING_TOKEN'];

  if (!signingToken) {
    return null;
  }

  const signature = createHmac('sha256', signingToken)
    .update(customerId)
    .digest('hex');

  return `HMAC-SHA256 ${customerId}:${signature}`;
}

export const STARTER_PLAN_ID = 'plan-todos-starter';
export const ENTITLEMENTS_IDS = {
  collaborators: 'feature-collaborators',
  todos: 'feature-todos',
};
