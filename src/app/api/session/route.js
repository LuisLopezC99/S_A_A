import { NextRequest, NextResponse } from "next/server";
import {
  readSessions,
  createSession,
  updateSession,
} from "../../services/session/crud.js";

export const GET = async (request) => {
  try {
    const tab_session = await readSessions();
    return NextResponse.json(tab_session);
  } catch (error) {
    return NextResponse.json(
      { error: "Hubo un error al procesar la solicitud" },
      { status: 500 }
    );
  }
};

export const POST = async (request) => {
  try {
    const requestData = await request.json();
    const newInsert = await createSession(requestData);
    return NextResponse.json(newInsert);
  } catch (error) {
    if (error.message.includes("facebook"))
      return NextResponse.json({ error: "Link de Facebook Repetido" });
    else return NextResponse.json({ error: "Reporte de Sesion Repetido" });
  }
};

export const PUT = async (request) => {
  try {
    const newUpdate = await updateSession(await request.json());
    return NextResponse.json(newUpdate);
  } catch (error) {
    return NextResponse.json(
      { error: "Hubo un error al procesar la solicitud" },
      { status: 500 }
    );
  }
};
