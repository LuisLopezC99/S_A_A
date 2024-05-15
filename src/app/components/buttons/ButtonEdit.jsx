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
 * Archive: ButtonEdit.jsx
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
import SessionModal from "../pop-up/SessionModal";
import EditAgreement from "../pop-up/EditAgreement";

export const ButtonEdit = ({ title, children, data, session_role = "" }) => {
  const [openModal, setOpenModal] = useState(false);

  const handleClick = () => {
    !openModal ? setOpenModal(true) : setOpenModal(false);
  };

  return (
    <>
      <button
        className="  font-bold py-2 px-4 "
        title={`Editar ${title}`}
        onClick={handleClick}
      >
        {children}
      </button>
      {title === "session" ? (
        <SessionModal
          isModalOpen={openModal}
          handleModalState={handleClick}
          sessionData={data}
        />
      ) : (
        <EditAgreement
          isModalOpen={openModal}
          handleModalState={handleClick}
          agreementData={data}
          session_role={session_role}
        />
      )}
    </>
  );
};
