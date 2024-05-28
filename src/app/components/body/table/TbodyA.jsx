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
 * Archive: TbodyA.jsx
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

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { ButtonEdit } from "../../buttons/ButtonEdit";
import calculateZeros from "../../utils/addZeros";
import { DownloadButton } from "../../buttons/DownloadButton";
import { CheckButton } from "../../buttons/CheckButton";
import { MdEditSquare } from "react-icons/md";
import { IoDocumentAttach } from "react-icons/io5";
import { IoDocumentTextSharp } from "react-icons/io5";
import { usePathname } from "next/navigation";


const TbodyA = ({ rows = [], role = "" }) => {
  const pathname = usePathname()
  const [modalVisible, setModalVisible] = useState(false);
  const [row, setRows] = useState(rows);
  const [oficio, setOficio] = useState("");
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
  }
  const searchParams = useSearchParams();
  return (
    <tbody>
      {row.map((row, index) => {
        const {
          id,
          topic,
          users,
          creationDate,
          asignedTo,
          deadline,
          sessionId,
          report,
          reportCumplimiento,
          description,
          state,
          agreementId,
          agreementIdConsecutive,
          session,
        } = row;
        const creationDateCast = castDateToCrDate(new Date(creationDate));
        const deadlineCast = castDateToCrDate(new Date(deadline));
        const deadlineInputCast = castDateToInputDate(new Date(deadline));
        {
          if (pathname.includes("/home/sessions") || state !== "Cumplido") {
            return (
              <tr
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                key={`agree-${index}`}
              >
                <td scope="row" className="px-6 py-4 text-center">
                  {
                    `DSC-ACD-${calculateZeros(agreementId.consecutive, true)}${agreementId.consecutive}-${calculateZeros(agreementId.month)}${agreementId.month}-${agreementId.year}`
                  }
                </td>
                <td className="px-6 py-4 text-center">{`Sesión ${session.type} N.${session.sessionId.consecutive}`}</td>
                <td className="px-6 py-4 text-center">{topic}</td>
                <td className="px-6 py-4 text-center">{users ? users.name : "Sin Asignar"}</td>
                <td className="px-6 py-4 text-center">{creationDateCast}</td>
                <td className="px-6 py-4 text-center">{deadlineCast}</td>

                <td className="px-6 py-4 text-center">
                  {state === "Vencido" ? (
                    <span className="estado estado-rojo"></span>
                  ) : state === "Cumplido" ? (
                    <span className="estado estado-verde"></span>
                  ) : state === "Por vencer" ? (
                    <span className="estado estado-naranja"></span>
                  ) : state === "Pendiente" ? (
                    <span className="estado estado-amarillo"></span>
                  ) : state === "Tramitado" ? (
                    <span className="estado estado-azul"></span>
                  ) : state === "Externo" ? (
                    <span className="estado estado-morado"></span>
                  ) : null}
                  {state}
                </td>
                <td className="px-6 py-4 text-center">
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>

                    {role !== "departamento" && (
                      <ButtonEdit
                        title="agreement"
                        data={{
                          id,
                          topic,
                          asignedTo,
                          creationDate,
                          deadlineInputCast,
                          sessionId,
                          report,
                          reportCumplimiento,
                          description,
                          state,
                          agreementId,
                          agreementIdConsecutive,
                          users,
                        }}
                        session_role={role}
                      >
                        <MdEditSquare className="w-7 h-7 text-gray-500 dark:text-green-500" alt="AcuerdoEdit" />
                      </ButtonEdit>
                    )}

                    <DownloadButton
                      filename={reportCumplimiento}
                      type="Cumplidos"
                      title="Abrir Cumplido"
                      icon={<IoDocumentAttach className="w-7 h-7 text-gray-500 dark:text-green-500" />}
                    ></DownloadButton>

                    <DownloadButton
                      filename={report}
                      type="Acuerdos"
                      title="Abrir Acuerdo"
                      icon={<IoDocumentTextSharp className="w-7 h-7 text-gray-500 dark:text-green-500" />}
                    ></DownloadButton>
                      <CheckButton
                        agreementId={id}
                        data={{
                          id,
                          topic,
                          asignedTo,
                          creationDate,
                          deadlineInputCast,
                          sessionId,
                          report,
                          reportCumplimiento,
                          description,
                          state,
                          agreementId,
                          agreementIdConsecutive,
                          users,
                        }}
                        session_role={role}
                      ></CheckButton>
                  </div>
                </td>
              </tr>
            );
          }
        }
      })}
    </tbody>

  );
};

export default TbodyA;
