export default function loading() {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-gray-900 mb-4"></div>
      <p className="text-gray-700 text-lg">Cargando...</p>
    </div>
  );
}
