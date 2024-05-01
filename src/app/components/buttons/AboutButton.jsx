"use client";
import { useState } from "react";
import AboutModal from "../pop-up/AboutModal";

export const AboutButton = () => {
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
                    Acerca de Nosotros
                </button>
            </div>
            {openModal && (
                <AboutModal
                    isModalOpen={openModal}
                    handleModalState={handleClick}
                />
            )

            }
        </>
    );
};

export default AboutButton;