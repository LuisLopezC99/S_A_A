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
 * File: session
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

import { NextRequest, NextResponse } from "next/server";
import { readSessions, createSession, updateSession, readSessionsPage, getTotalSessions } from "@/app/services/session/crud";
import { logUserAction } from "@/app/services/log/functions";


export const GET = async (request) => {
    try {
        const { searchParams } = new URL(request.url);
        const lengthAgrement = searchParams.get("count");
        const tab_session = lengthAgrement
        ? await getTotalSessions()
        : await readSessions();
        return NextResponse.json(tab_session);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Hubo un error al procesar la solicitud" }, { status: 500 });
    }
}


export const POST = async (request) => {
    try {
        const requestData = await request.json();
        const newInsert = await createSession(requestData)
        await logUserAction(6, "Sesion creada, con ID " + newInsert.id)
        return NextResponse.json(newInsert)
    } catch (error) {
        console.log(error)
        if(error.stack.includes("facebook")) 
            return NextResponse.json({ error: "Link de Facebook Repetido"})

        else if(error.message.includes("consecutive"))
            return NextResponse.json({ error: "Consecutivo repetido" });
        else 
            return NextResponse.json({ error: "Reporte de Sesion Repetido" });

    }
}

export const PUT = async (request) => {
    try {
        const newUpdate = await updateSession(await request.json())
        await logUserAction(8, "Sesion actualizada, con ID " + newUpdate.id)
        return NextResponse.json(newUpdate)
    } catch (error) {
        console.log(error)
        if(error.stack.includes("facebook")) 
        return NextResponse.json({ error: "Link de Facebook Repetido"})
    else if(error.message.includes("consecutive"))
        return NextResponse.json({ error: "Consecutivo repetido" });
    else 
        return NextResponse.json({ error: "Reporte de Sesion Repetido" });
    }
}