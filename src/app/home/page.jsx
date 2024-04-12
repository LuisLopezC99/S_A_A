import Table from "../components/body/table/Table";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/route";

import { Suspense } from "react";
import Loading from "../components/utils/Loading";
import CreatePassword from "../components/pop-up/CreatePassword";

export default async function Home({ searchParams }) {
  const session = await getServerSession(authOptions);
  let url = "";
  session.user.role !== "secretaria"
    ? (url = `agreement/${session.user.name}`)
    : (url = "agreement");
 
  let currentPage = Number(searchParams?.page) || 1;
  let itemsPerPage = Number(searchParams?.items) || 5;
  let filterBox = (searchParams?.filter) || "";
  let query = (searchParams?.searchText) || "";

  

  return (
    <div className="App">
      <Suspense
        key={currentPage + itemsPerPage + filterBox + query}
        fallback={<Loading />}
      >
        {
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
            session_role={session.user.role}
            filterBox={filterBox}
            querySearh={query}
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
          />
        }
      </Suspense>
      {session.user.firstTime && <CreatePassword user={session.user} />}
    </div>
  );
}
