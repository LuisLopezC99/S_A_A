import { NextRequest, NextResponse } from "next/server";
import { readSessions, createSession, updateSession, readSessionsPage, getTotalSessions } from "@/app/services/session/crud";


export const GET = async (request) => {
    try {
        const { searchParams } = new URL(request.url);
        const lengthAgrement = searchParams.get("count");
        const tab_session = lengthAgrement
        ? await getTotalSessions()
        : await readSessions();
        return NextResponse.json(tab_session);
    } catch (error) {
        return NextResponse.json({ error: "Hubo un error al procesar la solicitud" }, { status: 500 });
    }
}


export const POST = async (request) => {
    try {
        const requestData = await request.json();
        console.log(requestData);
        const newInsert = await createSession(requestData)
        return NextResponse.json(newInsert)
    } catch (error) {
        console.log(error)
        if(error.message.includes("facebook")) 
            return NextResponse.json({ error: "Link de Facebook Repetido"})
        else
            return NextResponse.json({ error: "Reporte de Sesion Repetido" });

    }
}

export const PUT = async (request) => {
    try {
        const newUpdate = await updateSession(await request.json())
        return NextResponse.json(newUpdate)
    } catch (error) {
        return NextResponse.json({ error: "Hubo un error al procesar la solicitud" }, { status: 500 });
    }
}