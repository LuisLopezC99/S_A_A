import prisma from "../../../libs/client";
import bcrypt from "bcrypt";

export const authenticateUser = async (email, password) => {
  try {
    const user = await prisma.tab_user.findUnique({
      where: {
        email,
        password,
      },
      include: {
        role: true,
      },
    });
    return user;
  } catch (e) {
    console.log(e);
  }
};

export const getRoleById = async (Id) => {
  try {
    const role = await prisma.tab_role.findFirst({
      where: {
        id: Id,
      },
    });
    return role;
  } catch (error) {
    console.log(error);
  }
};

export const getUsers = async () => {
  try {
    const users = await prisma.tab_user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        enabled: true,
        role: {
          select: {
            name: true,
          },
        },
      },
    });
    return users;
  } catch (error) {
    console.log(error);
  }
};

export const createUser = async (userData) => {
  console.log(userData);
  const hashedPassword = await bcrypt.hash(userData.password, 10);
  console.log(hashedPassword);
  try {
    const user = await prisma.tab_user.create({
      data: {
        name: userData.name,
        email: userData.email,
        password: hashedPassword,
        role: {
          connect: {
            id: parseInt(userData.role),
          },
        },
        enabled: userData.enabled,
        FirstTime: userData.FirstTime,
      },
    });
    console.log(user);
    return user;
  } catch (error) {
    console.log(error);
  }
};

export const updateUser = async (userId, { password, ...otherData }) => {
  try {
    // Provide the current password to update it
    const hashedPassword = password
      ? await bcrypt.hash(password, 10)
      : undefined;

    // Build the new data object
    const updatedData = {
      ...(hashedPassword && { password: hashedPassword }),
      ...otherData,
    };

    // Update the user with the new data
    const updatedUser = await prisma.tab_user.update({
      where: {
        id: userId,
      },
      data: updatedData,
    });

    return updatedUser;
  } catch (error) {
    console.error("Error al actualizar el usuario:", error);
    throw new Error("Error al actualizar el usuario");
  }
};
