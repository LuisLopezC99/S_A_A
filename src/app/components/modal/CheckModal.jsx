"use client"
import React, { useState } from "react";
import { useSession } from "next-auth/react";

function CheckModal({ onCloseModal }) {
    const [isOpen, setIsOpen] = useState(true);
    const { data:session, status } = useSession() ;

    const handleToggleModal = () => {
        setIsOpen(!isOpen);
        onCloseModal(); // Llama a la función de cierre del modal desde aquí
    };

    console.log(status);

    return (
        <>
            {isOpen && status === "authenticated" ? (

                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div className="bg-white p-8 max-w-md rounded-lg shadow-lg relative dark:bg-gray-700">

                    <h2 className="text-lg font-semibold mb-4 dark:text-white">Firmar Acuerdo</h2>
                        <p className="dark:text-white">
                            Yo, {session.user.name}, doy fe del cumplimiento de nuestra parte
                            de los diferentes puntos abarcados en el acuerdo presente y por
                            ende lo tramitamos a alcaldía para seguir su debido proceso.
                        </p>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm  mb-2 dark:text-white" htmlFor="file">
                                Documento de cumplimiento:
                            </label>
                            <input
                                className="custom-input"
                                id="file"
                                name="file"
                                type="file"
                            />
                        </div>
                        <div className="flex justify-between">
                            <button className="bg-custom-green hover:bg-custom-green text-white font-bold py-2 px-4 rounded mr-4">
                                Confirmar Acuerdo
                            </button>
                            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={handleToggleModal}>
                                Cancelar
                            </button>
                        </div>
                    </div>

                </div>

            ):(<div className="flex flex-col justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-gray-900 mb-4"></div>
            <p className="text-gray-700 text-lg">Cargando...</p>
        </div>  )}
        </>
    );
}

export default CheckModal;
