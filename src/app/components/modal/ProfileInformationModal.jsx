"use client"
import { useRouter } from 'next/navigation';
import { Logout } from "../logout/Logout";
import { useState, useEffect, useRef } from 'react';
import Image from "next/image"
import defaultProfilePic from "../../../../public/defaultProfilePic.png"

const ProfileInformationModal = ({ isModalOpen, handleModalState, userData }) => {
    
    const [showChangePassword, setShowChangePassword] = useState(false);

    const closeModal = () => {
        handleModalState();
    };

    const handleShowChangePassword = (show) => {
        setShowChangePassword(show);
    };

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
                                    <form>
                                        <div className="mb-4">
                                            <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 dark:text-white">Contraseña Actual</label>
                                            <input type="password" id="currentPassword" name="currentPassword" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                                        </div>
                                        <div className="mb-4">
                                            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 dark:text-white">Nueva Contraseña</label>
                                            <input type="password" id="newPassword" name="newPassword" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                                        </div>
                                        <div className="mb-4">
                                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-white">Confirmar Contraseña</label>
                                            <input type="password" id="confirmPassword" name="confirmPassword" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                                        </div>
                                    </form>
                                    <button type="submit" class="w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75">Guardar Contraseña</button>
                                </div>
                        )}
                    </div>
                </div>
            }
        </div>
    );

}

export default ProfileInformationModal