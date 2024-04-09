// import Table from "../../components/body/Table";
// import Pagination from "../../components/body/Pagination";
// import { getRequest } from "@/app/requests/getRequests";
// import { Suspense } from "react";
// import Loading from "../../components/tools/Loading";
// export default async function Home({ searchParams }) {
//   let url = "session";
//   let totalDocuments = Number(await getRequest(`${url}?count=1`));
//   console.log(totalDocuments)
//   let currentPage = Number(searchParams?.page) || 1;
//   let itemsPerPage= Number(searchParams?.items) || 5;
//   let startIndex = (currentPage - 1) * itemsPerPage;
//   let endIndex = Math.min(startIndex + itemsPerPage - 1, totalDocuments - 1);
//   return (
//     <div className="">
//       <Suspense key={startIndex + endIndex} fallback={<Loading />}>
//         <Table
//           columns={[
//             "Fecha De Sesion",
//             "Tipo de sesión",
//             "Link de Facebook",
//             "Session",
//           ]}
//           title={`Sesiones`}
//           url={url}
//           isFilter={false}
//           startIndex={startIndex}
//           endIndex={endIndex}
//         />
//       </Suspense>
//       <div className="flex justify-center mt-1 ">
//         {typeof totalDocuments === "number" && !isNaN(totalDocuments) && (
//           <Pagination totalDocuments={totalDocuments} />
//         )}
//       </div>
//     </div>
//   );
// }