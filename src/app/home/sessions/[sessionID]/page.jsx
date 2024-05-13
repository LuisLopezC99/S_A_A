/**
 * Proyect: Sistema de acuerdos y actas municipales (SAA)
 * Company: Municipalidad de Tibás
 * Universidad Nacional de Costa Rica
 * School of Informatic
 * Information Systems Engineering
 * 
 * Date: 10/05/2024
 * Principal_Directory: src
 * Directory_1: app
 * Directory: home
 * File_1: [sessionID]
 * File: [sessionID]
 * Archive: page.jsx
 * 
 * Authors:
 * - Scrum: Luis Ignacio López Castro
 *   - email: luis.lopez.castro@est.una.ac.cr
 *   - ID: 402420889
 * - David Coto Solano
 *   - email: victor.coto.solano@est.una.ac.cr
 *   - ID: 305440064
 * - Andrés León Orozco
 *   - email: andres.leon.orozco@est.una.ac.cr
 *   - ID: 118920778
 * - Eduardo Aarón Ojeda Paladino
 *   - email: eduardo.ojeda.paladino@est.una.ac.cr
 *   - ID: 116500136
 * - Jennifer Quirós Chacón
 *   - email: jennifer.quiros.chacon@est.una.ac.cr
 *   - ID: 702790153
 * - José Miguel Sequeira Hernández
 *   - email: jose.sequeira.hernandez@est.una.ac.cr
 *   - ID: 116590034
 */

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
            "Sesión",
            "Tema",
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
