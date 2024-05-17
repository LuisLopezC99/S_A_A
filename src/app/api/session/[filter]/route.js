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
 * File_1: session
 * File_2: [filter]
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

import { NextResponse, NextRequest } from "next/server";
import { Params } from "../../agreement/[filter]/route";
import { readFilterSession } from "@/app/services/session/crud";
import { completeAgreements } from "@/app/business/agreement/logic";
import { GetAgreement } from "@/app/services/agreement/crud";

// Handler for GET requests
export const GET = async (_,{params}) => {
    try{ 
        // Read sessions based on the provided filter
        const sessions = await readFilterSession(params.filter) //Get the sessions that matches with filters
        
        sessions.forEach(session => {
            completeAgreements(session.agreements) //Establisg the status of the agreements
        });
        sessions ? sessions : []  // Check if sessions are present, if not return an empty array
        return NextResponse.json(sessions)  // Return the sessions as a JSON response
    }catch(error){
        return NextResponse.json({ error: "Hubo un error al procesar la solicitud" }, { status: 500 }); // Return an error response
    }
}
