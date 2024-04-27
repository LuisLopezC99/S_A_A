"use client";
import Swal from "sweetalert2";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { putData, putDataFile, postData, postDataForm } from "@/app/requests/getRequests";
import { useForm } from "react-hook-form";

const SessionModal = ({
  isModalOpen,
  handleModalState,
  sessionData = null,
}) => {
  const router = useRouter();
  const { register, setValue, handleSubmit } = useForm();

  useEffect(() => {
    console.log(sessionData)
    sessionData
      ? (setValue("date", sessionData.inputDate),
        setValue("type", sessionData.type),
        setValue("facebookUrl", sessionData.UrlVideo))
      : console.log("No pasa nada");
  }, []);

  const closeModal = () => {
    handleModalState();
  };

  const onSubmit = async (data) => {
    if (sessionData) {
      const formData = new FormData();
      formData.append("file", data.file[0] !== undefined ? data.file[0]: null);
      formData.append("type", "Actas");
      sessionData.report !== null &&  formData.append("currentNameFile", sessionData.report);
      const id = sessionData.id;
      const simpleDate = data.date;
      const date = simpleDate + "T00:00:00.000Z";
      const type = data.type;
      const facebookUrl = data.facebookUrl;
      console.log(data.file[0])
      // Made some superficial changes for the report part while we implement module itself
      const name = data.file[0] !== undefined ? data.file[0].name: "";
      console.log(name)
      if(data.file[0] !== undefined) {
        sessionData.report !== null? putDataFile("file", formData) : postDataForm("file", formData);
      }
      console.log({
        id,
        date,
        report: name !== "" ? name : sessionData.report,
        type,
        UrlVideo: facebookUrl,
      })
      //name !== "" && putDataFile("file", formData);
      const rep = putData("session", {
        id,
        date,
        report: name !== "" ? name : sessionData.report,
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
    }
    else{
        const formData = new FormData();
        formData.append("file", data.file[0] !== undefined ? data.file[0]: null);
        formData.append("type", "Actas");
        console.log(data.file)
        const simpleDate = data.date
        const date = simpleDate + "T00:00:00.000Z";
        const type = data.type
        const facebookUrl = data.facebookUrl;
        const name = data.file[0] !== undefined ? data.file[0].name: null;
        
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
        const response2 =
          name !== null && (await postDataForm("file", formData));

        if (response2.error) {
            throw new Error(response2.error);
        }
        router.refresh();
        Swal.fire({
            icon: "success",
            title: "Sesión agregada",
            text: "La solicitud ha sido exitosa!",
        });

        
        } catch (error) {
        Swal.fire({
            icon: "error",
            title: "Error en la sesión",
            text: error.message || "Ha ocurrido un error.",
        });
        }
        setValue("date", ""),
        setValue("type", ""),
        setValue("facebookUrl", "")
        closeModal();
    }
  };

  return (
    <div>
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-gray-800 opacity-75"></div>
          <div className="bg-white p-4 rounded shadow-lg z-10 dark:bg-gray-700">
            <h2 className="text-2xl font-bold mb-4 dark:text-white">
              {sessionData ? "Editar Sesión" : "Crear Sesión"}
            </h2>
            <form onSubmit={handleSubmit(onSubmit)}>
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
                    {...register("date")}
                    max={new Date().toISOString().split("T")[0]}
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
                    {...register("type")}
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
                  {...register("facebookUrl")}
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
                  {...register("file")}
                  //required
                />
                {sessionData !== null ? <div>Archivo original: {sessionData.report !== null ? sessionData.report: " No hay un acta subida"}</div>: <></>}
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

export default SessionModal;
