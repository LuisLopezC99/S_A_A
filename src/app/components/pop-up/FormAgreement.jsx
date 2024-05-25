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
 * Archive: FormAgreement.jsx
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
import {
  getRequest,
  postData,
  postDataForm,
  putData,
} from "@/app/requests/getRequests";
import Swal from "sweetalert2";
import { set } from "react-hook-form";

const FormAgreement = ({ isModalOpen, handleModalState, sessionid }) => {

  const [asignedto, setAssignedto] = useState('alcaldia');
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
    const asignedTo = asignedto === 'externo' ? (users.find(user => user.role.name === "externo"))?.id : users.find(user => user.role.name === "alcaldia")?.id;
    const deadlineDate = formData.get("deadline");
    const sessionId = Number(sessionid);
    const creationDate = new Date();
    const state = asignedto === 'externo' ? "Externo" : "Pendiente";
    const { name } = formData.get("file");

    const agreementData = {
      agreement: {
        topic,
        description,
        asignedTo,
        report: name,
        deadline: new Date(deadlineDate),
        sessionId,
        creationDate,
        state
      },
      agreementID: {
        consecutive: lastOficio,
        month: creationDate.getMonth() + 1,
        year: creationDate.getFullYear(),
      },
      typeFile : "Acuerdos"
    };

    const minimumDate = new Date();
    minimumDate.setDate(minimumDate.getDate() + 3);

    try {
      const response = await postData("agreement", agreementData);
      if (response.error) {
        throw new Error(response.error);
      }
      await postDataForm("file", formData2);
      Swal.fire({
        icon: "success",
        title: "¡Acuerdo Agregado!",
        text: "La solicitud ha sido exitosa.",
      }).then(() => {
        closeModal();
        window.location.reload()
      })

    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error en el Acuerdo",
        text: error.message || "Ha ocurrido un error.",
      })
    }
  };


  useEffect(() => {
    const promise = getRequest("agreement?add=Hola");
    promise.then((response) => {
      if (response[0]) {
        const actual = new Date();
        actual.getFullYear() === response[0].agreementId.year
          ? (setOficio(
            `DSC-ACD-${response[0].agreementId.consecutive + 1}-${actual.getMonth() + 1
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
  }, []);


  const handleConsecutiveValue = (e) => {
    const actual = new Date();
    setLastOficio(Number(e.target.value));
    setOficio(`DSC-ACD-${e.target.value}-${actual.getMonth() + 1}-${actual.getFullYear()}`);

  }

  const handleRadioChange = (e) => {
    setAssignedto(e.target.value);
  }

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
                    Número Oficio:
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
                  <div className="flex items-center mb-5 mt-10">

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
                        defaultChecked
                        onChange={handleRadioChange}
                      />
                      <label htmlFor="option1">Alcaldía</label>
                    </div>
                    <div>
                      <input
                        type="radio"
                        id="option2"
                        name="option"
                        value="externo"
                        onChange={handleRadioChange}
                      />
                      <label htmlFor="option2">Externo</label>
                    </div>
                  </div>
                  <div className="mt-17">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2 dark:text-white"
                      htmlFor="deadline"
                    >
                      Fecha Límite:
                    </label>

                    <input
                      className="custom-input"
                      id="deadline"
                      name="deadline"
                      type="date"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2 dark:text-white"
                  htmlFor="consecutive"
                >
                  Consecutivo:
                </label>
                <input
                  className="custom-input"
                  id="consecutive"
                  name="consecutive"
                  type="number"
                  value={lastOficio}
                  onChange={handleConsecutiveValue}
                  required
                />
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
                  accept=".pdf"
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
