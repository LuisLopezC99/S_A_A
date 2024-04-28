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