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
 * File: file
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
import {saveFile, updateFile } from "../../services/file/crud.js";
import { logUserAction } from "@/app/services/log/functions.js";
import path from "path";
import fs from 'fs';

// GET handler to fetch a file based on query parameters.
export const GET = async (request) => {
  // Extracting search parameters from the request URL
  const searchParams = request.nextUrl.searchParams;
  const filename = searchParams.get("filename"); // Get the filename parameter
  const type = searchParams.get("type"); // Get the type parameter

  // Construct the file path using the provided type and filename
	const filePath = path.join(`${process.env.FILES_LOCATION}${type}`, filename);

  // Check if the file exists at the specified path
	const fileExists = fs.existsSync(filePath);
  if (!fileExists) {
    throw new Error('PDF file not found');
  }
  const data = await fs.readFileSync(filePath);
	return new Response(data, {
		headers: {
			'Content-Type': 'application/octet-stream', 
		},
	});
}

// POST handler to save a new file.
export const POST = async (request) => {
  try {
    // Parse the form data from the request
    const data = await request.formData();
    const file = data.get("file"); // Get the file from the form data
    const type= data.get("type");  // Get the type from the form data
    const saveFiles = saveFile(file,type);
    await logUserAction(type === 'Actas' ? 8 : 5, "Agregando archivo PDF de nombre: " + file.name)
    return NextResponse.json(saveFiles);
  } catch (error) {
    return NextResponse.json(
      // Return a 500 error response if there was an issue processing the request
      { error: "Hubo un error al procesar la solicitud" },
      { status: 500 }
    );
  }
};


// PUT handler to update an existing file.
export const PUT = async (request) => {
  try {
    // Parse the form data from the request
    const data = await request.formData();
    const file = data.get("file"); // Get the new file from the form data
    const type = data.get("type"); // Get the new type from the form data
    const currentNameFile = data.get("currentNameFile"); // Get the current file name from the form data
    // Call the updateFile function to update the existing file on the server
    const updateFiles = updateFile(file, type, currentNameFile);
    // Log the user action indicating that a file has been updated
    await logUserAction(type === 'Actas' ? 8 : 5, "Actualizando archivo PDF de nombre " + currentNameFile + " con " + file.name)
    // Return the result of the update operation
    return NextResponse.json(updateFiles);
  } catch (error) {
    // Log the error to the console for debugging purposes
    return NextResponse.json(
      { error: "Hubo un error al procesar la solicitud" },
      { status: 500 }
    );
  }
};
