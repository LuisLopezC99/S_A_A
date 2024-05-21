"use client"
import React, { useState } from 'react';
import ImageCropper from './ImageCropper';
import { IoIosExit } from "react-icons/io";
import { postDataForm } from '@/app/requests/getRequests';
import Swal from "sweetalert2";

const ProfilePictureModal = ({ isModalOpen, handleModalState, userId }) => {
    const [selectedImage, setSelectedImage] = useState(null);

    const handleUploadImage = async (croppedImage) => {
        try {
            const formData = new FormData();
            formData.append("image", croppedImage);
            formData.append("id", userId);
            return await postDataForm("profilePicture", formData);
        } catch(e) {
            throw new Error("Hubo un error al procesar la solicitud");
        }
    }

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        const imageUrl = URL.createObjectURL(file);
        setSelectedImage(imageUrl);
    };

    const handleCropComplete = async (croppedImage) => {
        const response = await handleUploadImage(croppedImage)
        if (response.error) {
            Swal.fire({
                icon: "error",
                title: "Error en la imagen de perfil",
                text: response.error.message || "Ha ocurrido un error.",
            });
            throw new Error(response.error);
        }
    
        Swal.fire({
        icon: "success",
        title: "¡Foto de perfil actualizada!",
        text: "La solicitud ha sido exitosa.",
        });
        handleModalState()
        location.reload()
    }

    const handleExit = () => {
        setSelectedImage(null)
        handleModalState()
    }
    
    return (
        <div> {isModalOpen && (
            <div
                className="relative z-10"
                aria-labelledby="crop-image-dialog"
                role="dialog"
                aria-modal="true"
            >
                <div className="fixed inset-0 bg-gray-900 bg-opacity-75 transition-all backdrop-blur-sm"></div>
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full justify-center px-5 py-40 text-center ">
                        <div className="relative w-[95%] sm:w-[80%] min-h-[60vh] rounded-2xl bg-gray-800 text-slate-100 text-left shadow-xl transition-all">
                            <div className="px-5 py-4">
                                <button
                                    type="button"
                                    className="rounded-md p-1 inline-flex items-center justify-center text-gray-400 hover:bg-gray-700 focus:outline-none absolute top-2 right-2"
                                    onClick={handleExit}
                                >
                                    <span className="sr-only">Close menu</span>
                                    <IoIosExit size={40}/>
                                </button>
                                <div className='new-line'>Buscar foto: </div>
                                <input type="file" onChange={handleFileChange} />
                                <div className='p-6'>
                                    {selectedImage && <ImageCropper imageSrc={selectedImage} onCropComplete={handleCropComplete} />}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>)}
        </div>
    );
};
export default ProfilePictureModal;