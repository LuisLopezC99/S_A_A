import prisma from "../../../libs/client";

export const createAgreement = async (agreement, agrID) => {
  try {
    console.log("Agreement", agreement);
    return await prisma.tab_agreement.create({
      data: {
        topic: agreement.topic,
        description: agreement.description,
        creationDate: agreement.creationDate,
        deadline: agreement.deadline,
        session: {
          connect: { id: agreement.sessionId }, // Conectar a la sesión existente por ID
        },
        users: {
          connect: { id: agreement.asignedTo }, // Conectar al usuario existente por ID
        },
        agreementId: {
          create: {
            consecutive: agrID.consecutive, // Asegúrate de proveer un valor único
            month: agrID.month, // Asegúrate de proveer un valor válido
            year: agrID.year, // Asegúrate de proveer un valor válido
          },
        },
        state: "Pendiente",
      },
    });
  } catch (e) {
    console.log(e);
  }
};

export const readAgreement = async () => {
  const agreems = await prisma.tab_agreement.findMany({
    include: {
      agreementId: true,
      users: true,
    },
  });
  return agreems;
};

export const updateAgreement = async (agreement) => {
  const {
    id,
    topic,
    description,
    asignedTo,
    deadline,
    sessionId,
    agreementIdConsecutive,
    state,
  } = agreement;
  return await prisma.tab_agreement.update({
    where: {
      id,
    },
    data: {
      topic,
      description,
      asignedTo,
      deadline,
      sessionId,
      agreementIdConsecutive,
      state,
    },
  });
};

export const filterAgreement = async (filter) => {
  return await prisma.tab_agreement.findMany({
    where: {
      OR: [
        {
          topic: filter,
        },
        {
          description: filter,
        },
        {
          sessionId: Number(filter) ? Number(filter) : -1,
        },
        {
          users: {
            name: filter,
          },
        },
      ],
    },
    include: {
      agreementId: true,
      users: true,
    },
    take: 30,
  });
};

export const getLastAgreement = async () => {
  return await prisma.tab_agreement.findMany({
    orderBy: {
      id: "desc",
    },
    include: {
      agreementId: true,
      users: true,
    },
    take: 1,
  });
};
