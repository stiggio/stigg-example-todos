import prismaClient from '../prismaClient';

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

  const collaborator = await prismaClient.collaborator.findFirstOrThrow({
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
