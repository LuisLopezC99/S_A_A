import React, { useState } from "react";
import Swal from "sweetalert2";

const ForgotPassword = ({ showForgotPasswordModal, setShowForgotPasswordModal }) => {
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [verificationCode, setVerificationCode] = useState("");

  const enviarCorreo = () => {
    // Aquí se puede agregar lógica para enviar el correo electrónico con el código de verificación
    // Muestra un mensaje de éxito usando SweetAlert2
    Swal.fire({
      icon: 'success',
      title: '¡Correo Enviado!',
      text: 'Se ha enviado un código de verificación a tu correo electrónico.',
    });
    // Muestra el segundo modal después de enviar el correo
    setShowVerificationModal(true);
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
            <h2 className="text-lg font-semibold mb-4">¿Olvidaste tu contraseña?</h2>
            <p className="mb-4">Ingresa tu correo electrónico y te enviaremos instrucciones para restablecer tu contraseña.</p>
            <input type="email" placeholder="Correo Electrónico" className="w-full px-3 py-2 border rounded-md mb-4" />
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

export default ForgotPassword;
