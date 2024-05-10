import prisma from "../../../libs/prisma.js"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { connect } from "net";
import { timeStamp } from "console";

export const logUserAction = async (operationId, actionDescription) => {
    try {
        const session = await getServerSession(authOptions);
        const action = await prisma.tab_log_operations.create({
            data: {
                user: {
                    connect: {
                        id: session.user.id
                    }
                },
                operation: {
                    connect: {
                        id: parseInt(operationId)
                    }
                },
                description: actionDescription
            }
        })
        return action
    } catch (error) {
        console.log(error)
    }
}

export const getAllLoggedActions = async () => {
    try {
        return prisma.tab_log_operations.findMany()
    } catch(error) {
        console.log(error)
    }
}

export const getLoggedActionsByUserId = async (userId) => {
    try {
        const actions = await prisma.tab_log_operations.findMany({
            where: {
                userId: {
                    equals: userId
                }
            },
            include: {
                operation: true, 
            },
            orderBy: {
                timestamp: 'asc'
            }
        })
        return actions
    } catch(error) {
        console.log(error)
    }
}