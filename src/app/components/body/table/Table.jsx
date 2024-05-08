import Thead from "./Thead";
import TbodyS from "./TbodyS";
import TbodyA from "./TbodyA";
import { getRequest } from "@/app/requests/getRequests";
import ComboBox from "../filters/ComboBox";
import SearchText from "../filters/SearchText";
import { AddButton } from "../../buttons/AddButton";
import { filterRowA, filterRowS } from "../../utils/filterRows";
import ReportButton from "../../buttons/ReportButton";
import Pagination from "../pagination/Pagination";
import { HiDocumentAdd } from "react-icons/hi";

const loadData = async (url) => {
  const data = await getRequest(url);
  return data;
};

export default async function Table({
  columns,
  title,
  url,
  isFilter = false,
  idsession = "",
  session_role = "",
  filterBox = "",
  querySearh = "",
  currentPage = 1,
  itemsPerPage = 5,
}) {

  let rows = await loadData(url);
    rows = rows ? rows : [];
    rows = rows.reverse();

  const filterRows =
    url === "session"
      ? filterRowS(rows, filterBox, querySearh)
      : isFilter
        ? filterRowA(rows[0].agreements, filterBox, querySearh)
        : filterRowA(rows, filterBox, querySearh);

  const totalDocuments =
    querySearh != ""
      ? 1
      : filterRows.length === undefined || filterRows.length == 0
        ? 1
        : filterRows.length;

  let startIndex = (currentPage - 1) * itemsPerPage;
  let endIndex = totalDocuments == 1 ? 49 : Math.min(startIndex + itemsPerPage - 1, totalDocuments - 1);

  const displayedRows = filterRows.slice(startIndex, endIndex + 1);


  const reportTitle =
    url === "session"
      ? "Sesiones"
      : isFilter
        ? `Acuerdos de la Sesión ${idsession}`
        : session_role !== "secretaria"
          ? "Mis Acuerdos Asignados"
          : "Acuerdos";

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <div className="flex justify-center items-center m-10">
        <h2 className="text-3xl" style={{ color: "#62BE1F" }}>
          {title}
        </h2>
      </div>

      <div className="block my-5 mx-3 p-5">

      <div className="flex justify-start">
  <div className="relative">
    {url === "session" ? (
      <div className="flex items-center">
        <ComboBox
          className="rounded-md w-full md:w-64 px-4 py-2" // Utiliza w-full en lugar de un ancho fijo
          options={[
            { value: "Extraordinaria", label: "Extraordinarios" },
            { value: "Ordinaria", label: "Ordinarios" },
          ]}
          filterName={" Tipo Sesión"}
          currentSelect={filterBox}
        />
        <svg
          className="absolute top-1/2 right-2 transform -translate-y-1/2 w-5 h-5 text-gray-500"
          viewBox="0 0 20 20"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    ) : (
      <ComboBox
        className="w-full md:w-64 px-4 py-2" // Utiliza w-full en lugar de un ancho fijo
        options={[
          { value: "Tramitado", label: "Tramitados" },
          { value: "Pendiente", label: "Pendientes" },
          { value: "Por vencer", label: "Por vencer" },
          { value: "Vencido", label: "Vencidos" },
          { value: "Cumplido", label: "Cumplidos" },
        ]}
        filterName={" Estado"}
        currentSelect={filterBox}
      />
    )}
    <svg
      className="absolute top-1/2 right-2 transform -translate-y-1/2 w-5 h-5 text-gray-500"
      viewBox="0 0 20 20"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
        clipRule="evenodd"
      />
    </svg>
  </div>
</div>


        <div className="mt-[-40px]">
          <ReportButton
            rows={filterRows}
            header={columns}
            title={reportTitle}
            state={filterBox}
            type={filterBox}
            filter={querySearh}
            sesion={idsession}
          />
        </div>

        {/*     We may need to improve the way we do this SearchText validation  */}
        <div className="flex justify-center items-center md:flex-col">
          <div className="mt-4 md:mt-0 w-full max-w-xs md:max-w-sm">
            <SearchText currentText={querySearh} />
          </div>
        </div>

        {isFilter || url === "session" ? (
          <div>
          <div className="flex justify-end mt-2"> {/* Agregué mt-2 para mover el botón hacia abajo */}
            <AddButton
              title={url}
              idSession={url !== "session" ? idsession : ""}
              className="flex items-center justify-center max-w-xs md:max-w-sm"
            >
              <div className="flex items-center">
                <HiDocumentAdd className="w-6 h-6 mr-1 text-gray-500 dark:text-green-600" />
                <span className="md:hidden">Agregar</span>
                <span className="hidden md:inline-block mt-1">Agregar</span>
              </div>
            </AddButton>
          </div>
        </div>
        

        ) : (
          <div className="flex justify-end py-5 px-4"></div>

        )}

      </div>

      <div className="mx-10 h-80 relative overflow-x-auto overflow-y-auto ">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 dark:bg-gray-800 px-10">
          <Thead columns={columns} />
          {url === "session" ? (
            <TbodyS rows={displayedRows} columns={columns} />
          ) : isFilter ? (
            <TbodyA rows={displayedRows} role={session_role} />
          ) : (
            <TbodyA rows={displayedRows} role={session_role} />
          )}
        </table>
      </div>
      <div className="flex justify-center mt-1 ">
        {typeof totalDocuments === "number" && !isNaN(totalDocuments) && (
          <Pagination
            totalDocuments={totalDocuments}
            cupage={currentPage}
            items={itemsPerPage}
          />
        )}
      </div>
    </div>
  );
}
