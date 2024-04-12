"use client";
import Image from "next/image";
import defaultProfilePic from "../../../../public/defaultProfilePic.png";
import { useState } from "react";
import ProfileInformationModal from "../pop-up/ProfileInformationModal";

export const ProfileInformationButton = ({ userData }) => {
  const [openModal, setOpenModal] = useState(false);

  const handleClick = () => {
    !openModal ? setOpenModal(true) : setOpenModal(false);
  };

  return (
    <>
      <div className="relative">
        <button
          className="md:hover:text-green-500 dark:text-white"
          onClick={handleClick}
        >
          Ver Perfil
        </button>
      </div>
      {
        <ProfileInformationModal
          isModalOpen={openModal}
          handleModalState={handleClick}
          userData={userData}
        />
      }
    </>
  );
};
