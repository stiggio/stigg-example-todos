import Stigg from '@stigg/node-server-sdk';

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

  stiggClient = Stigg.initialize({ apiKey });

  return stiggClient;
}

export const STARTER_PLAN_ID = 'plan-todos-starter';
export const ENTITLEMENTS_IDS = {
  collaborators: 'feature-collaborators',
  todos: 'feature-todos',
};
