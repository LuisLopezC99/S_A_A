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
 * File: pop-up
 * Archive: CheckModal.jsx
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
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { postDataForm, putData } from "@/app/requests/getRequests";
import Swal from "sweetalert2";

export const CheckModal = ({
  isModalOpen,
  handleModalState,
  agreementData,
  session_role = "",
}) => {
  const { data: session, status } = useSession();
  const [file, setFile] = useState(null);

  const id = agreementData.id;
  const topic = agreementData.topic;
  const report = agreementData.report;
  const reportCumplimiento = agreementData.reportCumplimiento;
  const description = agreementData.description;
  const asignedTo = agreementData.users ? agreementData.users.name : "Sin Asignar";
  const deadlineCast = agreementData.deadlineInputCast;
  const sessionId = agreementData.sessionId;
  const agreementIdConsecutive = agreementData.agreementIdConsecutive;
  const currentState = agreementData.state;
  const date = deadlineCast + "T00:00:00.000Z";
  const deadline = new Date(date);

  const closeModal = () => {
    handleModalState();
  };

  const handleFileUpload = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };
  const roleSta = () => {
    let rState;
    currentState === "Externo" || session_role === "alcaldia"
    ? rState = "Tramitado"
    : rState = "Cumplido";
    return rState;
  }
    const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const { name } = formData.get("file") || currentState;
    const roleToSend = "secretaria";
    const roleState = roleSta();
    const textToSend = session_role === "alcaldia" 
    ? `El acuerdo a sido ${roleState} y enviado a ${roleToSend}.`
    : `El acuerdo a sido ${roleState}`
    const agreementData = {
      id,
      topic,
      asignedTo,
      report,
      reportCumplimiento: name !== "" ? name : reportCumplimiento,
      deadline,
      sessionId: sessionId,
      description,
      agreementIdConsecutive,
      state: roleState,
    };
    const formData2 = new FormData();
    formData2.append("file", file);
    formData2.append("type", "Cumplidos");
    if (name !== "" && session_role !== "secretaria") {
      //arreglar para aceptar put cuando se nesesita sirve pero no borra el actual acumulando archivos residuales mejorar
      await postDataForm("file", formData2);
    }
    const put = putData("agreement", agreementData);
    put.then((response) => {
      response
        ? Swal.fire({
            icon: "success",
            title: `Acuerdo ${roleState}`,
            text:textToSend,
          }).then(() => window.location.reload())
        : Swal.fire({
            icon: "error",
            title: "Error en el acuerdo",
            text: "No se pudo procesar la actualización. Revise sus datos.",
          });
    });

    closeModal();
  };

  return (
    <div>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-8 max-w-md rounded-lg shadow-lg relative dark:bg-gray-700">
            <form onSubmit={handleSubmit}>
              {(session_role === "alcaldia" &&
              currentState !== "Tramitado") || (session_role === "secretaria" &&
              currentState === "Externo") ? (
                <>
                  <h2 className="text-lg font-semibold mb-4 dark:text-white">
                    Firmar Acuerdo
                  </h2>
                  <p className="dark:text-white">
                    Yo, como el encarcado de {session.user.name}, doy fe del cumplimiento 
                    de nuestra parte de los diferentes puntos abarcados en el acuerdo presente 
                    y por ende lo tramitamos  para seguir su debido proceso.
                  </p>
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm  mb-2 dark:text-white"
                      htmlFor="file"
                    >
                      Documento de cumplimiento:
                    </label>

                    <input
                      className="custom-input"
                      id="file"
                      name="file"
                      type="file"
                      accept=".pdf"
                      onChange={handleFileUpload}
                    />
                  </div>
                  <div className="flex justify-between my-4">
                    <button
                      className="bg-custom-green hover:bg-custom-green text-white font-bold py-2 px-4 rounded mr-4"
                      type="submit"
                    >
                      Confirmar Acuerdo
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                      onClick={closeModal}
                    >
                      Cancelar
                    </button>
                  </div>
                </>
              ) : session_role === "secretaria" &&
                currentState === "Tramitado" ? (
                <>
                  <h2 className="text-lg font-semibold mb-4 dark:text-white">
                    Finalizar el cumplimiento del acuerdo.
                  </h2>
                  <p className="dark:text-white">
                    El acuerdo ha sido tramitado para confirmacion de
                    cumplimiento por el alcaldia correspondinte. Al aceptar
                    se da por cumplido y finalizado el dicho acuerdo.
                  </p>
                  <div className="flex justify-between my-4">
                    <button
                      className="bg-custom-green hover:bg-custom-green text-white font-bold py-2 px-4 rounded mr-4"
                      type="submit"
                    >
                      Confirmar Acuerdo.
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                      onClick={closeModal}
                    >
                      Cancelar
                    </button>
                  </div>
                </>
              ): session_role === "secretaria" &&
                currentState !== "Tramitado" ? (
                <>
                  <h2 className="text-lg font-semibold mb-4 dark:text-white">
                  ¡Alerta! Está por finalizar un acuerdo en proceso de
                    cumplimiento.
                  </h2>
                  <h3 className="text-lg font-semibold mb-4 dark:text-white">
                    Finalizar el cumplimiento del acuerdo.
                  </h3>
                  <p className="dark:text-white">
                    El acuerdo no ha terminado su proceso de cumplimiento pero puede finalizar y pasarlo a cumplido.
                    Si está seguro de finalizar el acuerdo presione confirmar.
                  </p>
                  <div className="flex justify-between my-4">
                    <button
                      className="bg-custom-green hover:bg-custom-green text-white font-bold py-2 px-4 rounded mr-4"
                      type="submit"
                    >
                      Confirmar Acuerdo
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                      onClick={closeModal}
                    >
                      Cancelar
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <h2 className="text-lg font-semibold mb-4 dark:text-white">
                    Modificar Firma del Acuerdo.
                  </h2>
                  <p className="dark:text-white">
                    El acuerdo se encuentra tramitado pero si desea puede
                    cambiar el documento de cumplimiento.
                  </p>
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm  mb-2 dark:text-white"
                      htmlFor="file"
                    >
                      Modificar Documento de Cumplimiento:
                    </label>
                    Archvio actual: {reportCumplimiento}
                    <input
                      className="custom-input"
                      id="file"
                      name="file"
                      type="file"
                      accept=".pdf"
                      onChange={handleFileUpload}
                    />
                  </div>
                  <div className="flex justify-between my-4">
                    <button
                      className="bg-custom-green hover:bg-custom-green text-white font-bold py-2 px-4 rounded mr-4"
                      type="submit"
                    >
                      Confirmar Acuerdo
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                      onClick={closeModal}
                    >
                      Cancelar
                    </button>
                  </div>
                </>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
