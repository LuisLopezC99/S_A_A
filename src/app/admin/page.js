import UserTable from "../components/body/UsersTable";
export default function Admin() {
  return (
    <div className="h-screen w-screen bg-gray-900">
      <div className="container mx-auto p-4">
        <h1 className="m text-3xl font-semibold mb-4 text-white m-10">
          Tabla de Usuarios
        </h1>
        <UserTable />
      </div>
    </div>
  );
}
