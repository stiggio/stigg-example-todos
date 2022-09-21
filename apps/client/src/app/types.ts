export type Todo = {
  id: string;
  label: string;
  completed: boolean;
};

export type User = {
  id?: string;
  email: string;
  collaborators?: Collaborator[];
};

export type Collaborator = {
  id: string;
  email: string;
};
