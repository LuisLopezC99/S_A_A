"use client";
import { useState } from "react";
import FormSession from "../pop-up/FormSession";
import FormAgreement from "../pop-up/FormAgreement";
import SessionModal from "../pop-up/SessionModal"

export const AddButton = ({ title, children, idSession = "" }) => {
  const [openModal, setOpenModal] = useState(false);

  const handleClick = () => {
    !openModal ? setOpenModal(true) : setOpenModal(false);
  };

  return (
    <>
      <button
        className="bg-yellow-300 hover:bg-yellow-400 text-gray-500 font-bold py-2 px-4 border border-yellow-400 rounded"
        title={title}
        onClick={handleClick}
      >
        {children}
      </button>
      {title === "session" ? (
        <SessionModal isModalOpen={openModal} handleModalState={handleClick} />
      ) : (
        <FormAgreement
          isModalOpen={openModal}
          handleModalState={handleClick}
          sessionid={idSession}
        />
      )}
    </>
  );
};
