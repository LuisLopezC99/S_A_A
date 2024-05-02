"use client";
import { useState, useRef } from "react";
import Swal from "sweetalert2"
import { IoDocumentTextSharp } from "react-icons/io5";

export const DownloadButton = ({ filename, type, title }) => {
	
    const handleDownload = async () => {
		
        // Code for download only. Commented out.
            // const response = await fetch(`http://localhost:3000/api/file?filename=${filename}&type=${type}`);
            // const blob = await response.blob();
            // const url = window.URL.createObjectURL(blob);
            // var link = document.createElement('a')
            // link.href = url;
            // link.download = `${filename}`
            // link.click()
            // link.remove();
            // window.URL.revokeObjectURL(url);
        
        // Code for displaying on new tab.
        const response = await fetch(`http://localhost:3000/api/file?filename=${filename}&type=${type}`);
        if (!response.ok) {
            Swal.fire({
                icon: "error",
                title: "Error en el archivo",
                text: "Entrada no posee un archivo asociado aun.",
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
                <IoDocumentTextSharp className="w-7 h-7 text-gray-500 dark:text-green-500" />
            </button>
        </>
    );
};
