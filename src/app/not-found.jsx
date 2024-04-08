import Link from "next/link";
import muniImagen from "../../public/muniImagen.jpg";
import Image from "next/image";
export default function NotFound() {
  return (
    <div className="relative h-screen">
    {/* Imagen de fondo */}
    <Image
      src={muniImagen} // Ruta de la imagen de fondo
      alt="Imagen de fondo"
      layout="fill"
      objectFit="cover"
    />
    
    {/* Div con fondo blanco */}
    <div className="absolute inset-0 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Pagina No Encontrada</h1>
        <a href="/" className="text-blue-500">Volver a Inicio</a>
      </div>
    </div>
  </div>
  );
}