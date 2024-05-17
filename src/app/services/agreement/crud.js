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

import prisma from "../../../libs/prisma"

// Creates a new agreement in the database using Prisma.
export const createAgreement = async (agreement, agrID) => {
  // Calculate the reminder date by subtracting 2 days from the agreement deadline
  const reminderDate = new Date(agreement.deadline);
  reminderDate.setDate(reminderDate.getDate() - 2);
  try {
    // Try to create a new agreement in the database using Prisma
    return await prisma.tab_agreement.create({
      data: {
        // Agreement details
        topic: agreement.topic, // Agreement topic
        description: agreement.description, // Agreement description
        creationDate: agreement.creationDate, // Agreement creation date
        deadline: agreement.deadline, // Agreement deadline
        reminderDate: reminderDate, // Calculated reminder date
        report: agreement.report, // Report information associated with the agreement
        reportCumplimiento: agreement.reportCumplimiento, // Report compliance
        session: {
          connect: { id: agreement.sessionId }, // Connect to existing session by ID
        },
        users: {
          connect: { id: agreement.asignedTo }, // Connect to existing user by ID
        },
        agreementId: {
          create: {
            consecutive: agrID.consecutive, // Make sure you provide a unique value
            month: agrID.month, // Make sure you provide a valid value
            year: agrID.year, // Make sure you provide a valid value
          },
        },
        state: agreement.state, // Agreement state
      },
    });
  }
  catch (e) {
    // Captures and throws any errors that occur during the process
    throw e
  }

}

//Reads and retrieves a list of agreements from the database using Prisma.
export const readAgreement = async () => {
  // Fetches all agreements from the database, including related data like agreementId, users, and session details
  const agreems = await prisma.tab_agreement.findMany({
    include: {
      agreementId: true, // Includes agreementId details in the retrieved agreements
      users: true, // Includes users associated with the agreements
      session : {
        select: {
          type: true, // Selects the session type
          sessionId : {
            select: {
              consecutive: true // Selects the consecutive ID of the session
            }
          }
        }
      }
    }
  })
  return agreems // Returns the array of retrieved agreements
}

//Retrieves an agreement ID by its consecutive number from the database using Prisma.
export const getAgreementConsecutive = async (consecutiveAgreement) => {
  const consecutive = consecutiveAgreement; // Assigns the consecutive number to a variable
  const agreementID = await prisma.tab_agreement_id.findUnique({
    where: {
    // Specifies the condition to find a unique agreement ID based on certain criteria
    }
  });
  return agreementID; // Returns the retrieved agreement ID
}

//Updates the report compliance and state of an agreement in the database using Prisma.
export const updateCheck = async (nameReport, agreementId) => {
  const id = agreementId; // Assigns the agreement ID to a variable
  const reportCumplimiento = nameReport; // Assigns the report compliance name to a variable
  const state = "tramitado"; // Sets the state of the agreement to "tramitado" (processed)

  // Updates the agreement in the database with the new report compliance and state
  return await prisma.tab_agreement.update({
    where: {
      id, // Specifies the agreement to update based on its ID
    },
    data: {
      reportCumplimiento, // Updates the report compliance field
      state, // Updates the state field
    }
  });
}

//Updates the state of an agreement in the database using Prisma.
export const updateState = async (newState, agreementId) => {
  const state = newState; // Assigns the new state to a variable
  const id = agreementId; // Assigns the agreement ID to a variable

  // Updates the agreement in the database with the new state
  return await prisma.tab_agreement.update({
    where: {
      id, // Specifies the agreement to update based on its ID
    },
    data: {
      state, // Updates the state field
    },
  });
}

// Updates the report field of an agreement in the database using Prisma.
export const updateReport = async (nameReport, agreementId) => {
  const id = agreementId; // Assigns the agreement ID to a variable
  const report = nameReport; // Assigns the report name to a variable

  // Updates the agreement in the database with the new report name
  return await prisma.tab_agreement.update({
    where: {
      id, // Specifies the agreement to update based on its ID
    },
    data: {
      report, // Updates the report field
    },
  });
};

