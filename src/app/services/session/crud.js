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

export const createSession = async (session) => {
    try {
        return await prisma.tab_session.create({
            data: {
                date: session.date,
                report: session.report,
                type: session.type,
                UrlVideo: session.UrlVideo,
                sessionId: {
                    create: {
                        consecutive: parseInt(session.sessionConsecutive),
                        year: new Date().getFullYear(),
                        type: session.type
                    }
                }
            }
        })
    } catch (error) {
        throw error
    }
}

export const readSessions = async () => {

    return await prisma.tab_session.findMany({
        include: {
            sessionId: true
        }
    })

}

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
        take: 30
    })

    return sessions
    } catch (error) {
        console.log(error)
    }
}

export const updateSession = async (session) => {
    const { id, date, report, type, UrlVideo, consecutive } = session
    try {
        return await prisma.tab_session.update({
            where: {
                id
            },
            data: {
                date,
                report,
                type,
                UrlVideo,
                sessionId: {
                    update: {
                        consecutive: parseInt(consecutive),
                        type: type
                    }
                }
            }
        })
    } catch (error) {
        console.log(error)
        throw error
    }
}
export const getTotalSessions = async () => {
    const total = await prisma.tab_session.count();
    return total;
}