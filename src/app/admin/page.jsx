import UserTable from "../components/body/users-table/UsersTable";
import CreatePassword from "../components/pop-up/CreatePassword";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";

// Admin page
export default async function Admin() {
  const session = await getServerSession(authOptions);

  return (
    <div className="">
      <div className="container mx-auto p-4">
        <h1 className="m text-3xl font-semibold mb-4 text-green dark:text-white m-10">
          Tabla de Usuarios
        </h1>
        <UserTable />
      </div>
      {session.user.firstTime && <CreatePassword user={session.user} />}
    </div>
  );
}
