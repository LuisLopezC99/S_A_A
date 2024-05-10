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
 * Archive: EditSession.jsx
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
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";
import { putData, putDataFile } from "@/app/requests/getRequests";

const EditSession = ({ isModalOpen, handleModalState, sessionData }) => {
  const router = useRouter();
  const [file, setFile] = useState(null);
  const [id, setId] = useState(sessionData.id);
  const [date, setDate] = useState(sessionData.inputDate);
  const [type, setType] = useState(sessionData.type);
  const [facebookUrl, setFacebookUrl] = useState(sessionData.UrlVideo);
  const [report, setReport] = useState(sessionData.report);

  const closeModal = () => {
    setDate(sessionData.inputDate);
    setType(sessionData.type);
    setFacebookUrl(sessionData.UrlVideo);
    setReport(sessionData.report);
    handleModalState();
  };
  const handleFileUpload = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };
  const handleInputChange = (event) => {
    let value = event.target.value;
    let inputName = event.target.name;
    if (inputName == "date") {
      setDate(value);
    } else if (inputName == "facebookUrl") {
      setFacebookUrl(value);
    } else if (inputName == "report") {
      // ...
    }
  };

  const handleSelectChange = (event) => {
    let value = event.target.value;
    let inputName = event.target.name;
    if (inputName == "type") {
      setType(value);
    } else {
      // ...
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formData2 = new FormData();
    formData2.append("file", file);
    formData2.append("type", "Actas");
    formData2.append("currentNameFile", report);
    const simpleDate = formData.get("date");
    const date = simpleDate + "T00:00:00.000Z";
    const type = formData.get("type");
    const facebookUrl = formData.get("facebookUrl");
    // Made some superficial changes for the report part while we implement module itself
    const { name } = formData.get("file");
    name != "" && putDataFile("file", formData2);
    const rep = putData("session", {
      id,
      date,
      report: name != "" ? name : report,
      type,
      UrlVideo: facebookUrl,
    });

    rep.then((response) => {
      response
        ? (Swal.fire({
            icon: "success",
            title: "Sesión actualizada",
            text: "La solicitud ha sido exitosa!.",
          }),
          router.refresh())
        : Swal.fire({
            icon: "error",
            title: "Error en la sesión",
            text: "No se pudo procesar la actualizacion. Revise sus datos.",
          });
    });
    closeModal();
  };

  return (
    <div>
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-gray-800 opacity-75"></div>
          <div className="bg-white p-4 rounded shadow-lg z-10 dark:bg-gray-700">
            <h2 className="text-2xl font-bold mb-4 dark:text-white">
              Editar Sesión
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 mb-4">
                <div className="mr-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2 dark:text-white"
                    htmlFor="date"
                  >
                    Fecha de Creación:
                  </label>

                  <input
                    className="custom-input"
                    id="date"
                    name="date"
                    type="date"
                    value={date}
                    max={new Date().toISOString().split("T")[0]}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="ml-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2 dark:text-white"
                    htmlFor="type"
                  >
                    Tipo:
                  </label>
                  <select
                    id="type"
                    name="type"
                    value={type}
                    onChange={handleSelectChange}
                    className="custom-input"
                  >
                    <option value={"Ordinaria"}>Ordinaria</option>
                    <option value={"Extraordinaria"}>Extraordinaria</option>
                  </select>
                </div>
              </div>

              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2 dark:text-white"
                  htmlFor="facebookUrl"
                >
                  Link de Facebook:
                </label>
                <input
                  className="custom-input"
                  id="facebookUrl"
                  name="facebookUrl"
                  type="text"
                  value={facebookUrl}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* We need to implement 'File' module in order to set 'Edit' functionality correctly */}
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2 dark:text-white"
                  htmlFor="file"
                >
                  Adjuntar Acta:
                </label>
                <input
                  className="custom-input"
                  id="file"
                  name="file"
                  type="file"
                  onChange={handleFileUpload}
                  //required
                />
                <div>Archivo original: {sessionData.report}</div>
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
};
export default EditSession;
