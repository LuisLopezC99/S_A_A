"use client"
import Image from "next/image"
import defaultProfilePic from "../../../../public/defaultProfilePic.png"
import { useState } from "react";
import ProfileModal from "../modal/ProfileModal"

export const ProfileButton = ({ userData }) => {
    const [openModal, setOpenModal] = useState(false);

    const handleClick = () => {
        !openModal ? setOpenModal(true) : setOpenModal(false);
    }

    return (
        <>
            <div className="relative">
                <button className="relative z-50 bg-white p-0 rounded-full shadow-lg" onClick={handleClick}>
                    <Image id="openProfileButton" src={defaultProfilePic} className="w-9 h-9 rounded-full" alt="Imagen de Perfil" />
                </button>
                {<ProfileModal isModalOpen={openModal} handleModalState={handleClick} userData={userData} />}
            </div>
        </>

    )
} 
