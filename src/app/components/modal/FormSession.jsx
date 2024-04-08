"use client";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";
import React, { useState } from "react";
import { postData, postDataForm } from "@/app/requests/getRequests";

function FormSession({ isModalOpen, handleModalState }) {
  const router = useRouter();
  const [file, setFile] = useState(null);
  const closeModal = () => {
    handleModalState();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formData2 = new FormData();
    formData2.append("file", file);
    formData2.append("type", "Actas");
    const simpleDate = formData.get("date");
    const date = simpleDate + "T00:00:00.000Z";
    const type = formData.get("type");
    const facebookUrl = formData.get("facebookUrl");
    const { name } = formData.get("file");

    try {
      const response = await postData("session", {
        date,
        report: name,
        type,
        UrlVideo: facebookUrl,
      });

      if (response.error) {
        throw new Error(response.error);
      }

      const response2 = await postDataForm("file", formData2);

      if (response2.error) {
        throw new Error(response2.error);
      }

      Swal.fire({
        icon: "success",
        title: "Sesión agregada",
        text: "La solicitud ha sido exitosa!",
      });

      router.refresh();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error en la sesión",
        text: error.message || "Ha ocurrido un error.",
      });
    }

    closeModal();
  };

  return (
    <div>
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-gray-800 opacity-75"></div>
          <div className="bg-white p-4 rounded shadow-lg z-10 dark:bg-gray-700">
            <h2 className="text-2xl font-bold mb-4 dark:text-white">
              Crear Session
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="flex mb-4">
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
                    max={new Date().toISOString().split("T")[0]}
                    required
                  />
                </div>

                <div>
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2 dark:text-white"
                    htmlFor="type"
                  >
                    Tipo:
                  </label>
                  <select
                    id="type"
                    name="type"
                    // value={selected}
                    // onChange={handleOnChange}
                    className="appearance-none bg-white border border-gray-300 focus:outline-none focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:focus:ring-gray-700"
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
                  required
                />
              </div>

              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2 dark:text-white"
                  htmlFor="file"
                >
                  Adjuntar Acta:
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
export default FormSession;
