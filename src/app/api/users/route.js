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


// Handler for fetching users data
export const GET = async (request) => {
  try {
    const users = await getUsers() // Fetch users data from the database
    return NextResponse.json(users) // Return users data as JSON response
  } catch (error) {
    return NextResponse.json({ error: "Hubo un error al procesar la solicitud" }, { status: 500 }); // Return an error response with status code 500
  }
}

// This is the route to create a new user
// Remember to change the FirsTime to firstTime
export const POST = async (request) => {
  try {
    // Parse the request body to extract user data
    const { name, email, password, role, enabled, FirstTime } = await request.json();
    const newUser = await createUser({ name, email, password, role, enabled, FirstTime }); // Create a new user in the database
    await logUserAction(1, "Usuario creado, con ID " + newUser.id) // Log the user creation action
    return NextResponse.json(newUser, { status: 201 });  // Return the newly created user as a JSON response with a status code of 201 (Created)
  } catch (error) {
    return NextResponse.json({ error: error.message });
  }
};

// This is the route to update a user
export const PUT = async (request) => {
  try {

    const user = await request.json(); // Extract JSON data from the request
    const { searchParams } = new URL(request.url); // Extract query parameters from the request URL
    const isChangePass = searchParams.get("changepass"); // Check if "changepass" parameter is present in the URL
    let updatedUser = null
    if (isChangePass) {
      updatedUser = await updatePassword(user); // If "changepass" parameter is present, update the user's password
    }
    else {
      updatedUser = await updateUser(user); // Otherwise, update other user details
    }
   // await logUserAction(1, "Usuario actualizado, con ID " + updatedUser.id)
    return NextResponse.json(updatedUser, { status: 200 }); // Return a JSON response with the updated user data and a status code of 200 (OK)
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: error.message }); // Return a JSON response with the error message and an appropriate status code
  }
}