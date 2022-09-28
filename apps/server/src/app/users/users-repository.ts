import { User } from '@prisma/client';
import prismaClient from '../prismaClient';

const users: User[] = [];

export function getUsers() {
  return users;
}

export async function signUp(
  email: string,
  password: string,
  stiggCustomerId: string
) {
  const user = await prismaClient.user.create({
    data: {
      email,
      password,
      stiggCustomerId,
    },
    include: {
      collaborators: true,
      todos: true,
    },
  });

  return user;
}

export async function getUserByEmail(email: string) {
  const user = await prismaClient.user.findUnique({
    where: { email },
    include: { collaborators: true, todos: true },
  });
  return user;
}

export async function addCollaborator(
  currentUserEmail: string,
  collaboratorEmail: string
) {
  const user = await prismaClient.user.update({
    where: {
      email: currentUserEmail,
    },
    data: {
      collaborators: {
        create: [
          {
            email: collaboratorEmail,
          },
        ],
      },
    },
    include: {
      collaborators: true,
      todos: true,
    },
  });

  return user;
}

export async function removeCollaborator(
  currentUserEmail: string,
  collaboratorEmail: string
) {
  prismaClient.collaborator.delete({
    include: {
      user: true,
    },
    where: {},
  });

  const collaborator = await prismaClient.collaborator.findFirst({
    where: {
      email: collaboratorEmail,
      user: {
        email: currentUserEmail,
      },
    },
  });

  const user = await prismaClient.user.update({
    where: {
      email: currentUserEmail,
    },
    data: {
      collaborators: {
        delete: {
          id: collaborator.id,
        },
      },
    },
    include: {
      collaborators: true,
      todos: true,
    },
  });

  return user;
}
