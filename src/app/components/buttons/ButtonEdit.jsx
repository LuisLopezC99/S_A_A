"use client";
import React, { useState } from "react";
import EditSession from "../pop-up/EditSession";
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
        <EditSession
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
