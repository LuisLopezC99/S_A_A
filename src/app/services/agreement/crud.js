/**
 * Proyect: Sistema de acuerdos y actas municipales (SAA)
 * Company: Municipalidad de Tibás
 * Universidad Nacional de Costa Rica
 * School of Informatic
 * Information Systems Engineering
 * 
 * Date: 10/05/2024
 * Principal_Directory: src
 * Directory_1: app
 * Directory: services
 * File: agreement
 * Archive: crud.js
 * 
 * Authors:
 * - Scrum: Luis Ignacio López Castro
 *   - email: luis.lopez.castro@est.una.ac.cr
 *   - ID: 402420889
 * - David Coto Solano
 *   - email: victor.coto.solano@est.una.ac.cr
 *   - ID: 305440064
 * - Andrés León Orozco
 *   - email: andres.leon.orozco@est.una.ac.cr
 *   - ID: 118920778
 * - Eduardo Aarón Ojeda Paladino
 *   - email: eduardo.ojeda.paladino@est.una.ac.cr
 *   - ID: 116500136
 * - Jennifer Quirós Chacón
 *   - email: jennifer.quiros.chacon@est.una.ac.cr
 *   - ID: 702790153
 * - José Miguel Sequeira Hernández
 *   - email: jose.sequeira.hernandez@est.una.ac.cr
 *   - ID: 116590034
 */

import prisma from "../../../libs/prisma.js"


export const createAgreement = async (agreement, agrID) => {
  const reminderDate = new Date(agreement.deadline);
  // Maes aquí definir la cantidad de días antes al deadline que queremos que notifique
  reminderDate.setDate(reminderDate.getDate() - 2);
  try {
    return await prisma.tab_agreement.create({
      data: {
        topic: agreement.topic,
        description: agreement.description,
        creationDate: agreement.creationDate,
        deadline: agreement.deadline,
        reminderDate: reminderDate,
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
        state: agreement.state,
      },
    });
  }
  catch (e) {
    throw e
  }

}

export const readAgreement = async () => {
  const agreems = await prisma.tab_agreement.findMany({
    include: {
      agreementId: true,
      users: true,
      session : {
        select: {
          type: true,
          sessionId : {
            select: {
              consecutive: true
            }
          }
        }
      }
    }
  })
  return agreems
}
export const getAgreementConsecutive = async (consecutiveAgreement) => {
  const consecutive = consecutiveAgreement;
  const agreementID = await prisma.tab_agreement_id.findUnique({
    where: {

    }
  });
  return agreementID;
}
export const updateCheck = async (nameReport, agreementId) => {
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
export const updateState = async (newState, agreementId) => {
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
  const { id, topic, description, asignedTo, report, reportCumplimiento, deadline, sessionId, agreementIdConsecutive, state } = agreement
  try {
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
  } catch (e) {
     throw e
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
      users: true,
      session : {
        select: {
          type: true,
          sessionId : {
            select: {
              consecutive: true
            }
          }
        }
      }
    },
    take: 30
  })
}

export const getLastAgreement = async () => {
  return await prisma.tab_agreement.findMany({
    orderBy: {
      agreementId: {
        consecutive: 'desc',
      },
    },
    select: {
      agreementId: true,
    },
    take: 1,
  });
}
export const getTotalAgrements = async () => {
  const total = await prisma.tab_agreement.count();
  return total;
}

export const getTodayAgreements = async () => {
  const today = new Date();
  const todayUTC = new Date(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()));
  try {
    const agreements = await prisma.tab_agreement.findMany({
      where: {
        reminderDate: todayUTC,
      },
      include: {
        agreementId: true,
        users: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });
  
    return agreements;
  } catch (error) {
    return [];
  }
}