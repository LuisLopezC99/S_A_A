import prisma from "../../../libs/prisma.js"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { connect } from "net";
import { timeStamp } from "console";

// Logs a user action in the database, associating it with an operation and user ID.
export const logUserAction = async (operationId, actionDescription) => {
    try {
        // Retrieve the server session using authentication options
        const session = await getServerSession(authOptions);
        // Create a new log entry for the user action in the database
        const action = await prisma.tab_log_operations.create({
            data: {
                user: {
                    connect: {
                        id: session.user.id // Connects the user ID to the log entry
                    }
                },
                operation: {
                    connect: {
                        id: parseInt(operationId) // Connects the operation ID to the log entry
                    }
                },
                description: actionDescription // Sets the description of the user action
            }
        })
        return action // Return the logged user action object
    } catch (error) {
        throw error; // Throw any error that occurs during the logging process
    }
}

// Retrieves all logged actions from the database.
export const getAllLoggedActions = async () => {
    try {
        // Retrieves all logged actions from the database
        return prisma.tab_log_operations.findMany()
    } catch(error) {
        throw error; // Throws any error that occurs during the retrieval process
    }
}

// Retrieves logged actions associated with a specific user ID from the database.
export const getLoggedActionsByUserId = async (userId) => {
    try {
        // Retrieves logged actions associated with the specified user ID from the database
        const actions = await prisma.tab_log_operations.findMany({
            where: {
                userId: {
                    equals: userId // Filters logged actions by the specified user ID
                }
            },
            include: {
                operation: true, // Includes details of the operation associated with each logged action
            },
            orderBy: {
                timestamp: 'asc' // Orders logged actions by timestamp in ascending order
            }
        })
        return actions // Returns the array of logged actions for the specified user
    } catch(error) {
        throw error; // Throws any error that occurs during the retrieval process
    }
}