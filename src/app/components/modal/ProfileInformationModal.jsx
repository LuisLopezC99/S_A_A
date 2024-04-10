"use client"
import { putData } from '@/app/requests/getRequests';
import { useState, useEffect, useRef } from 'react';
import Image from "next/image"
import defaultProfilePic from "../../../../public/defaultProfilePic.png"
import Swal from 'sweetalert2';
import { signOut } from 'next-auth/react';
import verifyPassword from '../tools/verifyPassword';

const ProfileInformationModal = ({ isModalOpen, handleModalState, userData }) => {

    const [showChangePassword, setShowChangePassword] = useState(false);
    const [visible, setVisible] = useState(false);

    const closeModal = () => {
        handleModalState();
    };

    const handleShowChangePassword = (show) => {
        setShowChangePassword(show);
    };

    const handleChangePassword = async (event) => {
        console.log("Cambiando contraseña")
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const currentPassword = formData.get("currentPassword");
        const newPassword = formData.get("newPassword");
        const confirmPassword = formData.get("confirmPassword");
        const user = { currentPassword, newPassword }
        if (newPassword !== confirmPassword) {
            console.log("Contraseñas no coinciden")
            const result = await Swal.fire({
                icon: 'error',
                title: 'Error en cambio de contraseña',
                text: 'La nueva contraseña y la confirmación no coinciden. Intente de nuevo.',
                button: {
                  text: "Aceptar",
                  closeModal: true,
                  visible: true,
                  value: true
                }
              });
              

              if (result.isConfirmed) {
                console.log("Cerrando modal")
                // Se cierra el modal y se ejecuta el código siguiente
                return;
              }
            
        }
        const verifyPass = verifyPassword(newPassword);
        if (!verifyPass) {
           
            const result = await Swal.fire({
                icon: 'error',
                title: 'Error en cambio de contraseña',
                text: 'La contraseña no cumple con las especificaciones. Intente de nuevo.',
                button: {
                  text: "Aceptar",
                  closeModal: true,
                  visible: true,
                  value: true
                }
              });
              

              if (result.isConfirmed) {
                // Se cierra el modal y se ejecuta el código siguiente
                return;
              }
            
        }
        const response = await putData(`users?changepass=true`, user);
        if (response) {
            Swal.fire({
                icon: 'success',
                title: 'Cambio de Contraseña',
                text: 'La contraseña ha sido cambiada exitosamente, Vuelva a iniciar sesion.',
            }).then(() => {
                signOut({ redirect: true })
                setVisible(false)
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error en cambio de contraseña',
                text: 'La contraseña actual digitada no coincide con el usuario en sesion. Intente de nuevo.',
            })
        }

    }

    return (
        <div>
            {isModalOpen &&
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white shadow-lg rounded-md p-8 w-96 dark:bg-gray-700 w-96">
                        <div className="flex justify-between items-center mb-6">
                            <div>
                                <button className="text-gray-500 hover:text-gray-700 md:hover:text-green-500 dark:text-white" onClick={() => handleShowChangePassword(false)}>Perfil</button>
                                <button className="ml-4 text-gray-500 hover:text-gray-700 md:hover:text-green-500 dark:text-white" onClick={() => handleShowChangePassword(true)}>Cambio de Contraseña</button>
                            </div>
                            <button className="text-gray-500 hover:text-gray-700 md:hover:text-green-500" onClick={closeModal}>X</button>
                        </div>
                        <hr className="my-4" />
                        {(
                            !showChangePassword ?
                                <div>
                                    <h3 className="text-lg font-medium mb-2 dark:text-white">Datos del Usuario</h3>
                                    <div className="flex items-center">
                                        <div className="mr-8 py-3">
                                            <div className="mb-4">
                                                <label className="block text-sm font-medium text-gray-700 dark:text-white">Nombre Completo:</label>
                                                <p className="text-gray-500">{userData["name"]}</p>
                                            </div>
                                            <div className="mb-4">
                                                <label className="block text-sm font-medium text-gray-700 dark:text-white">Correo Electronico:</label>
                                                <p className="text-gray-500">{userData["email"]}</p>
                                            </div>
                                            <div className="mb-4">
                                                <label className="block text-sm font-medium text-gray-700 dark:text-white">Rol de Usuario:</label>
                                                <p className="text-gray-500">{userData["role"]}</p>
                                            </div>
                                        </div>

                                        <Image src={defaultProfilePic} className="w-40 h-40 rounded-full object-cover" alt="Profile Picture" />
                                    </div>
                                </div>
                                :
                                <div>
                                    <h3 className="text-lg font-medium mb-2 dark:text-white">Cambiar Contraseña</h3>
                                    <form onSubmit={handleChangePassword}>
                                        <div className="mb-4">
                                            <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 dark:text-white">Contraseña Actual</label>
                                            <input type="password" id="currentPassword" name="currentPassword" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required />
                                        </div>
                                        <div className="mb-4">
                                            <h2 className="text-lg font-semibold mb-4 dark:text-white">Nueva Contraseña</h2>
                                            <p className="mb-4 dark:text-white">Favor crear su nueva contraseña con las siguientes validaciones:</p>
                                            <ul className="list-disc pl-6 mb-4 dark:text-white">
                                                <li>Debe tener al menos 8 caracteres</li>
                                                <li>Debe incluir al menos una letra en mayúscula</li>
                                                <li>Debe incluir al menos una letra en minúscula</li>
                                                <li>Debe incluir al menos un número</li>
                                                <li>Debe incluir al menos un carácter especial</li>
                                            </ul>
                                            <div>
                                                {visible && (
                                                    <span style={{ color: 'red' }}>La contraseña no cumple con las especificaciones, Intentelo de nuevo</span>
                                                )}
                                            </div>
                                            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 dark:text-white">Nueva Contraseña</label>
                                            <input type="password" id="newPassword" name="newPassword" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required />
                                        </div>
                                        <div className="mb-4">
                                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-white">Confirmar Contraseña</label>
                                            <input type="password" id="confirmPassword" name="confirmPassword" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required />
                                        </div>
                                        <button type="submit" class="w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75">Guardar Contraseña</button>
                                    </form>

                                </div>
                        )}
                    </div>
                </div>
            }
        </div>
    );

}

export default ProfileInformationModal