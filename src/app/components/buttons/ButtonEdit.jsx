import React, { useState } from "react";
import EditSession from "../modal/EditSession";
import EditAgreement from "../modal/EditAgreement";


export const ButtonEdit = ({ title, children, data }) => {
  const [openModal, setOpenModal] = useState(false);

  const handleClick = () => {
    !openModal ? setOpenModal(true) : setOpenModal(false);
  };

  return (
    <>
      <button
        className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-4 border border-yellow-700 rounded"
        title={title}
        onClick={handleClick}
      >
        {children}
      </button>
      {title === "session" ?
        <EditSession isModalOpen={openModal}
          handleModalState={handleClick}
          sessionData={data}
        /> :
        <EditAgreement isModalOpen={openModal} handleModalState={handleClick} agreementData={data} />}
    </>
  );
};
