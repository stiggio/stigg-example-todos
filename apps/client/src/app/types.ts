import { Customer } from '@stigg/react-sdk';

export type Todo = {
  id: string;
  label: string;
  completed: boolean;
};

export type User = {
  id?: string;
  email: string;
  stiggCustomerId: string;
  stiggCustomer?: Customer;
  collaborators?: Collaborator[];
};

export type Collaborator = {
  id: string;
  email: string;
};
