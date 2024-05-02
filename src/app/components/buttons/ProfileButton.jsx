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
