"use client";
import Report from "../reports/LogActionsReport";
import { getRequest } from "@/app/requests/getRequests";

export const LogActionsReportButton = ({ userId, icon }) => {
  const handleClick = async() => {
    Report({ userId });
  };
  return (
    <>
        <button
            className=" font-bold py-2 px-4 text-center "  
            onClick={handleClick}
            title="Generar reporte de acciones"
        >
            {icon}
        </button>
    </>
);
};
