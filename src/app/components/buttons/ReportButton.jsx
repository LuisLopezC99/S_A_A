"use client";
import Report from "../reports/Report";
const ReportButton = ({rows, header, title, state,type, filter,sesion}) => {
    const handleClick = () => {
      console.log(rows);
    Report({ rows, header, title,state,type, filter,sesion });
    
  };
  return (
    <button  onClick={handleClick}>
      Generar Reporte PDF
    </button>
  );
};

export default ReportButton;
