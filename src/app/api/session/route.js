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

// Handler for GET requests
export const GET = async (request) => {
    try {
        const { searchParams } = new URL(request.url); // Parse the search parameters from the request URL
        const lengthAgrement = searchParams.get("count"); // Check if the "count" parameter is present in the search parameters
        // If "count" parameter is present, get the total number of sessions
        // Otherwise, get the list of sessions
        const tab_session = lengthAgrement
        ? await getTotalSessions()
        : await readSessions();
        return NextResponse.json(tab_session); // Return the sessions or total count as a JSON response
    } catch (error) {
        return NextResponse.json({ error: "Hubo un error al procesar la solicitud" }, { status: 500 });
    }
}

// Handler for POST requests
export const POST = async (request) => {
    try {
        const requestData = await request.json();  // Parse the request body as JSON
        const newInsert = await createSession(requestData) // Create a new session with the request data
        await logUserAction(6, "Sesion creada, con ID " + newInsert.id) // Log the user action of creating a new session
        return NextResponse.json(newInsert) // Return the newly created session as a JSON response
    } catch (error) {
        // If a Facebook link duplication error occurs, return a specific error message
        if(error.stack.includes("facebook")) 
            return NextResponse.json({ error: "Link de Facebook Repetido"}) // Return a specific error message

        else if(error.message.includes("consecutive"))
            return NextResponse.json({ error: "Consecutivo repetido" });
        else 
            return NextResponse.json({ error: "Reporte de Sesion Repetido" }); // Return a generic session report duplication error message

    }
}

export const PUT = async (request) => {
    try {
        const newUpdate = await updateSession(await request.json()) // Parse the request body as JSON and update the session with the new data
        await logUserAction(8, "Sesion actualizada, con ID " + newUpdate.id) // Log the user action of updating a session
        return NextResponse.json(newUpdate) // Return the updated session as a JSON response
    } catch (error) {
        if(error.stack.includes("facebook")) 
        return NextResponse.json({ error: "Link de Facebook Repetido"}) // Return a specific error message
    else if(error.message.includes("consecutive"))
        return NextResponse.json({ error: "Consecutivo repetido" }); // Return a specific error message
    else 
        return NextResponse.json({ error: "Reporte de Sesion Repetido" }); // Return a generic session report duplication error message
    }
}