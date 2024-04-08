"use client";
import { useState } from "react";
import FormSession from "../modal/FormSession";
import FormAgreement from "../modal/FormAgreement";

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
        <FormSession isModalOpen={openModal} handleModalState={handleClick} />
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
