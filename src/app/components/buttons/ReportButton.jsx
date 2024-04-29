"use client";
import Report from "../reports/Report";
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
          <button onClick={handleClick} className="bg-yellow-300 hover:bg-yellow-400 text-gray-500 font-bold py-2 px-4 border border-yellow-400 rounded">
            Generar Reporte PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportButton;
