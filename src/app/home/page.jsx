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

import Table from "../components/body/table/Table";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/route";

import { Suspense } from "react";
import Loading from "../components/utils/Loading";
import CreatePassword from "../components/pop-up/CreatePassword";

// Home page component
export default async function Home({ searchParams }) {
  const session = await getServerSession(authOptions); // Get the current session
  let url = ""; // Determine the URL based on the user's role
  session.user.role !== "secretaria"
    ? (url = `agreement/${session.user.name}`) // If not a secretary, use the agreement URL with username
    : (url = "agreement"); // If a secretary, use the general agreement URL
 
  let currentPage = Number(searchParams?.page) || 1; // Current page number, defaulting to 1
  let itemsPerPage = Number(searchParams?.items) || 5; // Number of items per page, defaulting to 5
  let filterBox = (searchParams?.filter) || ""; // Filter box value
  let query = (searchParams?.searchText) || ""; // Search query

  

  return (
    <div className="flex-grow">
      <Suspense
        key={currentPage + itemsPerPage + filterBox + query}
        fallback={<Loading />} // Show loading component while data is loading
      >
        {
          <Table
            columns={[
              "Oficio",
              "Sesión",
              "Tema",
              "Asignado",
              "Fecha de creación",
              "Fecha de vencimiento",
              "Estado",
              "Opciones de Acuerdo",
            ]} // Define the columns for the table
            title="Acuerdos Asignados" // Title for the table
            url={url} // URL to fetch data for the table
            isFilter={false} // Disable filter option in the table
            session_role={session.user.role} // Pass user role to the table
            filterBox={filterBox} // Filter box value
            querySearh={query} // Search query
            currentPage={currentPage} // Current page number
            itemsPerPage={itemsPerPage} // Items per page
          />
        }
      </Suspense>
      {session.user.firstTime && <CreatePassword user={session.user} />}
    </div>
  );
}
