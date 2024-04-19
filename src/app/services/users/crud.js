import prisma from "../../../libs/prisma"
import bcrypt from 'bcrypt';
import { getServerSession } from "next-auth/next"
import { authOptions } from "../../api/auth/[...nextauth]/route";


export const authenticateUser = async (email, password) => {
    try {
        const user = await prisma.tab_user.findUnique({
            where: {
                email,
            },
            include: {
                role: {
                    select: {
                        name: true,
                        operations: {
                            select: {
                                operation: {
                                    select: {
                                        name: true
                                    }
                                }
                            }
                        }
                    }
                },

            }
        })

        const matchPassword = await bcrypt.compare(password, user.password);
        if (!matchPassword) {
            throw new Error("Invalid credentials")
        }

        return user
    }
    catch (e) {
        console.log(e)
    }
}

export const getRoleById = async (Id) => {
    try {
        const role = await prisma.tab_role.findFirst({
            where: {
                id: Id
            }
        })
        return role
    } catch (error) {
        console.log(error)
    }
}

export const getUsers = async () => {
    try {
        const user = await prisma.tab_user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                enabled: true,
                role: {
                    select: {
                        name: true,
                        operations: {
                            select: {
                                operation: {
                                    select: {
                                        name: true
                                    }
                                }
                            }
                        }
                    }
                }
            }
        })
        console.log(user)
        return user
    } catch (error) {
        console.log(error)
    }
}

export const createUser = async (userData) => {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    userData.password
    try {
        const user = await prisma.tab_user.create({
            data: {
                name: userData.name,
                email: userData.email,
                password: hashedPassword,
                role: {
                    connect: {
                        id: parseInt(userData.role)
                    }
                },
                enabled: userData.enabled,
                FirstTime: userData.FirstTime,
            },
            include: {
                role: true
            }
        })
        return user
    } catch (error) {
        console.log(error)
    }
}

export const updateUser = async (user) => {
    
    if (user.password) {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        try {
            const updatedUser = await prisma.tab_user.update({
                where: {
                    id: user.id
                },
                data: {
                    FirstTime: user.firstTime === false ? false : true,
                    password: hashedPassword,
                    
                }
            })
           
            return updatedUser
        }
        catch (error) {
            console.error('Error al actualizar contrasena:', error);
            throw new Error('Error al actualizar la contrasena');
        }

    }

    try {
        const updatedUser = await prisma.tab_user.update({
            where: {
                id: user.id
            },
            data: {
                name: user.name,
                email: user.email,
                role: {
                    connect: {
                        id: parseInt(/^admin$/i.test(user.role.name) ? 1 :
                         /^secretaria$/i.test(user.role.name)? 2 :
                         /^departamento$/i.test(user.role.name)? 3 : 4)
                    }
                },
                enabled: user.enabled,
                FirstTime: user.FirstTime,
            }
        })
        return updatedUser

    } catch (error) {
        console.error('Error al actualizar contrasena:', error);
        throw new Error('Error al actualizar la contrasena');
    }
};

export const updatePassword = async (user) => {
   
    const session = await getServerSession(authOptions);
   
    const actualEncryptPass = await prisma.tab_user.findUnique({
        where: {
            id: session.user.id
        },
        select: {
            password: true
        }
    })
     
    const matchPassword = await bcrypt.compare(user.currentPassword, actualEncryptPass.password);

    if (!matchPassword) {
        throw new Error("La contrasena actual no coincide con la digitada, Intente de nuevo...")
    }

    const hashedPassword = await bcrypt.hash(user.newPassword, 10);
    
    try {
        const updatedUser = await prisma.tab_user.update({
            where: {
                id: session.user.id
            },
            data: {
                password: hashedPassword
            }
        })
        return updatedUser
    }
    catch (error) {
        throw new Error('Error al actualizar la contrasena');
    }
}