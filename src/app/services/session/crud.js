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
 * File: session
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


// Creates a new session record in the database.
export const createSession = async (session) => {
    // Create a new session record in the database
    try {
        return await prisma.tab_session.create({
            data: {
                date: session.date, // Date of the session
                report: session.report, // Report associated with the session
                type: session.type, // Type of the session
                UrlVideo: session.UrlVideo, // Video URL related to the session
                sessionId: {
                    create: {
                        consecutive: parseInt(session.sessionConsecutive), // Consecutive session number
                        year: new Date().getFullYear(), // Current year
                        type: session.type // Type of the session (e.g., meeting, workshop)
                    }
                }
            }
        })
    } catch (error) {
        throw error; // Throw any error that occurs during the session creation process
    }
}

// Retrieves all session records from the database.
export const readSessions = async () => {
    // Retrieve all session records from the database including session IDs
    return await prisma.tab_session.findMany({
        include: {
            sessionId: true // Include session IDs in the retrieved session records
        }
    })

}

// Retrieves filtered session records from the database based on the provided filter.
export const readFilterSession = async (filter) => {
    try {
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
                    users: {
                        select: {
                            name: true
                        }
                    },
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
            },
            sessionId: true
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
        take: 30 // Limit the number of retrieved records to 30
    })

    return sessions // Return the filtered session records
    } catch (error) {
        throw error; // Throw any error that occurs during the session retrieval process
    }
}

// Updates an existing session record in the database.
export const updateSession = async (session) => {
    const { id, date, report, type, UrlVideo, consecutive } = session
    try {
        return await prisma.tab_session.update({
            where: {
                id
            },
            data: {
                date, // Update the session date
                report, // Update the session report
                type, // Update the session type
                UrlVideo, // Update the session video URL
                sessionId: {
                    update: {
                        consecutive: parseInt(consecutive), // Update the session consecutive 
                        type: type // Update the session type in the session ID
                    }
                }
            }
        })
    } catch (error) {
        throw error // Throw any error that occurs during the session update process
    }
}

// Retrieves the total count of session records from the database.
export const getTotalSessions = async () => {
    const total = await prisma.tab_session.count();
    return total; // Return the total count of session records
}