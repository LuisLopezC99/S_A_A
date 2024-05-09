import Table from "@/app/components/body/table/Table";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Suspense } from "react";
import Loading from "../../../components/utils/Loading";
// Agreement page of a session

const SessionPage = async ({ params, searchParams }) => {
  const session = await getServerSession(authOptions);
  let currentPage = Number(searchParams?.page) || 1;
  let itemsPerPage = Number(searchParams?.items) || 5;
  let filterBox = searchParams?.filter || "";
  let query = searchParams?.searchText || "";
  let type = searchParams?.type || "";
  let consecutive = searchParams?.consecutive || "";
  return (
    <div className="flex-grow">
      <Suspense
        key={currentPage + itemsPerPage + filterBox + query}
        fallback={<Loading />}
      >
        <Table
          columns={[
            "Oficio",
            "Tema",
            "Sesion",
            "Asignado",
            "Fecha de creación",
            "Fecha de vencimiento",
            "Estado",
            "Acuerdo",
          ]}
          url={`session/${params.sessionID}`}
          title={`Sesión ${type} No. ${consecutive}`}
          isFilter={true}
          idsession={params.sessionID}
          session_role={session.user.role}
          filterBox={filterBox}
          querySearh={query}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
        />
      </Suspense>
    </div>
  );
};

export default SessionPage;
