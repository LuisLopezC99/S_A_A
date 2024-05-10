"use client";
import { putData } from "@/app/requests/getRequests";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import defaultProfilePic from "../../../../public/defaultProfilePic.png";
import Swal from "sweetalert2";
import { signOut } from "next-auth/react";
import verifyPassword from "../utils/verifyPassword";

const ProfileInformationModal = ({
  isModalOpen,
  handleModalState,
  userData,
}) => {
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [visible, setVisible] = useState(false);
  const [typeActual, setTypeActual] = useState("password");
  const [typeNew, setTypeNew] = useState("password");
  const [typeNewConf, setTypeNewConf] = useState("password");

  const handleToggleActual = () => {
    if (typeActual === "password") {
      setTypeActual("text");
    } else {
      setTypeActual("password");
    }
  };

  const handleToggleNew = () => {
    if (typeNew === "password") {
      setTypeNew("text");
    } else {
      setTypeNew("password");
    }
  };

  const handleToggleNewConf = () => {
    if (typeNewConf === "password") {
      setTypeNewConf("text");
    } else {
      setTypeNewConf("password");
    }
  };

  const closeModal = () => {
    handleModalState();
  };

  const handleShowChangePassword = (show) => {
    setShowChangePassword(show);
  };

  const handleChangePassword = async (event) => {
    console.log("Cambiando contraseña");
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const currentPassword = formData.get("currentPassword");
    const newPassword = formData.get("newPassword");
    const confirmPassword = formData.get("confirmPassword");
    const user = { currentPassword, newPassword };
    if (newPassword !== confirmPassword) {
      console.log("Contraseñas no coinciden");
      const result = await Swal.fire({
        icon: "error",
        title: "Error en cambio de contraseña",
        text: "La nueva contraseña y la confirmación no coinciden. Intente de nuevo.",
        button: {
          text: "Aceptar",
          closeModal: true,
          visible: true,
          value: true,
        },
      });

      if (result.isConfirmed) {
        console.log("Cerrando modal");
        // Se cierra el modal y se ejecuta el código siguiente
        return;
      }
    }
    const verifyPass = verifyPassword(newPassword);
    if (!verifyPass) {
      const result = await Swal.fire({
        icon: "error",
        title: "Error en cambio de contraseña",
        text: "La contraseña no cumple con las especificaciones. Intente de nuevo.",
        button: {
          text: "Aceptar",
          closeModal: true,
          visible: true,
          value: true,
        },
      });

      if (result.isConfirmed) {
        // Se cierra el modal y se ejecuta el código siguiente
        return;
      }
    }
    const response = await putData(`users?changepass=true`, user);
    if (response) {
      Swal.fire({
        icon: "success",
        title: "Cambio de Contraseña",
        text: "La contraseña ha sido cambiada exitosamente, Vuelva a iniciar sesion.",
      }).then(() => {
        signOut({ redirect: true });
        setVisible(false);
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Error en cambio de contraseña",
        text: "La contraseña actual digitada no coincide con el usuario en sesion. Intente de nuevo.",
      });
    }
  };

  return (
    <div>
      {isModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white shadow-lg rounded-md p-8 w-96 dark:bg-gray-700 w-96">
            <div className="flex justify-between items-center mb-6">
              <div>
                <button
                  className="text-gray-500 hover:text-gray-700 md:hover:text-green-500 dark:text-white"
                  onClick={() => handleShowChangePassword(false)}
                >
                  Perfil
                </button>
                <button
                  className="ml-4 text-gray-500 hover:text-gray-700 md:hover:text-green-500 dark:text-white"
                  onClick={() => handleShowChangePassword(true)}
                >
                  Cambio de Contraseña
                </button>
              </div>
              <button
                className="text-gray-500 hover:text-gray-700 md:hover:text-green-500 text-2xl md:text-2xl"
                onClick={closeModal}
              >
                X
              </button>
            </div>
            <hr className="my-4" />
            {!showChangePassword ? (
              <div>
                <h3 className="text-lg font-medium mb-2 dark:text-white">
                  Datos del Usuario
                </h3>
                <div className="flex items-center">
                  <div className="mr-8 py-3">
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 dark:text-white">
                        Nombre Completo:
                      </label>
                      <p className="text-gray-500">{userData["name"]}</p>
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 dark:text-white">
                        Correo Electronico:
                      </label>
                      <p className="text-gray-500">{userData["email"]}</p>
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 dark:text-white">
                        Rol de Usuario:
                      </label>
                      <p className="text-gray-500">{userData["role"]}</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <h3 className="text-lg font-medium mb-2 dark:text-white">
                  Cambiar Contraseña
                </h3>
                <form onSubmit={handleChangePassword}>
                  <div className="mb-4">
                    <label
                      htmlFor="currentPassword"
                      className="block text-sm font-medium text-gray-700 dark:text-white"
                    >
                      Contraseña Actual
                    </label>
                    <div className="flex relative items-center">

                    <input
                      type={typeActual}
                      id="currentPassword"
                      name="currentPassword"
                      className="mt-1 block w-full border-gray-300 py-2 px-2 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      required
                      />
                    <span
                        class="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                        onClick={handleToggleActual}
                        >
                        <div className="text-gray-500 focus:outline-none focus:text-gray-600 hover:text-gray-600">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth="1.5"
                                  stroke="currentColor"
                                  className="w-5 h-5"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                                  />
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                              </div>
                      </span>
                        </div>
                  </div>
                  <div className="mb-4">
                    <h2 className="text-lg font-semibold mb-4 dark:text-white">
                      Nueva Contraseña
                    </h2>
                    <p className="mb-4 dark:text-white">
                      Favor crear su nueva contraseña con las siguientes
                      validaciones:
                    </p>
                    <ul className="list-disc pl-6 mb-4 dark:text-white">
                      <li>Debe tener al menos 8 caracteres</li>
                      <li>Debe incluir al menos una letra en mayúscula</li>
                      <li>Debe incluir al menos una letra en minúscula</li>
                      <li>Debe incluir al menos un número</li>
                      <li>Debe incluir al menos un carácter especial</li>
                    </ul>
                    <div>
                      {visible && (
                        <span style={{ color: "red" }}>
                          La contraseña no cumple con las especificaciones,
                          Intentelo de nuevo
                        </span>
                      )}
                    </div>
                    <label
                      htmlFor="newPassword"
                      className="block text-sm font-medium text-gray-700 dark:text-white"
                    >
                      Nueva Contraseña
                    </label>
                    <div className="flex relative items-center">
                      <input
                        type={typeNew}
                        id="newPassword"
                        name="newPassword"
                        className="mt-1 block w-full border-gray-300 py-2 px-2 rounded-none rounded-s-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required
                      />
                      <span
                        class="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                        onClick={handleToggleNew}
                      >
                        <div className="text-gray-500 focus:outline-none focus:text-gray-600 hover:text-gray-600">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth="1.5"
                                  stroke="currentColor"
                                  className="w-5 h-5"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                                  />
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                              </div>
                      </span>
                    </div>
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="confirmPassword"
                      className="block text-sm font-medium text-gray-700 dark:text-white"
                    >
                      Confirmar Contraseña
                    </label>
                    <div className="flex relative items-center">

                      <input
                        type={typeNewConf}
                        id="confirmPassword"
                        name="confirmPassword"
                        className="mt-1 block w-full border-gray-300 py-2 px-2 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required
                        />
                      <span
                          class="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                        onClick={handleToggleNewConf}
                          >
                          <div className="text-gray-500 focus:outline-none focus:text-gray-600 hover:text-gray-600">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth="1.5"
                                  stroke="currentColor"
                                  className="w-5 h-5"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                                  />
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                              </div>
                        </span>
                        </div>
                  </div>
                  <button
                    type="submit"
                    class="bg-yellow-200 hover:bg-yellow-300 dark:bg-yellow-300 hover:bg-yellow-300 text-gray-500 font-bold py-2 px-4 border border-yellow-400 rounded"
                  >
                    Guardar Contraseña
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileInformationModal;
