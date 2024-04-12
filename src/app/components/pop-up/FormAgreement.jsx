"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  getRequest,
  postData,
  postDataForm,
  putData,
} from "@/app/requests/getRequests";
import { FormEvent } from "react";
import Swal from "sweetalert2";

const FormAgreement = ({ isModalOpen, handleModalState, sessionid }) => {
  const router = useRouter();
  const [oficio, setOficio] = useState("");
  const [lastOficio, setLastOficio] = useState(-1);
  const [users, setUsers] = useState([]);
  const [file, setFile] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await getRequest("users");
      setUsers(response);
    };

    fetchUsers();
  }, []);

  const closeModal = () => {
    handleModalState();
  };
const handleSubmit = async (event) => {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  const formData2 = new FormData();
  formData2.append("file", file);
  formData2.append("type", "Acuerdos");
  const topic = formData.get("topic");
  const description = formData.get("description");
  const asignedTo = Number(formData.get("assignedTo"));
  const deadlineDate = formData.get("deadline");
  const sessionId = Number(sessionid);
  const creationDate = new Date();
  const agreementData = {
    agreement: {
      topic,
      description,
      asignedTo,
      deadline: new Date(deadlineDate),
      sessionId,
      creationDate,
      state: "Pendiente",
    },
    agreementID: {
      consecutive: lastOficio,
      month: creationDate.getMonth() + 1,
      year: creationDate.getFullYear(),
    },
  };

  const minimumDate = new Date();
  minimumDate.setDate(minimumDate.getDate() + 3);

  try {
    const response = await postData("agreement", agreementData);
    if (!response) {
      throw new Error("El reporte se encuentra repetido.");
    }
    await postDataForm("file", formData2);
    Swal.fire({
      icon: "success",
      title: "Acuerdo agregado",
      text: "La solicitud ha sido exitosa!.",
    });
    closeModal();
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Error en el acuerdo",
      text: error.message || "Ha ocurrido un error.",
    });
  }
};


  useEffect(() => {
    const promise = getRequest("agreement?add=Hola");
    promise.then((response) => {
      if (response[0]) {
        const actual = new Date();
        actual.getFullYear() === response[0].agreementId.year
          ? (setOficio(
              `DSC-ACD-${response[0].agreementId.consecutive + 1}-${
                actual.getMonth() + 1
              }-${actual.getFullYear()}`
            ),
            setLastOficio(response[0].agreementId.consecutive + 1))
          : (setOficio(
              `DSC-ACD-0-${actual.getMonth() + 1}-${actual.getFullYear()}`
            ),
            setLastOficio(0));
      } else {
        const actual = new Date();
        setOficio(`DSC-ACD-0-${actual.getMonth() + 1}-${actual.getFullYear()}`);
        setLastOficio(0);
      }
    });
  });

  return (
    <div>
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-gray-800 opacity-75"></div>
          <div className="bg-white p-4 rounded shadow-lg z-10 dark:bg-gray-700">
            <h2 className="text-2xl font-bold mb-4 dark:text-white">
              Crear Acuerdo
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="flex mb-4">
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
                    readOnly
                    required
                  />
                </div>

                <div className="mr-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2 dark:text-white"
                    htmlFor="topic"
                  >
                    Tema:
                  </label>
                  <input
                    className="custom-input w-[2px]"
                    id="topic"
                    name="topic"
                    type="text"
                    required
                  />
                </div>
              </div>

              <div className="flex mb-4">
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
                  ></textarea>
                </div>

                <div className="mb-4">
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
                    >
                      <option value="">Seleccionar...</option>
                      {users.map((user) => (
                        <option key={user.id} value={user.id}>
                          {user.name}
                        </option>
                      ))}
                    </select>
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
                      min={new Date().toISOString().split("T")[0]}
                      required
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
                  onChange={(e) => {
                    setFile(e.target.files[0]);
                  }}
                  id="file"
                  name="file"
                  type="file"
                  accept=".pdf,.docx"
                  required
                />
              </div>
              <div className="mb-6">
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
}

export default FormAgreement
