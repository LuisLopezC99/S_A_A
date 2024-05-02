"use client";
import Report from "../reports/Report";
import { FaRegFilePdf } from "react-icons/fa6";

const ReportButton = ({ rows, header, title, state, type, filter, sesion }) => {
  const handleClick = () => {
    console.log(rows);
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
