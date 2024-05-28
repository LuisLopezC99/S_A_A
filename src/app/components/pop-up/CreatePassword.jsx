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
 * Archive: CreatePassword.jsx
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
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import verifyPassword from "../utils/verifyPassword";
import Swal from 'sweetalert2';

const PasswordModal = ({ user }) => {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [correcto, setCorrecto] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordpl, setShowPasswordpl] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleToggle = () => {
    setShowPasswordpl(!showPasswordpl);
  };

  const handleSubmit = () => {
    const verifyPass = verifyPassword(password, setError);
    if (!verifyPass) {
      return;
    }

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    setCorrecto("✅ Formato Correcto...");

    const updatedUser = { ...user, password: password, firstTime: false };
    fetch("/api/users", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedUser),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al actualizar la contraseña");
        }
        return response.json();
      })
      .then(() =>
        fetch("/api/send", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...user,
            password: password,
            subject: "Cambio de contraseña",
          }),
        })
      )
      .then((response) => {
        if (response.ok) {
          return signOut({ redirect: true });
        } else {
          return Promise.reject(response);
        }
      })
      .then(() => {
        Swal.fire({
          title: 'Contraseña cambiada',
          text: 'Se ha cambiado la contraseña correctamente y se ha enviado un correo de confirmación',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        }).then(() => {
          router.push("/");

          // const {protocol, host} = window.location;
          // const port = process.env.NEXT_PUBLIC_PORT ? `:${process.env.NEXT_PUBLIC_PORT}` : '';
          // const url = `${protocol}//${host}${port}`;
          // router.push(url);
        });
      })
      .catch((error) => {
        // Si hay un error
        Swal.fire({
          title: 'Error',
          text: 'Hubo un problema al cambiar la contraseña. Por favor, inténtalo de nuevo más tarde.',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
      });

  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <>
      {user.firstTime && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-md">
            <h2 className="text-lg font-semibold mb-4 dark:text-black">
              Nueva Contraseña
            </h2>
            <p className="mb-4 dark:text-black">
              Favor crear su nueva contraseña con las siguientes validaciones:
            </p>
            <ul className="list-disc pl-6 mb-4 dark:text-black">
              <li>Debe tener al menos 8 caracteres</li>
              <li>Debe incluir al menos una letra en mayúscula</li>
              <li>Debe incluir al menos una letra en minúscula</li>
              <li>Debe incluir al menos un número</li>
              <li>Debe incluir al menos un carácter especial</li>
            </ul>

            <div className="relative">
              <input
                type={showPasswordpl ? 'text' : 'password'}

                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 dark:text-black border rounded-md mb-4 dark:bg-white"
                onKeyDown={handleKeyPress}
              />
              <div
                className="absolute inset-y-1 right-0 flex items-center pr-2 text-gray-500 focus:outline-none focus:text-gray-600 hover:text-gray-600 top-0 -mt-1"
                onClick={handleToggle}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6 cursor-pointer"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                  />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>

            </div>

            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Confirmar Contraseña"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-3 py-2 border dark:text-black rounded-md mb-4 dark:bg-white"
              />
              <div
                className="absolute inset-y-1 right-0 flex items-center pr-2 text-gray-500 focus:outline-none focus:text-gray-600 hover:text-gray-600 top-0 -mt-1"
                onClick={handleTogglePassword}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6 cursor-pointer"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                  />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
            </div>

            {error && (
              <p className="text-red-500 mb-4 dark:text-red-400">{error}</p>
            )}
            {correcto && (
              <p className="text-green-400 mb-4 dark:text-green-400">
                {correcto}
              </p>
            )}
            <div className="flex justify-end">
              <button
                className="px-4 py-2 bg-gradient-to-r from-green-800 to-yellow-300 text-white rounded-md mr-2"
                onClick={handleSubmit}
              >
                Cambiar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PasswordModal;
