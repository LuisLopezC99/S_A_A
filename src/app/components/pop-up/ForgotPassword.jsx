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
 * Archive: ForgotPassword.jsx
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

"use client"
import React, { useState } from "react";
import Swal from "sweetalert2";

const ForgotPassword = ({ showForgotPasswordModal, setShowForgotPasswordModal }) => {
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [email, setEmail] = useState("");

  const enviarCorreo = () => {
    const randomPassword = Math.random().toString(36).slice(-8);
    fetch('/api/users')
      .then((response) => (response.ok ? response.json() : Promise.reject(response)))
      .then((users) => users.find((user) => user.email === email))
      .then((user) => fetch('/api/users', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...user, password: randomPassword }),
      }))
      .then((response) => (response.ok ? response.json() : Promise.reject(response)))
      .then((user) =>{ 
        fetch('/api/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...user, password: randomPassword, subject: 'Recuperar contraseña'}),
      })})
      .then((_) => (Swal.fire('¡Correo Enviado!', 'Se ha enviado un correo con la nueva contraseña', 'success')))
      .catch((error) => {
        Swal.fire('Error', 'Ha ocurrido un error al enviar el correo', 'error',error)
      });

    setShowForgotPasswordModal(false);


    // Muestra el segundo modal después de enviar el correo
    // setShowVerificationModal(true);
  };

  const handleVerificationSubmit = () => {
    // Aquí se puede agregar lógica para verificar el código y actualizar la contraseña
    // Por simplicidad, aquí solo mostramos un mensaje de éxito
    Swal.fire({
      icon: 'success',
      title: '¡Contraseña Cambiada!',
      text: 'Tu contraseña ha sido cambiada con éxito.',
    });
    // Cierra ambos modales después de cambiar la contraseña
    setShowForgotPasswordModal(false);
    setShowVerificationModal(false);
  };

  return (
    <>
      {showForgotPasswordModal && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-md">
          <h2 className="text-lg font-semibold mb-4 dark:text-black">¿Olvidaste tu contraseña?</h2>
            <p className="mb-4 dark:text-black">Ingresa tu correo electrónico y te enviaremos instrucciones para restablecer tu contraseña.</p>
            <input type="email" placeholder="Correo Electrónico" className="w-full px-3 py-2 border rounded-md mb-4 dark:bg-white dark:text-black" onChange={(e) => setEmail(e.target.value)}/>
            <div className="flex justify-end">
              <button className="px-4 py-2 bg-gradient-to-r from-green-800 to-yellow-300 text-white rounded-md mr-2" onClick={enviarCorreo}>Enviar</button>
              <button className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md" onClick={() => setShowForgotPasswordModal(false)}>Cancelar</button>
            </div>
          </div>
        </div>
      )}

      {showVerificationModal && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-md">
            <h2 className="text-lg font-semibold mb-4">Verificar Código y Cambiar Contraseña</h2>
            <input type="text" placeholder="Código de Verificación" value={verificationCode} onChange={(e) => setVerificationCode(e.target.value)} className="w-full px-3 py-2 border rounded-md mb-4" />
            <input type="password" placeholder="Nueva Contraseña" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="w-full px-3 py-2 border rounded-md mb-4" />
            <input type="password" placeholder="Repetir Contraseña" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-full px-3 py-2 border rounded-md mb-4" />
            <div className="flex justify-end">
              <button className="px-4 py-2 bg-gradient-to-r from-green-800 to-yellow-300 text-white rounded-md mr-2" onClick={handleVerificationSubmit}>Guardar</button>
              <button className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md" onClick={() => setShowVerificationModal(false)}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ForgotPassword
