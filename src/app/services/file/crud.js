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
 * Directory: services
 * File: file
 * Archive: crud.js
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

import path, { resolve } from "path";
import { writeFile, createReadStream, unlink } from "fs/promises";

export const saveFile = async (file, type) => {
  try {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const filePath = path.join(`${process.env.FILES_LOCATION}${type}`, file.name);
    await writeFile(filePath, buffer);
    return "archivo subido";
  } catch (error) {
    throw new Error("Hubo un error al procesar la solicitud");
  }
};


export const updateFile = async (file, type, currentNameFile) => {
  try {
    console.log(type, currentNameFile);
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const filePath = path.join(
      `${process.env.FILES_LOCATION}${type}`,
      file.name
    );
    const currentFilePath = path.join(
      `${process.env.FILES_LOCATION}${type}`,
      currentNameFile
    );
    await unlink(currentFilePath);
    await writeFile(filePath, buffer);

    return "archivo subido";
  } catch (error) {
    console.log(error);
    throw new Error("Hubo un error al procesar la solicitud");
  }
};
