import React, { useContext, useEffect } from 'react';
import { useImmerReducer } from 'use-immer';
import { User } from '../../types';
import * as apiGateway from '../../api/apiGateway';
import auth from '../../auth';
import {
  BillingPeriod,
  Customer,
  StiggClient,
  useStiggContext,
} from '@stigg/react-sdk';
import { UsersAction, UsersActionType } from './userActions';

type UsersState = {
  currentUser?: User;
  signInError?: boolean;
  isLoaded: boolean;
};

export type UsersDispatch = React.Dispatch<UsersAction>;

const UsersStateContext = React.createContext<
  { state: UsersState; dispatch: UsersDispatch } | undefined
>(undefined);

function reducer(state: UsersState, action: UsersAction) {
  switch (action.type) {
    case UsersActionType.USER_SIGNED_IN_ERROR:
      state.signInError = true;
      break;
    case UsersActionType.USER_SIGNED_OUT:
      state.currentUser = undefined;
      break;
    case UsersActionType.USER_LOADED:
      state.isLoaded = true;
      state.signInError = false;
      state.currentUser = action.payload.user
        ? {
            ...action.payload.user,
            stiggCustomer: action.payload.stiggCustomer,
          }
        : undefined;
      break;
    case UsersActionType.COLLABORATOR_ADDED:
    case UsersActionType.COLLABORATOR_REMOVED:
      state.currentUser = {
        ...state.currentUser,
        ...action.payload.user,
      };
      break;
    default:
      throw new Error('Not supported action type');
  }
}

export async function signIn(
  dispatch: UsersDispatch,
  payload: { email: string; password: string },
  stiggClient: StiggClient | null
) {
  try {
    const res = await apiGateway.login(payload.email, payload.password);
    const { user } = res.data;
    if (stiggClient) {
      await loadUser(dispatch, { email: payload.email }, stiggClient);
    }
    auth.setToken(user.email);
  } catch (err) {
    dispatch({
      type: UsersActionType.USER_SIGNED_IN_ERROR,
    });
  }
}

export async function signUp(
  dispatch: UsersDispatch,
  payload: { email: string; password: string },
  stiggClient: StiggClient | null
) {
  const res = await apiGateway.signup(payload.email, payload.password);
  const { user } = res.data;

  if (stiggClient) {
    await loadUser(dispatch, { email: payload.email }, stiggClient);
  }
  auth.setToken(user.email);
}

export async function signOut(
  dispatch: UsersDispatch,
  stiggClient: StiggClient | null
) {
  auth.logout();

  if (stiggClient) {
    await stiggClient.clearCustomer();
  }
  dispatch({
    type: UsersActionType.USER_SIGNED_OUT,
  });
}

export async function addCollaborator(
  dispatch: UsersDispatch,
  payload: { email: string }
) {
  const res = await apiGateway.addCollaborator(payload.email);
  dispatch({
    type: UsersActionType.COLLABORATOR_ADDED,
    payload: {
      user: res.data.user,
    },
  });
}

export async function removeCollaborator(
  dispatch: UsersDispatch,
  payload: { email: string }
) {
  const res = await apiGateway.removeCollaborator(payload.email);
  dispatch({
    type: UsersActionType.COLLABORATOR_REMOVED,
    payload: {
      user: res.data.user,
    },
  });
}

export async function addCollaboratorSeats(payload: {
  additionalSeats: number;
}) {
  await apiGateway.addSeats(payload.additionalSeats);
}

export async function createSubscription(payload: {
  customerId: string;
  planId: string;
  billingPeriod: BillingPeriod;
  unitQuantity?: number;
}) {
  const { customerId, planId, billingPeriod, unitQuantity } = payload;
  await apiGateway.createSubscription({
    customerId,
    planId,
    billingPeriod,
    unitQuantity,
  });
}

export async function provisionSubscription(payload: {
  customerId: string;
  planId: string;
  billingPeriod: BillingPeriod;
  cancelUrl: string;
  successUrl: string;
  unitQuantity?: number;
}) {
  const res = await apiGateway.provisionSubscription(payload);
  return res.data.result;
}

export async function checkout(payload: {
  customerId: string;
  planId: string;
  billingPeriod: BillingPeriod;
  unitQuantity?: number;
  cancelUrl: string;
  successUrl: string;
}) {
  const {
    customerId,
    planId,
    billingPeriod,
    unitQuantity,
    cancelUrl,
    successUrl,
  } = payload;
  const res = await apiGateway.checkout({
    customerId,
    planId,
    billingPeriod,
    unitQuantity,
    cancelUrl,
    successUrl,
  });

  return res.data.checkout;
}

async function loadUser(
  dispatch: UsersDispatch,
  payload: { email?: string | null },
  stiggClient: StiggClient
) {
  let user: User | undefined;
  let stiggCustomer: Customer | undefined;
  if (payload.email) {
    const res = await apiGateway.getUser(payload.email);
    user = res.data.user;
    if (user) {
      await stiggClient.setCustomerId(user.stiggCustomerId);
      stiggCustomer = await stiggClient.getCustomer();
    }
  }

  dispatch({
    type: UsersActionType.USER_LOADED,
    payload: {
      user,
      stiggCustomer,
    },
  });
  auth.setAuthHeader();
}

export function UsersProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useImmerReducer<UsersState, UsersAction>(reducer, {
    isLoaded: false,
  });
  const { stigg } = useStiggContext();

  useEffect(() => {
    if (stigg) {
      loadUser(dispatch, { email: auth.token }, stigg);
    }
  }, [dispatch, stigg]);

  return (
    <UsersStateContext.Provider value={{ state, dispatch }}>
      {children}
    </UsersStateContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UsersStateContext);

  if (!context) {
    throw new Error('useUser must be used within a UsersProvider');
  }

  return context;
}
