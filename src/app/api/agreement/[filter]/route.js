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
 * File_1: agreement
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

import { NextRequest, NextResponse } from "next/server";
import { countFilteredAgreements, filterAgreement } from "@/app/services/agreement/crud";
import { completeAgreements } from "@/app/business/agreement/logic";


// Handles GET requests to retrieve agreements based on filters or counts.
export const GET = async (request, { params }) => {
  try {
    // Parse the URL and get search parameters from the request
    const { searchParams } = new URL(request.url);
    // Check if the 'count' search parameter is present
    const lengthAgrement = searchParams.get("count");
    if(lengthAgrement){
      // If 'count' is present, count the filtered agreements
        const totalDocuments = await countFilteredAgreements(lengthAgrement);
        return NextResponse.json(totalDocuments); // Return the count as JSON response
    }

    // If 'count' is not present, filter agreements based on the provided filter
    const agreements = await filterAgreement(params.filter);
    // Apply additional logic to complete the agreements (business logic)

    completeAgreements(agreements);

    // Return the filtered and processed agreements as JSON response
    return NextResponse.json(agreements);
  } catch (error) {
    // Return an error response with status 500 in case of any error
    return NextResponse.json(
      { error: "Hubo un error al procesar la solicitud" },
      { status: 500 }
    );
  }
};