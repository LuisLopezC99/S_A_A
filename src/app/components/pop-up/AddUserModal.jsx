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
 * Archive: AddUserModal.jsx
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
import React, { useState } from 'react';
import Swal from 'sweetalert2'


const AddUserModal = ({ isOpen, onClose, addNewUser }) => {
    const [userData, setUserData] = useState({
        email: '',
        name: '',
        role: {
            name: ''
        },
        enabled: true,
        password: '',
        firstTime: true,
    });

    // Handle input changes
    const handleInputChange = (e) => {
        // Get the tag name and value of the input that triggered the event
        const { name, value } = e.target;
        // Update the state of the user data
        setUserData((prevData) => ({
            // Use spread syntax to copy the previous state and update the field that changed
            ...prevData,
            [name]: value,
        }));
    };

    const addUser = (newUser) => {
        addNewUser(newUser);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const randomPassword = Math.random().toString(36).slice(-8);
        console.log(randomPassword);

        try {
            const userDataWithPassword = { ...userData, password: randomPassword };
            console.log("All data", userDataWithPassword);
            // Send a POST request to the server
            const response = await fetch('/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userDataWithPassword),
            });

            if (response.ok) {
                const newUser = await response.json();
                console.log("New User", newUser);
                // Call the function provided by the prop to add the user locally
                addUser(newUser);
                onClose();


                // Clear the fields
                setUserData({
                    email: '',
                    name: '',
                    role: { name: '' },
                    enabled: true,
                    password: '',
                    FirstTime: true,
                });
                const Toast = Swal.mixin({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 1500,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.onmouseenter = Swal.stopTimer;
                        toast.onmouseleave = Swal.resumeTimer;
                    }
                });
                Toast.fire({
                    icon: "success",
                    title: "Added"
                });

                const sentEmail = await fetch('/api/send', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ ...userDataWithPassword, subject: 'Bienvenido a la Municipalidad de Tibás', }),
                });
            } else {
                const Toast = Swal.mixin({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 1500,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.onmouseenter = Swal.stopTimer;
                        toast.onmouseleave = Swal.resumeTimer;
                    }
                });
                Toast.fire({
                    icon: "error",
                    title: "Error on the data"
                });
                console.error('Error al agregar el nuevo usuario');
            }
            console.log(response);
        } catch (error) {
            console.error('Error de red:', error);
        }
    };

    return (
        <div className={`fixed top-0 left-0 w-full h-full flex items-center justify-center ${isOpen ? 'visible' : 'invisible'}`}>
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 sm:w-full md:w-96">
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Agregar Usuario
                    </h3>
                    <button
                        type="submit"
                        onClick={onClose}
                        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                        <svg
                            className="w-3 h-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 14 14"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                            ></path>
                        </svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="p-4 md:p-5">
                    <div className="grid gap-4 mb-4">
                        <div>
                            <label
                                htmlFor="nombre"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Nombre:
                            </label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="Ingresar nombre del usuario"
                                value={userData.name}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="login"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Correo:
                            </label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="correo@munitibas.com"
                                value={userData.email}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="role"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Role:
                            </label>
                            <select
                                name="role"
                                id="role"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                value={userData.role.name}
                                onChange={handleInputChange}
                                required
                            >
                                <option value="">Seleccionar Role</option>
                                <option value="1">Admin</option>
                                <option value="2">Secretaria</option>
                                <option value="3">Departamento</option>
                                <option value="4">Alcaldia</option>
                            </select>
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="text-gray-600 dark:text-green-800 inline-flex items-center bg-yellow-200 hover:bg-yellow-300 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-yellow-400 dark:hover:bg-yellow-500 dark:focus:ring-blue-800"
                    >
                        <svg
                            className="me-1 -ms-1 w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                                clipRule="evenodd"
                            ></path>
                        </svg>
                        Agregar Usuario
                    </button>
                </form>
            </div>
        </div>

    );
};

export default AddUserModal;
