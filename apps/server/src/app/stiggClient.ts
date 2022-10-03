import Stigg from '@stigg/node-server-sdk';

export let stiggClient: Stigg | null = null;

async function initStiggClient() {
  if (stiggClient) {
    return stiggClient;
  }
  if (!process.env['NX_STIGG_SERVER_API_KEY']) {
    throw new Error(
      'Make sure you define "NX_STIGG_SERVER_API_KEY" environment variable in .env file'
    );
  }
  try {
    stiggClient = await Stigg.initialize({
      apiKey: process.env['NX_STIGG_SERVER_API_KEY'],
    });
  } catch (err) {
    console.log(`Fail to initialize server sdk: ${err}`);
  }
  return stiggClient;
}

export const STARTER_PLAN_ID = 'plan-todos-starter';
export const ENTITLEMENTS_IDS = {
  collaborators: 'feature-collaborators',
  todos: 'feature-todos',
};

initStiggClient();
