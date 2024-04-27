import Thead from "./Thead";
import TbodyS from "./TbodyS";
import TbodyA from "./TbodyA";
import { getRequest } from "@/app/requests/getRequests";
import ComboBox from "../filters/ComboBox";
import SearchText from "../filters/SearchText";
import { AddButton } from "../../buttons/AddButton";
import { filterRowA, filterRowS } from "../../utils/filterRows";
import Pagination from "../pagination/Pagination";

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
  rows = rows ? rows  : [];
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
  let endIndex = totalDocuments==1? 49 : Math.min(startIndex + itemsPerPage - 1, totalDocuments - 1);

  const displayedRows = filterRows.slice(startIndex, endIndex + 1);

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <div className="flex justify-center items-center m-10">
        <h2 className="text-3xl" style={{ color: "#62BE1F" }}>
          {title}
        </h2>
      </div>
      <div className="block my-5  mx-3  p-5">
        <div className="flex justify-start h-0">
          {url === "session" ? (
            <ComboBox
              options={[
                { value: "Extraordinaria", label: "Extraordinarios" },
                { value: "Ordinaria", label: "Ordinarios" },
              ]}
              filterName={" Tipo Sesion"}
              currentSelect={filterBox}
            />
          ) : (
            <ComboBox
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
        </div>

        {/*     We may need to improve the way we do this SearchText validation  */}
        <div className="flex justify-center h-0">
          <SearchText currentText={querySearh} />
        </div>
        {isFilter || url === "session" ? (
          <div className="flex justify-end ">
            <AddButton
              title={url}
              idSession={url !== "session" ? idsession : ""}
            >
              Agregar
            </AddButton>
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
