import Table from "@/app/components/body/Table";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
// Agreement page of a session

const SessionPage  =  async ({ params }) => {
  const session = await getServerSession(authOptions);
  
  return (
        <div className="App">
          <Table columns={["Oficio", "Tema", "Asignado", "Fecha de creación", "Fecha de vencimiento", "Estado", "Acuerdo"]} url={`session/${params.sessionID}`} title={`Session ${params.sessionID}`} isFilter={true} idsession={params.sessionID} session_role={session.user.role} />
        </div>
      ) 
};

export default SessionPage;