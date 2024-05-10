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
 * File: buttons
 * Archive: ProfileButton.jsx
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
import { useState } from "react";
import ProfileModal from "../pop-up/ProfileModal";
import { FaUserCircle } from "react-icons/fa";

export const ProfileButton = ({ userData }) => {
  const [openModal, setOpenModal] = useState(false);

  const handleClick = () => {
    !openModal ? setOpenModal(true) : setOpenModal(false);
  };

  return (
    <>
      <div className="relative">
        <button
          className="relative z-50 dark:bg-gray-700 bg-white p-0 rounded-full shadow-lg"
          onClick={handleClick}
        >
          <FaUserCircle 
            id="openProfileButton"
            className="w-11 h-11 rounded-full text-green-600"
            alt="Imagen de Perfil"
          />
        </button>
        {
          <ProfileModal
            isModalOpen={openModal}
            handleModalState={handleClick}
            userData={userData}
          />
        }
      </div>
    </>
  );
};
