"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { ButtonEdit } from "../../buttons/ButtonEdit";
import CheckModal from "../../pop-up/CheckModal";
const TbodyA = ({ rows = [], role = "" }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [row, setRows] = useState(rows);
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
  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };
  const castDateToInputDate = (date) => {
    const dateCast = new Date(date);
    const inputDate = dateCast.toLocaleDateString("en-CA", { timeZone: "UTC" });
    return inputDate;
  };
  const [updateFormAgreement, setUpdateFormAgreement] = useState({});
  const searchParams = useSearchParams();
  const filter = searchParams.get("filter") || "";
  const text = searchParams.get("searchText") || "";
  return (
    <tbody>
      {row
        .map((row, index) => {
          const {
            id,
            topic,
            users,
            creationDate,
            asignedTo,
            deadline,
            sessionId,
            description,
            state,
            agreementId,
            agreementIdConsecutive,
          } = row;
          const creationDateCast = castDateToCrDate(new Date(creationDate));
          const deadlineCast = castDateToCrDate(new Date(deadline));
          const deadlineInputCast = castDateToInputDate(new Date(deadline));

          return (
            <tr
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              key={`agree-${index}`}
            >
              <td scope="row" className="px-6 py-4 text-center">
                {`DSC-ACD-${agreementId.consecutive}-${agreementId.month}-${agreementId.year}`}
              </td>
              <td className="px-6 py-4 text-center">{topic}</td>
              <td className="px-6 py-4 text-center">{users.name}</td>
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
                ) : null}
                {state}
              </td>
              <td className="text-center">
                <button className="py-2 px-4 " title="Abrir Acuerdo">
                  <img
                    src="/document.png"
                    alt="AcuerdoDoc"
                    className="w-3 h-3"
                  />
                </button>

                {role !== "alcaldia" && (
                  <>
                    <button
                      className=" py-5 px-4"
                      title="Cumplir Acuerdo"
                      onClick={handleOpenModal}
                    >
                      <img src="/check-box.png" alt="AcuerdoDoc" />
                    </button>
                  </>
                )}

                {role !== "departamento" && (
                  <>
                    <ButtonEdit
                      title="agreement"
                      data={{
                        id,
                        topic,
                        asignedTo,
                        creationDate,
                        deadlineInputCast,
                        sessionId,
                        description,
                        state,
                        agreementId,
                        agreementIdConsecutive,
                        users,
                      }}
                      session_role={role}
                    >
                      <img src="/edit.png" alt="AcuerdoEdit" />
                    </ButtonEdit>
                  </>
                )}
              </td>
              {modalVisible && <CheckModal onCloseModal={handleCloseModal} />}
            </tr>
          );
        })}
    </tbody>
  );
};

export default TbodyA;
