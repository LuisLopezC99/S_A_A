"use client";
import React, { useState } from "react";
import { CheckModal } from "../pop-up/CheckModal";
import { FaCheckCircle } from "react-icons/fa";

export const CheckButton = ({ data, session_role = "" }) => {
  const [openModal, setOpenModal] = useState(false);

  const handleClick = () => {
    setOpenModal(!openModal);
  };

  const buttonVisible = () => {
    return data.state !== "Cumplido" && data.state !== "Vencido";
  };

  const title = "Tramitar y Cumplir Acuerdo";

  return (
    <>
      {buttonVisible() && (
        <>
          <button
            className="font-bold py-2 px-4 text-center "
            title={title}
            onClick={handleClick}
          >
            <FaCheckCircle className="w-6 h-6 dark:text-green-500" />
          </button>
          <CheckModal
            isModalOpen={openModal}
            handleModalState={handleClick}
            agreementData={data}
            session_role={session_role}
          />
        </>
      )}
    </>
  );
};
