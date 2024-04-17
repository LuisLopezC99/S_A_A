"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { ButtonEdit } from "../../buttons/ButtonEdit";
import { DownloadButton } from "../../buttons/DownloadButton";
import Image from "next/image";


const TbodyS = ({ rows = [], columns }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const filter = searchParams.get("filter") || "";
  const text = searchParams.get("searchText") || "";
  const [updateEditSession, setUpdateEditSession] = useState({});

  // Date castings
  const castDateToCrDate = (date) => {
    const dateCast = new Date(date);
    const crDate = dateCast.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      timeZone: "UTC",
    });
    return crDate;
  };
  const castDateToInputDate = (date) => {
    const dateCast = new Date(date);
    const inputDate = dateCast.toLocaleDateString("en-CA", { timeZone: "UTC" });
    return inputDate;
  };
  return (
    <tbody>
      {rows
        .map((row, index) => {
          const { id, date, type, UrlVideo, report } = row;

          const handleDoubleClick = () => router.push(`/home/sessions/${id}`);
          const crDate = castDateToCrDate(date);
          const inputDate = castDateToInputDate(date);

          return (
            <tr
              key={index}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              onDoubleClick={handleDoubleClick}
            >
              <td scope="row" className="px-2 py-4 text-center">
                {crDate}
              </td>
              <td className=" py-2 px-4 text-center">{type}</td>
              <td className=" py-2 px-4 text-center">{UrlVideo}</td>
              <td className=" py-2 px-4 text-center">
                <DownloadButton
                  filename={report}
                  type="Actas"
                  title="Abrir Archivo Sesion"
                >
                </DownloadButton>
                <ButtonEdit
                  title="session"
                  data={{ id, inputDate, type, UrlVideo, report }}
                >
                  <img src="/edit.png" alt="AcuerdoEdit" />
                </ButtonEdit>
              </td>
            </tr>
          );
        })}
    </tbody>
  );
};

export default TbodyS;
