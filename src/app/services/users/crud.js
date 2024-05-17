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
 * File: users
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
import bcrypt from 'bcrypt';
import { getServerSession } from "next-auth/next"
import { authOptions } from "../../api/auth/[...nextauth]/route";

// Authenticates a user by email and password.
export const authenticateUser = async (email, password) => {
    try {
        // Find the user in the database based on the email
        const user = await prisma.tab_user.findUnique({
            where: {
                email,
            },
            include: {
                role: {
                    // Include the role details in the retrieved user data
                    select: {
                        name: true,
                        operations: {
                            select: {
                                operation: {
                                    select: {
                                        name: true // Include the operation names in the role
                                    }
                                }
                            }
                        }
                    }
                },

            }
        })

        // Compare the provided password with the hashed password in the database
        const matchPassword = await bcrypt.compare(password, user.password);
        if (!matchPassword) {
            throw new Error("Invalid credentials") // Throw an error if passwords don't match
        }

        return user // Return the authenticated user object
    }
    catch (e) {
        throw error; // Throw any error that occurs during the authentication process
    }
}

// Retrieves a role from the database by its ID.
export const getRoleById = async (Id) => {
    try {
        // Find the role in the database based on the provided ID
        const role = await prisma.tab_role.findFirst({
            where: {
                id: Id
            }
        })
        return role  // Return the role object if found
    } catch (error) {
        throw error; // Throw any error that occurs during the role retrieval process
    }
}

// Retrieves all users from the database with selected fields and related role details.
export const getUsers = async () => {
    try {
        const user = await prisma.tab_user.findMany({
            select: {
                id: true, // Include user ID in the retrieved data
                name: true, // Include user name in the retrieved data
                email: true, // Include user email in the retrieved data
                enabled: true, // Include user enabled status in the retrieved data
                role: {
                    // Include the role details in the retrieved user data
                    select: {
                        name: true, // Include role name in the retrieved data
                        operations: {
                            select: {
                                operation: {
                                    select: {
                                        name: true // Include operation names in the role
                                    }
                                }
                            }
                        }
                    }
                }
            }
        })
        return user // Return an array of user objects
    } catch (error) {
        throw error; // Throw any error that occurs during the user retrieval process
    }
}

// Retrieves users with the role 'secretaria' (secretary) from the database.
export const getSecetariaUsers = async () => {
    try {
        // Find users with the role 'secretaria' (secretary) in the database
        const user = await prisma.tab_user.findMany({
            where: {
                role: {
                    name: 'secretaria' // Filter users by role name 'secretaria'
                }
            },
            select: {
                name: true,  // Include user name in the retrieved data
                email: true, // Include user email in the retrieved data
            }
        })
        return user // Return an array of secretary user objects
    } catch (error) {
        throw error; // Throw any error that occurs during the user retrieval process
    }
}

// Creates a new user in the database.
export const createUser = async (userData) => {
    try {
        // Hash the user's password before saving it in the database
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        userData.password
        // Create the new user in the database with the hashed password and other details
        const user = await prisma.tab_user.create({
            data: {
                name: userData.name, // User's name
                email: userData.email, // User's email
                password: hashedPassword, // Hashed password
                role: {
                    connect: {
                        id: parseInt(userData.role) // Connect user to a role by ID
                    }
                },
                enabled: userData.enabled,  // User's enabled status
                FirstTime: userData.FirstTime,  // First-time login flag
            },
            include: {
                role: true // Include the role details in the created user object
            }
        })
        return user  // Return the created user object
    } catch (error) {
        throw error;  // Throw any error that occurs during the user creation process
    }
}

// Updates an existing user in the database based on the provided user data.
export const updateUser = async (user) => {

    if (user.password) {
        // If the user provided a new password, hash it before updating
        const hashedPassword = await bcrypt.hash(user.password, 10);
        // Update the user in the database with the new hashed password and other data
        try {
            const updatedUser = await prisma.tab_user.update({
                where: {
                    id: user.id  // Update user based on their ID
                },
                data: {
                    FirstTime: user.firstTime === false ? false : true, // Update FirstTime flag
                    password: hashedPassword, // Update password with hashed value

                }
            })
            return updatedUser  // Return the updated user object
        }
        catch (error) {
            throw error // Throw any error that occurs during the update process
        }

    }

    try {
        // If no new password provided, update user data without updating the password
        const updatedUser = await prisma.tab_user.update({
            where: {
                id: user.id // Update user based on their ID
            },
            data: {
                name: user.name, // Update user's name
                email: user.email, // Update user's email
                role: {
                    connect: {
                        // Connect user to a role based on role name (case-insensitive)
                        id: parseInt(/^admin$/i.test(user.role.name) ? 1 :
                            /^secretaria$/i.test(user.role.name) ? 2 :
                                /^departamento$/i.test(user.role.name) ? 3 : /^alcaldia$/i.test(user.role.name)? 4 : 5)
                    }
                },
                enabled: user.enabled, // Update user's enabled status
                FirstTime: user.FirstTime, // Update FirstTime flag
            }
        })
       
        return updatedUser // Return the updated user object
        
    } catch (error) {
        console.error('Error al actualizar contrasena:', error);
        throw new Error('Error al actualizar la contrasena'); // Throw an error if updating password fails
    }
};

// Updates the password of the currently logged-in user.
export const updatePassword = async (user) => {
    // Get the session information to identify the current user
    const session = await getServerSession(authOptions);

    // Retrieve the actual encrypted password of the current user from the database
    const actualEncryptPass = await prisma.tab_user.findUnique({
        where: {
            id: session.user.id // Find the user based on their ID in the session
        },
        select: {
            password: true // Only retrieve the password field
        }
    })

    // Compare the current password entered by the user with the actual encrypted password
    const matchPassword = await bcrypt.compare(user.currentPassword, actualEncryptPass.password);

    // If the passwords do not match, throw an error
    if (!matchPassword) {
        throw new Error("La contrasena actual no coincide con la digitada, Intente de nuevo...")
    }

    // Hash the new password provided by the user
    const hashedPassword = await bcrypt.hash(user.newPassword, 10);

    try {
        // Update the password of the user in the database with the new hashed password
        const updatedUser = await prisma.tab_user.update({
            where: {
                id: session.user.id // Update the password for the user in the session
            },
            data: {
                password: hashedPassword // Update the password field with the new hashed password
            }
        })
        return updatedUser  // Return the updated user object
    }
    catch (error) {
        throw new Error('Error al actualizar la contrasena'); // Throw an error if updating password fails
    }
}

// Retrieves user information by their ID.
export const getUserById = async (id) => {
    try {
        // Query the database to find the user by their ID
        return await prisma.tab_user.findUnique({
            where: {
                id // Find the user based on their ID
            },
            select: {
                name: true, // Include the user's name in the retrieved data
                email: true, // Include the user's email in the retrieved data
            }
        })
    } catch (error) {
        // Throw an error if there's an issue retrieving the user information
        throw new Error('Error al obtener el usuario');
    }
}

