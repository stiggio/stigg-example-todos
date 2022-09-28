import Stigg from '@stigg/node-server-sdk';

let stiggClient: Stigg | null = null;

async function initStiggClient() {
  if (stiggClient) {
    return stiggClient;
  }
  try {
    stiggClient = await Stigg.initialize({
      apiKey: process.env['NX_STIGG_SERVER_API_KEY'],
    });
  } catch (err) {
    console.log(`Fail to initialize server sdk: ${err}`);
  }
}

export const STARTER_PLAN_ID = 'plan-todos-starter';
export const ENTITLEMENTS_IDS = {
  collaborators: 'feature-collaborators',
  todos: 'feature-todos',
};

initStiggClient();

export const getStiggClient = () => {
  return stiggClient;
};
