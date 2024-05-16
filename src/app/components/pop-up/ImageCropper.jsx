"use client"
import React, { useState, useRef } from 'react';
import Cropper from 'react-easy-crop';
import getCroppedImg from '../tools/cropImage';

const ImageCropper = ({ imageSrc, onCropComplete }) => {
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
    
    const onCropCompleted = (croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels)
    }

    const onCropChange = (crop) => {
        setCrop(crop);
    };

    const onZoomChange = (zoom) => {
        setZoom(zoom);
    };

    const handleConfirmCrop = async () => {
        const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels, 0);
        onCropComplete(croppedImage);
    };

    return (
        <div>
            <div className="relative w-full h-96 mb-5">
                <Cropper
                    image={imageSrc}
                    crop={crop}
                    zoom={zoom}
                    aspect={4 / 3}
                    onCropChange={onCropChange}
                    onZoomChange={onZoomChange}
                    onCropComplete={onCropCompleted}
                />
                <button onClick={handleConfirmCrop} className="absolute bottom-4 right-4 bg-yellow-300 text-gray-500 font-bold px-4 py-2 border border-yellow-400 rounded shadow" >Confirmar Recorte</button>
            </div>  
        </div>
    );
}
export default ImageCropper;