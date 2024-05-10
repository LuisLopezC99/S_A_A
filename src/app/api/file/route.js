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
import path from "path";
import fs from 'fs';

export const GET = async (request) => {
  const searchParams = request.nextUrl.searchParams;
  const filename = searchParams.get("filename");
  const type = searchParams.get("type");
	const filePath = path.join(`${process.env.FILES_LOCATION}${type}`, filename);
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

export const POST = async (request) => {
  try {
    const data = await request.formData();
    const file = data.get("file");
    const type= data.get("type");
    const saveFiles = saveFile(file,type);
    return NextResponse.json(saveFiles);
  } catch (error) {
    return NextResponse.json(
      { error: "Hubo un error al procesar la solicitud" },
      { status: 500 }
    );
  }
};

export const PUT = async (request) => {
  try {
    const data = await request.formData();
    const file = data.get("file");
    const type = data.get("type");
    const currentNameFile = data.get("currentNameFile");
    
    const updateFiles = updateFile(file, type, currentNameFile);

    return NextResponse.json(updateFiles);
  } catch (error) {
    return NextResponse.json(
      { error: "Hubo un error al procesar la solicitud" },
      { status: 500 }
    );
  }
};
