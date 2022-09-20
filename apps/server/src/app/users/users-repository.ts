import { guid } from '../utils';

export type User = {
  id: string;
  email: string;
  password: string;
  collaborators: string[];
};

const users: User[] = [];

function newUser(email: string, password: string): User {
  return {
    id: guid(),
    email,
    password,
    collaborators: [],
  };
}

export function getUsers() {
  return users;
}

export function signUp(email: string, password: string): User {
  const user = newUser(email, password);
  users.push(user);

  return user;
}

export function getUserByEmail(email: string) {
  return users.find((user) => user.email === email);
}

export function addCollaborator(
  currentUserEmail: string,
  collaboratorEmail: string
) {
  const user = users.find((user) => user.email === currentUserEmail);
  if (user) {
    user.collaborators.push(collaboratorEmail);
  }
  return user;
}

export function removeCollaborator(
  currentUserEmail: string,
  collaboratorEmail: string
) {
  const user = users.find((user) => user.email === currentUserEmail);
  if (user) {
    user.collaborators = user.collaborators.filter(
      (collaborator) => collaborator !== collaboratorEmail
    );
  }
  return user;
}
