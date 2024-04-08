"use client"
import { useRouter } from 'next/navigation';
import { Logout } from "../logout/Logout";
import { useState, useEffect, useRef } from 'react';
import Image from "next/image"
import defaultProfilePic from "../../../../public/defaultProfilePic.png"

function ProfileModal({ isModalOpen, handleModalState, userData }) {
    const router = useRouter();
    const ref = useRef(null);

    useEffect(() => {
        const handleOutSideClick = (event) => {
            console.log(event.target.id)
            if (isModalOpen && !ref.current?.contains(event.target) && event.target.id !== 'openProfileButton') {
                handleModalState();
            }
        };

        window.addEventListener("mousedown", handleOutSideClick);

        return () => {
            window.removeEventListener("mousedown", handleOutSideClick);
        };
    }, [ref, isModalOpen]);

    const closeModal = () => {
        handleModalState();
    };

    return (
        <div>
            {isModalOpen && <div ref={ref} class="dark:bg-gray-350 absolute z-50 mt-1 w-48 md:w-64 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 origin-top-right right-0">
                <div className="flex flex-col items-center">
                    <div className="flex-shrink-0 py-4">
                        <Image id="openProfileButton" src={defaultProfilePic} className="w-20 h-20 rounded-full object-cover" alt="Imagen de Perfil" />
                    </div>
                    <div className="ml-4 text-center">
                        <p className="text-lg font-medium">{ userData["name"] }</p>
                        <p className="text-sm text-gray-500">{userData["email"]}</p>
                        <p className="inline-block border-b px-1 bg-gray-600 mt-1 text-sm text-white">{userData["role"]}</p>
                    </div>
                    <div className="mt-4 border-t border-b border-gray-350">
                        <ul className="flex flex-col items-left text-sm">
                            <li className="mt-1 mb-2">
                                <a href="#" className="md:hover:text-green-500">Ver Perfil</a>
                            </li>
                            <li className="mb-2">
                                <a href="#" className="md:hover:text-green-500">Manual de Usuario</a>
                            </li>
                            <li className="mb-1">
                                <a href="#" className="md:hover:text-green-500">Ayuda</a>
                            </li>
                        </ul>
                    </div>
                    <div className="p-3">
                        <Logout/>
                    </div>
                </div>
            </div>}
        </div>
    );

}
export default ProfileModal;