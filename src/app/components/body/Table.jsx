import Thead from "./Thead";
import TbodyS from "./TbodyS";
import TbodyA from "./TbodyA";
import { getRequest } from "@/app/requests/getRequests";
import ComboBox from "./ComboBox";
import SearchText from "./SearchText";
import { AddButton } from "../buttons/AddButton";

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
  startIndex = 1,
  endIndex = 1,
  session_role = "",
}) {
  let rows = await loadData(url);
  rows = rows ? rows : [];
  console.log(rows)
  const displayedRows = isFilter
    ? rows[0].agreements
    : rows.slice(startIndex, endIndex + 1);
  console.log(displayedRows)
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
            />
          )}
        </div>

        {/*     We may need to improve the way we do this SearchText validation  */}
        <div className="flex justify-center h-0">
          <SearchText />
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
            <TbodyA rows={displayedRows} role= {session_role} />
          ) : (
            <TbodyA rows={displayedRows} role= {session_role}/>
          )}
        </table>
      </div>
    </div>
  );
}
