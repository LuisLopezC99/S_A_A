/**
 * Proyect: Sistema de acuerdos y actas municipales (SAA)
 * Company: Municipalidad de Tibás
 * Universidad Nacional de Costa Rica
 * School of Informatic
 * Information Systems Engineering
 * 
 * Date: 10/05/2024
 * Principal_Directory: src
 * Directory_1: app
 * Directory: components
 * File: buttons
 * Archive: AboutButton.jsx
 * 
 * Authors:
 * - Scrum: Luis Ignacio López Castro
 *   - email: luis.lopez.castro@est.una.ac.cr
 *   - ID: 402420889
 * - David Coto Solano
 *   - email: victor.coto.solano@est.una.ac.cr
 *   - ID: 305440064
 * - Andrés León Orozco
 *   - email: andres.leon.orozco@est.una.ac.cr
 *   - ID: 118920778
 * - Eduardo Aarón Ojeda Paladino
 *   - email: eduardo.ojeda.paladino@est.una.ac.cr
 *   - ID: 116500136
 * - Jennifer Quirós Chacón
 *   - email: jennifer.quiros.chacon@est.una.ac.cr
 *   - ID: 702790153
 * - José Miguel Sequeira Hernández
 *   - email: jose.sequeira.hernandez@est.una.ac.cr
 *   - ID: 116590034
 */

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