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
 * Directory: api
 * File: users
 * Archive: route.js
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

import { getUsers } from "../../services/users/crud"
import { NextResponse } from "next/server";
import { createUser, updateUser, updatePassword } from "../../services/users/crud";
import { logUserAction } from "@/app/services/log/functions";
import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]/route";


// This is the route to get all the users
export const GET = async (request) => {
  try {
    const users = await getUsers()
    return NextResponse.json(users)
  } catch (error) {
    return NextResponse.json({ error: "Hubo un error al procesar la solicitud" }, { status: 500 });
  }
}

// This is the route to create a new user
// Remember to change the FirsTime to firstTime
export const POST = async (request) => {
  try {
    // const session = await getServerSession(authOptions)
    // if (!session) {
    //   return NextResponse.json({ error: "No tienes permisos para realizar esta acción" }, { status: 403 }); //verifies session
    // }
    // if (session.user.role !== "admin") {
    //   return NextResponse.json({ error: "No tienes permisos para realizar esta acción" }, { status: 403 }); //verifies the user Role
    // }
    const { name, email, password, role, enabled, FirstTime } = await request.json();

    const newUser = await createUser({ name, email, password, role, enabled, FirstTime });
    await logUserAction(1, "Usuario creado, con ID " + newUser.id)
    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message });
  }
};

// This is the route to update a user
export const PUT = async (request) => {
  try {
    const user = await request.json();
    const { searchParams } = new URL(request.url);
    const isChangePass = searchParams.get("changepass");

    // const session = await getServerSession(authOptions)

    // if (!session) {
    //   return NextResponse.json({ error: "No tienes permisos para realizar esta acción" }, { status: 403 });//verifies the session
    // }
    // if (session.user.role !== "admin" && session.user.name !== user.name) {
    //   return NextResponse.json({ error: "No tienes permisos para realizar esta acción" }, { status: 403 });//verifies the user Role
    // }
    let updatedUser = null
    if (isChangePass) {
      updatedUser = await updatePassword(user);
    }
    else {
      updatedUser = await updateUser(user);
    }
    await logUserAction(1, "Usuario actualizado, con ID " + updatedUser.id)
    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message });
  }
}