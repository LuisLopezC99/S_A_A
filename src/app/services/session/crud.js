import prisma from "../../../libs/client.js"



export const createSession = async (session) => {
  console.log(session);
  try {
    return await prisma.tab_session.create({
      data:session,
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};


export const readSessions = async () => {

    return await prisma.tab_session.findMany()

}

export const readFilterSession = async (filter) => {

    const sessions = await prisma.tab_session.findMany({
        include: {
            agreements: {
                select: {
                    id: true,
                    topic: true,
                    description: true,
                    asignedTo: true,
                    creationDate: true,
                    report: true,
                    reportCumplimiento: true,
                    deadline: true,
                    state: true,
                    agreementId: true,
                    users : {
                        select : {
                            name : true
                        }
                    }
                }
            },
        },
        where: {
            OR: [
                {
                    report: filter
                },
                {
                    type: filter
                },
                {
                    UrlVideo: filter
                },
                {
                    id: Number(filter) ? Number(filter) : -1
                },
            ]
        },
        take: 30
    })

    return sessions
}

export const updateSession = async (session) => {
    console.log(session);
    return await prisma.tab_session.update({
    where: {
      id: session.id,
    },
    data: session,
  });
};

export const getTotalSessions = async () => {
    const total = await prisma.tab_session.count();
    return total;
}