"use client";
import { useState } from "react";
import ProfilePictureModal from "../pop-up/ProfilePictureModal";

export const ProfilePictureButton = ({ userId }) => {
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
                    Actualizar Foto de Perfil
                </button>
            </div>
            {
                <ProfilePictureModal
                    isModalOpen={openModal}
                    handleModalState={handleClick}
                    userId={userId}
                />
            }
        </>
    );
};
