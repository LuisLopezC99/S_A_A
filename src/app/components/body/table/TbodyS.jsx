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
 * File_1: body
 * File_2: table
 * Archive: TbodyS.jsx
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
import { IoDocumentTextSharp } from "react-icons/io5";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { ButtonEdit } from "../../buttons/ButtonEdit";
import { DownloadButton } from "../../buttons/DownloadButton";
import calculateZeros from "../../utils/addZeros";
import Image from "next/image";
import { MdEditSquare } from "react-icons/md";

const TbodyS = ({ rows = [], columns }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const filter = searchParams.get("filter") || "";
  const text = searchParams.get("searchText") || "";
  const [updateEditSession, setUpdateEditSession] = useState({});
  // Date castings
  const castDateToCrDate = (date) => {
    const dateCast = new Date(date);
    const crDate = dateCast.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      timeZone: "UTC",
    });
    return crDate;
  };
  const castDateToInputDate = (date) => {
    const dateCast = new Date(date);
    const inputDate = dateCast.toLocaleDateString("en-CA", { timeZone: "UTC" });
    return inputDate;
  };
  return (
    <tbody>
      {rows
        .map((row, index) => {
          const { id, date, type, UrlVideo, report, sessionId } = row;

          const handleDoubleClick = () => router.push(`/home/sessions/${id}?consecutive=${sessionId.consecutive}&type=${sessionId.type}`);
          const crDate = castDateToCrDate(date);
          const inputDate = castDateToInputDate(date);

          return (
            <tr
              key={index}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              onDoubleClick={handleDoubleClick}
            >
               <td scope="row" className="px-2 py-4 text-center">
               {`Sesión ${sessionId.type} No. ${calculateZeros(sessionId.consecutive, true)}${sessionId.consecutive}`}
              </td>
              <td scope="row" className="px-2 py-4 text-center">
                {crDate}
              </td>
              <td className=" py-2 px-4 text-center">{type}</td>
              <td className=" py-2 px-4 text-center">{UrlVideo}</td>
              <td className=" py-2 px-4 text-center">
                <DownloadButton
                  filename={report}
                  type="Actas"
                  title="Abrir Archivo Sesión"
                  icon={<IoDocumentTextSharp className="w-7 h-7 text-gray-500 dark:text-green-500" />}
                >
                </DownloadButton>
                <ButtonEdit
                  title="session"
                  data={{ id, inputDate, type, UrlVideo, report, sessionId: { consecutive: sessionId.consecutive } }}
                >
                  <MdEditSquare className="w-7 h-7 text-gray-500 dark:text-green-500" alt="AcuerdoEdit"/>
                  
                </ButtonEdit>
              </td>
            </tr>
          );
        })}
    </tbody>
  );
};

export default TbodyS;
