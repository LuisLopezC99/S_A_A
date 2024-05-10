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
 * File: agreement
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

import { NextResponse } from "next/server";
import { readAgreement, createAgreement, updateAgreement, getLastAgreement, getTotalAgrements } from "@/app/services/agreement/crud";
import { completeAgreements } from "@/app/business/agreement/logic";
import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]/route";
import { assignedEmail } from "@/app/services/notification/assigned";


export const GET = async (request) => {
    //const session = await getServerSession(authOptions)
    
    try {
        const { searchParams } = new URL(request.url)
        const addAgrement = searchParams.get("add")
        const lengthAgrement = searchParams.get("count");
        if(lengthAgrement){
            const totalAgrements = await getTotalAgrements();
            return NextResponse.json(totalAgrements);
        }
        const agreements = addAgrement ? await getLastAgreement() : await readAgreement()
        completeAgreements(agreements)
        return NextResponse.json(agreements)
    } catch (error) {
        
        return NextResponse.json({ error: "Hubo un error al procesar la solicitud" }, { status: 500 });
    }
}

export const POST = async (request) => {
    try {
        const { agreement, agreementID } = await request.json();
        const newInsert = await createAgreement(agreement, agreementID);
        await assignedEmail(newInsert);
        return NextResponse.json(newInsert);
    } catch (error) {
        console.log(error)
        if( error.stack.includes("consecutive") )
            return NextResponse.json({ error: "Consecutivo Repetido" }) 
        return NextResponse.json({ error: "Error al crear el acuerdo, Vuelva a intentarlo" });   
    }
}

export const PUT = async (request) => {
    try {
        const newUpdate = await updateAgreement(await request.json())
        await assignedEmail(newUpdate);
        console.log(newUpdate);
        return NextResponse.json(newUpdate)
    } catch (error) {
        return NextResponse.json({ error: "Hubo un error al procesar la solicitud" }, { status: 500 });
    }
}
