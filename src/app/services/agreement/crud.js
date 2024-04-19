import prisma from "../../../libs/prisma.js"


export const createAgreement = async (agreement, agrID) => {
    try {
        return await prisma.tab_agreement.create({
            data: {
                topic: agreement.topic,
                description: agreement.description,
                creationDate: agreement.creationDate,
                deadline: agreement.deadline,
                report: agreement.report,
                reportCumplimiento: agreement.reportCumplimiento,
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
    }
    catch (e) {
        console.log(e)
    }

}

export const readAgreement = async () => {
    const agreems = await prisma.tab_agreement.findMany({
        include: {
            agreementId: true,
            users: true
        }
    })
    return agreems
}
export const getAgreementConsecutive= async (consecutiveAgreement) => {
    const consecutive = consecutiveAgreement;
    const agreementID = await prisma.tab_agreement_id.findUnique({
        where:{
            
        }
    });
    return agreementID;
}
export const updateCheck = async (nameReport,agreementId)=>{
    const id = agreementId;
    const reportCumplimiento = nameReport;
    const state = "tramitado";
    return await prisma.tab_agreement.update({
      where: {
        id,
      },
      data: {
         reportCumplimiento,
         state,
        }
    });
}
export const updateState = async (newState,agreementId)=>{
    const state = newState;
    const id = agreementId;
    return await prisma.tab_agreement.update({
      where: {
        id,
      },
      data: {
        state,
      },
    });
}
export const updateReport = async (nameReport, agreementId) => {
  const id = agreementId;
  const report = nameReport;
  return await prisma.tab_agreement.update({
    where: {
      id,
    },
    data: {
      report,
    },
  });
};
export const updateAgreement = async (agreement) => {
    console.log(agreement);
    const { id, topic, description, asignedTo, report, reportCumplimiento, deadline, sessionId, agreementIdConsecutive, state} = agreement
    console.log(description);
    try{
    const user = await prisma.tab_user.findUnique({
        where: {
          name: asignedTo
        },
      });

    return await prisma.tab_agreement.update({
        where: {
            id
        },
        data: {
            topic,
            description,
            report,
            reportCumplimiento,
            asignedTo: user.id,
            deadline,
            sessionId,
            agreementIdConsecutive,
            state,
        }
    })
  }catch(e){
    console.log(e)
  }
}
export const countFilteredAgreements = async (filter) => {
  const agreements = await prisma.tab_agreement.findMany({
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
  });
  return agreements.length;
};
export const filterAgreement = async (filter) => {
    return await prisma.tab_agreement.findMany({
        where: {
            OR: [
                {
                    topic: filter
                },
                {
                    description: filter
                },
                {
                    sessionId: Number(filter) ? Number(filter) : -1
                },
                {
                    users: {
                        name: filter
                    }
                }
            ]
        },
        include: {
            agreementId: true,
            users: true
        },
        take: 30
    })
}

export const getLastAgreement = async () => {
    return await prisma.tab_agreement.findMany({
        orderBy: {
            id: 'desc',
        },
        include: {
            agreementId: true,
            users: true
        },
        take: 1,
    })
}
export const getTotalAgrements = async () =>{
    const total = await prisma.tab_agreement.count();
    return total;
}