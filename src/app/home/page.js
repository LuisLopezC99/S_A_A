import Table from "../components/body/Table";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/dist/server/api-utils";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <div className="App">
      <Table
        columns={[
          "Oficio",
          "Tema",
          "Asignado",
          "Fecha de creación",
          "Fecha de vencimiento",
          "Estado",
          "Acuerdo",
        ]}
        url={`agreement/${session.user.name}`}
        title={`Mis Acuerdos Asignados`}
        isFilter={false}
      />
    </div>
  );
}