// Updates an existing agreement in the database using Prisma.
export const updateAgreement = async (agreement) => {
  // Destructure the properties from the agreement object
  const { id, topic, description, asignedTo, report, reportCumplimiento, deadline, sessionId, agreementIdConsecutive, state } = agreement
  try {
    // Find the user ID based on the assignedTo property
    const user = await prisma.tab_user.findUnique({
      where: {
        name: asignedTo
      },
    });

    // Update the agreement in the database with the new details
    return await prisma.tab_agreement.update({
      where: {
        id // Specifies the agreement to update based on its ID
      },
      data: {
        topic,
        description,
        report,
        reportCumplimiento,
        asignedTo: user.id, // Assigns the user ID to the agreement's assignedTo field
        deadline,
        sessionId,
        agreementIdConsecutive,
        state,
      }
    })
  } catch (e) {
    // Throws any error that occurs during the update process
     throw e
  }
}

// Counts the number of agreements that match the provided filter criteria in the database using Prisma.
export const countFilteredAgreements = async (filter) => {
  // Fetches agreements that match the filter criteria from the database
  const agreements = await prisma.tab_agreement.findMany({
    where: {
      OR: [
        {
          topic: filter, // Matches agreements with the provided topic
        },
        {
          description: filter, // Matches agreements with the provided description
        },
        {
          sessionId: Number(filter) ? Number(filter) : -1, // Matches agreements with the provided session ID (if numeric)
        },
        {
          users: {
            name: filter, // Matches agreements with users having the provided name
          },
        },
      ],
    },
    include: {
      agreementId: true, // Includes agreementId details in the retrieved agreements
      users: true, // Includes users associated with the agreements
    },
  });
  return agreements.length; // Returns the count of filtered agreements
};

// Filters agreements based on the provided filter criteria in the database using Prisma.
export const filterAgreement = async (filter) => {
  // Retrieves agreements that match the filter criteria from the database
  return await prisma.tab_agreement.findMany({
    where: {
      OR: [
        {
          topic: filter // Matches agreements with the provided topic
        },
        {
          description: filter // Matches agreements with the provided description
        },
        {
          sessionId: Number(filter) ? Number(filter) : -1 // Matches agreements with the provided session ID (if numeric)
        },
        {
          users: {
            name: filter // Matches agreements with users having the provided name
          }
        }
      ]
    },
    include: {
      agreementId: true, // Includes agreementId details in the retrieved agreements
      users: true, // Includes users associated with the agreements
      session : {
        select: {
          type: true, // Selects the session type
          sessionId : {
            select: {
              consecutive: true // Selects the consecutive ID of the session
            }
          }
        }
      }
    },
    take: 30 // Limits the number of retrieved agreements to 30
  })
}

// Retrieves the last (most recent) agreement from the database using Prisma.
export const getLastAgreement = async () => {
  // Retrieves the last agreement based on the consecutive ID in descending order
  return await prisma.tab_agreement.findMany({
    orderBy: {
      agreementId: {
        consecutive: 'desc', // Orders by consecutive ID in descending order (most recent first)
      },
    },
    select: {
      agreementId: true, // Selects the agreementId details in the retrieved agreements
    },
    take: 1, // Retrieves only the last agreement
  });
}

// Retrieves the total number of agreements from the database using Prisma.
export const getTotalAgrements = async () => {
  // Counts the total number of agreements in the database
  const total = await prisma.tab_agreement.count();
  return total; // Returns the total number of agreements
}

// Retrieves agreements with reminder dates set to today from the database using Prisma.
export const getTodayAgreements = async () => {
  // Get the current date in the UTC timezone
  const today = new Date();
  const todayUTC = new Date(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()));
  try {
    // Retrieve agreements with reminder dates set to today
    const agreements = await prisma.tab_agreement.findMany({
      where: {
        reminderDate: todayUTC, // Filter agreements by reminder date set to today
      },
      include: {
        agreementId: true, // Include agreementId details in the retrieved agreement
        users: {
          select: {
            name: true, // Select the user's name
            email: true, // Select the user's email
          },
        },
      },
    });
  
    return agreements; // Return the array of agreements with reminder dates set to today
  } catch (error) {
    return []; // Return an empty array if an error occurs
  }
}