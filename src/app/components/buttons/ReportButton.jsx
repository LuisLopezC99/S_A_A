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
 * Directory: components
 * File: buttons
 * Archive: ReportButton.jsx
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

"use client";
import Report from "../reports/Report";
import { FaRegFilePdf } from "react-icons/fa6";

const ReportButton = ({ rows, header, title, state, type, filter, sesion }) => {
  const handleClick = () => {
    Report({ rows, header, title, state, type, filter, sesion });

  };
  return (
    <div className="flex items-center justify-end">
      {/* Aquí puedes agregar el elemento al lado del botón */}
      <div className="mr-5">
        {/* Contenido al lado del botón */}
      </div>
      <div className="relative" style={{ top: "-10px" }}>
        <div className="flex items-center justify-end">
          <button onClick={handleClick} className="bg-yellow-200 hover:bg-yellow-300 dark:bg-yellow-300 hover:bg-yellow-300 text-gray-500 font-bold py-2 px-4 border border-yellow-400 rounded">
          <div className="flex items-center">
                <FaRegFilePdf className="w-5 h-5 mr-2 text-gray-500 dark:text-green-600" /> {/* Icono a la izquierda del texto */}
                Generar 
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportButton;
