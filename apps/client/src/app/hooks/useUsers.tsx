import React, { useContext, useEffect } from 'react';
import { useImmerReducer } from 'use-immer';
import { User } from '../types';
import * as apiGateway from '../api/apiGateway';
import auth from '../auth';

type UsersState = {
  currentUser?: User;
  signInError?: boolean;
  isLoaded: boolean;
};

enum UsersActionType {
  USER_LOADED = 'USER_LOADED',
  USER_SIGNED_IN_ERROR = 'USER_SIGNED_IN_ERROR',
  USER_SIGNED_IN = 'USER_SIGNED_IN',
  USER_SIGNED_OUT = 'USER_SIGNED_OUT',
  USER_SIGNED_UP = 'USER_SIGNED_UP',
  COLLABORATOR_ADDED = 'COLLABORATOR_ADDED',
  COLLABORATOR_REMOVED = 'COLLABORATOR_REMOVED',
}

type UserSignedInAction = {
  type: UsersActionType.USER_SIGNED_IN;
  payload: {
    user: User;
  };
};

type UserLoadedAction = {
  type: UsersActionType.USER_LOADED;
  payload: {
    user?: User;
  };
};

type UserSignedInErrorAction = {
  type: UsersActionType.USER_SIGNED_IN_ERROR;
};

type UserSignedOutAction = {
  type: UsersActionType.USER_SIGNED_OUT;
};

type UserSignedUpAction = {
  type: UsersActionType.USER_SIGNED_UP;
  payload: {
    user: User;
  };
};

type CollaboratorChangedAction = {
  type:
    | UsersActionType.COLLABORATOR_ADDED
    | UsersActionType.COLLABORATOR_REMOVED;
  payload: {
    user: User;
  };
};

export type UsersDispatch = React.Dispatch<UsersAction>;
type UsersAction =
  | UserSignedInAction
  | UserSignedOutAction
  | UserSignedInErrorAction
  | UserSignedUpAction
  | UserLoadedAction
  | CollaboratorChangedAction;

const UsersStateContext = React.createContext<
  { state: UsersState; dispatch: UsersDispatch } | undefined
>(undefined);

function reducer(state: UsersState, action: UsersAction) {
  switch (action.type) {
    case UsersActionType.USER_SIGNED_IN:
    case UsersActionType.USER_SIGNED_UP:
      state.signInError = false;
      state.currentUser = action.payload.user;
      break;
    case UsersActionType.USER_SIGNED_IN_ERROR:
      state.signInError = true;
      break;
    case UsersActionType.USER_SIGNED_OUT:
      state.currentUser = undefined;
      break;
    case UsersActionType.USER_LOADED:
      state.isLoaded = true;
      state.currentUser = action.payload.user;
      break;
    case UsersActionType.COLLABORATOR_ADDED:
    case UsersActionType.COLLABORATOR_REMOVED:
      state.currentUser = action.payload.user;
      break;
    default:
      throw new Error('Not supported action type');
  }
}

export async function signIn(
  dispatch: UsersDispatch,
  payload: { email: string; password: string }
) {
  try {
    const res = await apiGateway.login(payload.email, payload.password);
    const { user } = res.data;
    dispatch({
      type: UsersActionType.USER_SIGNED_IN,
      payload: {
        user,
      },
    });
    auth.setToken(user.email);
  } catch (err) {
    dispatch({
      type: UsersActionType.USER_SIGNED_IN_ERROR,
    });
  }
}

export async function signUp(
  dispatch: UsersDispatch,
  payload: { email: string; password: string }
) {
  const res = await apiGateway.signup(payload.email, payload.password);
  const { user } = res.data;
  dispatch({
    type: UsersActionType.USER_SIGNED_UP,
    payload: {
      user: user,
    },
  });
  auth.setToken(user.email);
}

export async function signOut(dispatch: UsersDispatch) {
  auth.logout();
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

async function loadUser(
  dispatch: UsersDispatch,
  payload: { email?: string | null }
) {
  let user: User | undefined;
  if (payload.email) {
    const res = await apiGateway.getUser(payload.email);
    user = res.data.user;
  }

  dispatch({
    type: UsersActionType.USER_LOADED,
    payload: {
      user,
    },
  });
  auth.setAuthHeader();
}

export function UsersProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useImmerReducer<UsersState, UsersAction>(reducer, {
    isLoaded: false,
  });

  useEffect(() => {
    loadUser(dispatch, { email: auth.token });
  }, [dispatch]);

  return (
    <UsersStateContext.Provider value={{ state, dispatch }}>
      {children}
    </UsersStateContext.Provider>
  );
}

export function useUsers() {
  const context = useContext(UsersStateContext);

  if (!context) {
    throw new Error('useUsers must be used within a CountProvider');
  }

  return context;
}
