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
 * Archive: EditAgreement.jsx
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
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { putData, getRequest, putDataFile, postData } from "@/app/requests/getRequests";
import { useSession } from "next-auth/react";

const EditAgreement = ({
  isModalOpen,
  handleModalState,
  agreementData,
  session_role,
}) => {
  const role = session_role;
  const { data: session, status } = useSession();
  const [file, setFile] = useState(null);
  const report = agreementData.report;
  const reportCumplimiento = agreementData.reportCumplimiento;
  const [oficio, setOficio] = useState("");
  const [id, setId] = useState(agreementData.id);
  const [topic, setTopic] = useState(agreementData.topic);
  const [description, setDescription] = useState(agreementData.description);
  const [assignedTo, setAssignedTo] = useState(
    agreementData.users !== null ? agreementData.users.name : ""
  );
  const [assignedToName, setAssignedToName] = useState("");
  const [deadline, setDeadline] = useState(agreementData.deadlineInputCast);
  const [sessionId, setSessionId] = useState(agreementData.sessionId);
  const [agreementId, setAgreementId] = useState(agreementData.agreementId);
  const [agreementIdConsecutive, setAgreementIdConsecutive] = useState(
    agreementData.agreementIdConsecutive
  );
  const [state, setState] = useState(agreementData.state);
  const [users, setUsers] = useState([]);

  const [userSelected, setUserSelected] = useState(
    assignedTo === "externo"
      ? "externo"
      : assignedTo === "Alcaldia"
      ? "alcaldia"
      : assignedTo === "Auditoria"
      ? "auditoria"
      : null
  );

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await getRequest("users");
      setUsers(response);
    };

    fetchUsers();
  }, []);

  const closeModal = () => {
    setTopic(agreementData.topic);
    setDescription(agreementData.description);
    setAssignedTo(agreementData.asignedTo);
    setDeadline(agreementData.deadlineInputCast);
    handleModalState();
  };

  const handleInputChange = (event) => {
    let value = event.target.value;
    let inputName = event.target.name;
    if (inputName == "topic") {
      setTopic(value);
    } else if (inputName == "assignedTo") {
      setAssignedTo(value);
    } else if (inputName == "deadline") {
      setDeadline(value);
    } else {
      // ...
    }
  };
  const handleFileUpload = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    
      const emails = role === "alcaldia" && formData.get("emails").split(" ");
      const formattedEmails = emails.map(email => ({ email }));

      const topic = formData.get("topic");
      const description = formData.get("description");
      const { name } = formData.get("file")
        ? formData.get("file")
        : { name: report };
      const simpleDate = formData.get("deadline");
      const date = simpleDate + "T00:00:00.000Z";
      const deadline = new Date(date);
      
      const asignedTo = role === "alcaldia" ? null
        : userSelected === "externo"
        ? users.find((user) => user.role.name === "externo")?.name
        : userSelected === "alcaldia"
        ? users.find((user) => user.role.name === "alcaldia")?.name
        : userSelected === "auditoria"
        ? users.find((user) => user.role.name === "auditoria")?.name
        : null;
      
      const newState =
        userSelected == "externo"
          ? "Externo"
          : ["Cumplido", "Vencido"].includes(state)
          ? state
          : "Pendiente";
      setState(newState);
      if( role !== "alcaldia"){
      const agreementData = {
        id,
        topic,
        asignedTo,
        report: name !== "" ? name : report,
        reportCumplimiento,
        deadline,
        sessionId: sessionId,
        description,
        agreementIdConsecutive,
        state: newState,
        agreementID: {
          consecutive: agreementId.consecutive,
          month: agreementId.month,
          year: agreementId.year,
        },
        typeFile: "Acuerdos",
      };
      const formData2 = new FormData();
      formData2.append("file", file);
      formData2.append("type", "Acuerdos");
      formData2.append("currentNameFile", report);
      name !== "" && putDataFile("file", formData2);
      const put = putData("agreement", agreementData);
      put.then((response) => {
        response
          ? Swal.fire({
              icon: "success",
              title: "Acuerdo actualizado",
              text: "¡La solicitud ha sido exitosa!",
            }).then(() => window.location.reload())
          : (Swal.fire({
              icon: "error",
              title: "Error en el acuerdo",
              text: "No se pudo procesar la actualización. Revise sus datos.",
            }),
            window.location.reload());
      });
    }
    else{
      const agreementData2 = {
        id,
        topic,
        report: report,
        deadline,
        description,
        agreementIdConsecutive,
        emails,
        agreementID: {
          consecutive: agreementId.consecutive,
          month: agreementId.month,
          year: agreementId.year,
        },
      };
      const post =  postData("assings", agreementData2);
      
      post.then((response) => {
        response
          ? Swal.fire({
              icon: "success",
              title: "Acuerdo enviado y asignado a los departamentos correspodientes",
              text: "¡La solicitud ha sido exitosa!",
            }).then(() => window.location.reload())
          : (Swal.fire({
              icon: "error",
              title: "Error en el acuerdo",
              text: "No se pudo enviar el acuerdo. Revise sus datos.",
            }),
            window.location.reload());
      });
    }
    closeModal();
  };

  useEffect(() => {
    setOficio(
      `DSC-ACD-${agreementId.consecutive}-${agreementId.month}-${agreementId.year}`
    );
  });

  const handleRadioChange = (event) => {
    setUserSelected(
      event.target.value === "externo"
        ? "externo"
        : event.target.value === "alcaldia"
        ? "alcaldia"
        : event.target.value === "auditoria"
        ? "auditoria"
        : null
    );
  };

  return (
    <div>
      {isModalOpen && status === "authenticated" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-gray-800 opacity-75"></div>
          <div className="bg-white p-4 rounded shadow-lg z-10 dark:bg-gray-700">
            <h2 className="text-2xl font-bold mb-4 dark:text-white">
              {role === "alcaldia"
                ? "Asignar Acuerdo"
                : "Editar Acuerdo"}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-2">
                <div className="mr-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2 dark:text-white"
                    htmlFor="agreementId"
                  >
                    Número Oficio:
                  </label>
                  <input
                    className="custom-input"
                    id="agreementId"
                    name="agreementId"
                    type="text"
                    value={oficio}
                    readOnly={true}
                    required
                    disabled={role === "alcaldia"}
                  />
                </div>

                <div className="">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2 dark:text-white"
                    htmlFor="topic"
                  >
                    Tema:
                  </label>
                  <input
                    className="custom-input"
                    id="topic"
                    name="topic"
                    type="text"
                    value={topic}
                    onChange={handleInputChange}
                    required
                    disabled={role === "alcaldia"}
                  />
                </div>

                <div className="mr-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2 dark:text-white"
                    htmlFor="description"
                  >
                    Descripción:
                  </label>
                  <textarea
                    className="custom-input h-32"
                    id="description"
                    name="description"
                    disabled={role === "alcaldia"}
                  >
                    {description}
                  </textarea>
                </div>

                <div className="mb-4">
                  {session_role !== "alcaldia" ? (
                    <>
                      <div className="flex items-center mb-5 mt-5">
                        <label
                          className="block text-gray-700 text-sm font-bold dark:text-white"
                          htmlFor="option"
                        >
                          Asignado a:
                        </label>
                        <div className="mx-2">
                          <input
                            type="radio"
                            id="option1"
                            name="option"
                            value="alcaldia"
                            defaultChecked={userSelected === "alcaldia"}
                            onChange={handleRadioChange}
                          />
                          <label htmlFor="option1" className="ml-1">
                            Alcaldía
                          </label>
                        </div>
                        <div>
                          <input
                            type="radio"
                            id="option2"
                            name="option"
                            value="externo"
                            onChange={handleRadioChange}
                            defaultChecked={userSelected === "externo"}
                          />
                          <label htmlFor="option2" className="ml-1">
                            Externo
                          </label>
                        </div>
                      </div>

                      <div className="flex items-center mb-3">
                        <div className="mx-5">
                          <input
                            type="radio"
                            id="option3"
                            name="option"
                            value="auditoria"
                            defaultChecked={userSelected === "auditoria"}
                            onChange={handleRadioChange}
                          />
                          <label htmlFor="option3" className="ml-1">
                            Auditoria
                          </label>
                        </div>
                        <div>
                          <input
                            type="radio"
                            id="option4"
                            name="option"
                            value="ninguno"
                            onChange={handleRadioChange}
                            defaultChecked={userSelected === null}
                          />
                          <label htmlFor="option4" className="ml-1">
                            Ninguno
                          </label>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="mb-6">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2 dark:text-white"
                        htmlFor="file"
                      >
                        Adjuntos
                      </label>
                      <input
                      
                        className="custom-input h-32"
                        id="emails"
                        name="emails"
                        type="text"
                      />
                    </div>
                  )}
                  <div  className="mb-4 flex justify-start items-left">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2 dark:text-white"
                      htmlFor="deadline"
                    >
                      Fecha Límite:
                    </label>

                    <input
                      className="custom-input "
                      id="deadline"
                      name="deadline"
                      type="date"
                      value={deadline}
                      onChange={handleInputChange}
                      required
                      disabled={role === "alcaldia"}
                    />
                  </div>
                </div>
              </div>
              {session_role !== "alcaldia" && (
                <>
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2 dark:text-white"
                      htmlFor="file"
                    >
                      Adjuntar Archivo:
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
                </>
              )}
              Archivo actual: <br />
              {report}
              <div className="my-4">
                <button
                  type="submit"
                  className="bg-custom-green hover:bg-custom-green text-white font-bold py-2 px-4 rounded mr-4"
                >
                  Guardar
                </button>
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  onClick={closeModal}
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditAgreement;
