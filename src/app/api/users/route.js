import { getUsers } from "../../services/users/crud"
import { NextResponse } from "next/server";
import { createUser, updateUser, updatePassword } from "../../services/users/crud";
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
    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    console.error('Error al procesar la solicitud POST:', error);
    return NextResponse.json('Error al procesar la solicitud POST', { status: 500 });
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
    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    return NextResponse.json('Error al procesar la solicitud PUT', { status: 500 });
  }
}