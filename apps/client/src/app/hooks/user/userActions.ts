import { Customer } from '@stigg/react-sdk';
import { User } from '../../types';

export enum UsersActionType {
  USER_LOADED = 'USER_LOADED',
  USER_SIGNED_IN_ERROR = 'USER_SIGNED_IN_ERROR',
  USER_SIGNED_OUT = 'USER_SIGNED_OUT',
  COLLABORATOR_ADDED = 'COLLABORATOR_ADDED',
  COLLABORATOR_REMOVED = 'COLLABORATOR_REMOVED',
}

type UserLoadedAction = {
  type: UsersActionType.USER_LOADED;
  payload: {
    user?: User;
    stiggCustomer?: Customer;
  };
};

type UserSignedInErrorAction = {
  type: UsersActionType.USER_SIGNED_IN_ERROR;
};

type UserSignedOutAction = {
  type: UsersActionType.USER_SIGNED_OUT;
};

type CollaboratorChangedAction = {
  type:
    | UsersActionType.COLLABORATOR_ADDED
    | UsersActionType.COLLABORATOR_REMOVED;
  payload: {
    user: User;
  };
};

export type UsersAction =
  | UserSignedOutAction
  | UserSignedInErrorAction
  | UserLoadedAction
  | CollaboratorChangedAction;
