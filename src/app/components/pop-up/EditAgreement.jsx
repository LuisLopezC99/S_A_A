"use client";
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { FormEvent } from "react";
import { putData, getRequest, putDataFile } from "@/app/requests/getRequests";
import { set } from "react-hook-form";

const EditAgreement = ({
  isModalOpen,
  handleModalState,
  agreementData,
  session_role = "",
}) => {
  const [file, setFile] = useState(null);
  const report = agreementData.report;
  const reportCumplimiento = agreementData.reportCumplimiento;
  const [oficio, setOficio] = useState("");
  const [id, setId] = useState(agreementData.id);
  const [topic, setTopic] = useState(agreementData.topic);
  const [description, setDescription] = useState(agreementData.description);
  const [assignedTo, setAssignedTo] = useState(agreementData.users.name);
  const [assignedToName, setAssignedToName] = useState("");
  const [deadline, setDeadline] = useState(agreementData.deadlineInputCast);
  const [sessionId, setSessionId] = useState(agreementData.sessionId);
  const [agreementId, setAgreementId] = useState(agreementData.agreementId);
  const [agreementIdConsecutive, setAgreementIdConsecutive] = useState(
    agreementData.agreementIdConsecutive
  );
  const [state, setState] = useState(agreementData.state);
  const [users, setUsers] = useState([]);
  const [actualUser, _] = useState(agreementData.users.name);
  const [isChecked, setIsChecked] = useState(assignedTo === "externo" ? true : false);

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

    const topic = formData.get("topic");
    const description = formData.get("description");
    const asignedTo = isChecked ? (users.find(user => user.role.name === "externo"))?.name : formData.get("assignedTo");
    const { name } = formData.get("file") || currentState; // Not used

    const simpleDate = formData.get("deadline");
    const date = simpleDate + "T00:00:00.000Z";
    const deadline = new Date(date);
    const newState = isChecked ? "Externo" : ["Cumplido", "Tramitado", "Vencido"].includes(state) ? state : "Pendiente";
    setState(newState);
    const agreementData = {
      id,
      topic,
      asignedTo,
      report: name,
      reportCumplimiento,
      deadline,
      sessionId: sessionId,
      description,
      agreementIdConsecutive,
      state: newState
    };
    const formData2 = new FormData();
    formData2.append("file", file);
    formData2.append("type", "Acuerdos");
    formData2.append("currentNameFile", report);
    name !== "" && putDataFile("file", formData2);
    console.log(agreementData);
    const put = putData("agreement", agreementData);
    put.then((response) => {
      response
        ? Swal.fire({
          icon: "success",
          title: "Acuerdo actualizado",
          text: "La solicitud ha sido exitosa!.",
        }).then(() => window.location.reload())
        : (Swal.fire({
          icon: "error",
          title: "Error en el acuerdo",
          text: "No se pudo procesar la actualizacion. Revise sus datos.",
        }), window.location.reload());
    });
    closeModal();
  };

  useEffect(() => {
    setOficio(
      `DSC-ACD-${agreementId.consecutive}-${agreementId.month}-${agreementId.year}`
    );
  });
  const currentName = () => {
    return users.map((user) => (user.id === assignedTo ? user.name : ""));
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  }

  return (
    <div>
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-gray-800 opacity-75"></div>
          <div className="bg-white p-4 rounded shadow-lg z-10 dark:bg-gray-700">
            <h2 className="text-2xl font-bold mb-4 dark:text-white">
              Editar Acuerdo
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-2">
                <div className="mr-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2 dark:text-white"
                    htmlFor="agreementId"
                  >
                    Oficio#
                  </label>
                  <input
                    className="custom-input"
                    id="agreementId"
                    name="agreementId"
                    type="text"
                    value={oficio}
                    readOnly={true}
                    required
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
                    readOnly={session_role !== "secretaria"}
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
                    readOnly={session_role !== "secretaria"}
                  >
                    {description}
                  </textarea>
                </div>

                <div className="mb-4">
                  <div className="flex items-center">
                    <div>
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2 dark:text-white"
                        htmlFor="assignedTo"
                      >
                        Asignado a:
                      </label>
                      <select
                        className="custom-input"
                        id="assignedTo"
                        name="assignedTo"
                        required
                        disabled={isChecked}
                      >
                        <option value="">Seleccionar...</option>
                        {users.map((user) => (
                          user.role.name !== "externo" && (
                            <option key={user.id} value={user.name}>
                              {user.name}
                            </option>
                          )
                        ))}
                      </select>
                    </div>

                    <div className="ml-4">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2 dark:text-white"
                        htmlFor="external"
                      >
                        Externo
                      </label>
                      <input
                        type="checkbox"
                        id="external"
                        checked={isChecked}
                        onChange={handleCheckboxChange}
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2 dark:text-white"
                      htmlFor="deadline"
                    >
                      Fecha límite:
                    </label>

                    <input
                      className="custom-input"
                      id="deadline"
                      name="deadline"
                      type="date"
                      value={deadline}
                      onChange={handleInputChange}
                      required
                      readOnly={session_role !== "secretaria"}
                    />
                  </div>
                </div>
              </div>
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
                  onChange={handleFileUpload}
                  disabled={session_role !== "secretaria"}
                //required
                />
              </div>
              Archivo actual: <br />
              {report}
              <div className="my-4" >
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
