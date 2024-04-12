import Table from "../../components/body/table/Table";
import { Suspense } from "react";
import Loading from "../../components/utils/Loading";
export default async function Home({ searchParams }) {
  let url = "session";
  
  let currentPage = Number(searchParams?.page) || 1;
  let itemsPerPage = Number(searchParams?.items) || 5;
  let filterBox = searchParams?.filter || "";
  let query = searchParams?.searchText || "";
  return (
    <div className="">
      <Suspense
        key={currentPage + itemsPerPage + filterBox + query}
        fallback={<Loading />}
      >
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
          filterBox={filterBox}
          querySearh={query}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
        />
      </Suspense>
    </div>
  );
}
