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
 * File: profilePicture
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

import path from "path";
import fs from 'fs';

// Saves a profile picture to the server filesystem.
export const saveProfilePicture = async (image, id) => {
  try {
    const base64Data = image.split('base64,')[1]; // Extract base64 data from the image string
    const imageBuffer = Buffer.from(base64Data, 'base64'); // Convert base64 data to a buffer
    const imagePath = path.join(process.cwd(), 'public', 'profile-pictures', `${id}.jpg`); // Define the image path
    fs.writeFileSync(imagePath, imageBuffer); // Write the image buffer to the specified path
    return "archivo subido"; // Successful image upload message
  } catch (error) {
    throw new Error("Hubo un error al procesar la solicitud"); // Error handling message
  }
};