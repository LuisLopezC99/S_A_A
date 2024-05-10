/**
 * Proyect: Sistema de acuerdos y actas municipales (SAA)
 * Company: Municipalidad de Tibás
 * Universidad Nacional de Costa Rica
 * School of Informatic
 * Information Systems Engineering
 * 
 * Date: 10/05/2024
 * Principal_Directory: src
 * Directory: app
 * Archive: not-found.jsx
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

import Link from "next/link";
import muniImagen from "../../public/muniImagen.jpg";
import Image from "next/image";
export default function NotFound() {
  return (
    <div className="relative h-screen">
    {/* Imagen de fondo */}
    <Image
      src={muniImagen} // Ruta de la imagen de fondo
      alt="Imagen de fondo"
      layout="fill"
      objectFit="cover"
    />
    
    {/* Div con fondo blanco */}
    <div className="absolute inset-0 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Pagina No Encontrada</h1>
        <a href="/" className="text-blue-500">Volver a Inicio</a>
      </div>
    </div>
  </div>
  );
}