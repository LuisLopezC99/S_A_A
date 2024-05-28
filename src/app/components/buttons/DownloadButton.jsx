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
 * Archive: DownloadButton.jsx
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
import { useState, useRef } from "react";
import Swal from "sweetalert2"
import { IoDocumentTextSharp } from "react-icons/io5";

export const DownloadButton = ({ filename, type, title, icon }) => {
	
    const handleDownload = async () => {
        
        // Code for displaying on new tab.
        const response = await fetch(`http://192.168.0.7:3000/api/file?filename=${filename}&type=${type}`);
        if (!response.ok) {
            Swal.fire({
                icon: "error",
                title: "Error en el archivo",
                text: "El elemento no posee un archivo asociado aún.",
            })
        } else {
        const blob = await response.blob();
        const file = new Blob([blob], {
            type: "application/pdf",
          });
          const fileURL = URL.createObjectURL(file);
          window.open(fileURL);
        }
	}

    return (
        <>
            <button
                className=" font-bold py-2 px-4 text-center "  
                onClick={handleDownload}
                title={title}
            >
                {icon}
            </button>
        </>
    );
};
