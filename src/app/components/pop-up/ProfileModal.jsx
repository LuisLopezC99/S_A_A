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
 * Archive: ProfileModal.jsx
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
import { useRouter } from "next/navigation";
import { Logout } from "../logout/Logout";
import { useState, useEffect, useRef } from "react";
import { FaUserCircle } from "react-icons/fa";

import { ProfileInformationButton } from "../buttons/ProfileInformationButton";
import AboutButton from "../buttons/AboutButton";

const ProfileModal = ({ isModalOpen, handleModalState, userData}) => {
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
  const router = useRouter();
  const ref = useRef(null);

  useEffect(() => { 
    const handleOutSideClick = (event) => {
      if (
        isModalOpen &&
        !ref.current?.contains(event.target) &&
        event.target.id !== "openProfileButton"
      ) {
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

  const openAboutModal = () => {
    setIsAboutModalOpen(true);
  };

  const closeAboutModal = () => {
    setIsAboutModalOpen(false);
  };

  return (
    <div>
      {isModalOpen && (
        <div
          ref={ref}
          className="dark:bg-gray-700 w-full md:w-96 lg:w-96 absolute z-50 mt-1 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 origin-top-right right-0"
        >
          <div className="flex flex-col items-center">
            <div className="flex-shrink-0 py-4">
              <FaUserCircle
                id="openProfileButton"
                
                className="w-20 h-20 rounded-full object-cover text-green-600"
                alt="Imagen de Perfil"
              />
            </div>
            <div className="ml-4 text-center">
              <p className="text-lg font-medium dark:text-white">
                {userData["name"].split(" ")[0]}
              </p>
              <p className="text-sm text-gray-500">{userData["email"]}</p>
              <p className="inline-block border-b px-1 bg-gray-600 mt-1 text-sm text-white">
                {userData["role"]}
              </p>
            </div>
            <div className="mt-4 border-t border-b border-gray-350">
              <ul className="flex flex-col items-left text-sm">
                <li className="mt-1 mb-2">
                  <ProfileInformationButton
                    id="profileInformationButton"
                    userData={userData}
                  />

                </li>
                <li className="mb-2">
                  <a
                    href="#"
                    className="md:hover:text-green-500 dark:text-white"
                  >
                    Manual de Usuario
                  </a>
                </li>

                <li className="mt-1 mb-2">
                
                <AboutButton  />

                </li>

              </ul>
            </div>
            <div className="p-3">
              <Logout />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default ProfileModal;
