import { getUsers } from "../../services/users/crud";
import { NextResponse } from "next/server";
import { createUser } from "../../services/users/crud";

// This is the route to get all the users
export const GET = async (request) => {
  try {
    const users = await getUsers();
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json(
      { error: "Hubo un error al procesar la solicitud" },
      { status: 500 }
    );
  }
};

// This is the route to create a new user
// Remember to change the FirsTime to firstTime
export const POST = async (request) => {
  try {
    const { name, email, password, role, enabled, FirstTime } =
      await request.json();
    console.log(name, email, password, role, enabled, FirstTime);

    const newUser = await createUser({
      name,
      email,
      password,
      role,
      enabled,
      FirstTime,
    });
    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    console.error("Error al procesar la solicitud POST:", error);
    return NextResponse.json("Error al procesar la solicitud POST", {
      status: 500,
    });
  }
};
