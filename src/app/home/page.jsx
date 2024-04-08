import Table from "../components/body/Table";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/route";
import Pagination from "../components/body/Pagination";
import { getRequest } from "@/app/requests/getRequests";
import { Suspense } from "react";
import Loading from "../components/tools/Loading";
import CreatePassword from "../components/modal/CreatePassword";

export default async function Home({ searchParams }) {
  const session = await getServerSession(authOptions);
  let url = ""
  session.user.role !== "secreraria"?
    url = `agreement/${session.user.name}` :
    url = "session";
  let totalDocuments = Number(await getRequest(`${url}?count=1`));
  let currentPage = Number(searchParams?.page) || 1;
  let itemsPerPage = Number(searchParams?.items) || 5;

  
  let startIndex = (currentPage - 1) * itemsPerPage;
  let endIndex = Math.min(startIndex + itemsPerPage - 1, totalDocuments - 1);

  return (
    <div className="App">
      <Suspense key={startIndex + endIndex} fallback={<Loading />}>
        {
          session.user.role !== "secreraria" ?
            (
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
                title="Acuerdos Asignados"
                url={url}
                isFilter={false}
                startIndex={startIndex}
                endIndex={endIndex}
                session_role={session.user.role}
              />
            ) :
            (
              <Table
                columns={[
                  "Fecha De Sesion",
                  "Tipo de sesión",
                  "Link de Facebook",
                  "Session",
                ]}
                title={`Sesiones`}
                url={url}
                isFilter={false}
                startIndex={startIndex}
                endIndex={endIndex}
                
              />
            )
        }

      </Suspense>
      <div className="flex justify-center mt-1 ">
        {typeof totalDocuments === "number" && !isNaN(totalDocuments) && (
          <Pagination totalDocuments={totalDocuments} />
        )}
      </div>
      {session.user.firstTime &&
        <CreatePassword user={session.user} />
      }
    </div>
  );
}
