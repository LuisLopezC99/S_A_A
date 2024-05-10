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
 * Directory: components
 * File_1: body
 * File_2: pagination
 * Archive: Pagination.jsx
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

"use client";
import { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import PaginationComboBox from "./PaginationComboBox";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

export default function Pagination({ totalDocuments, cupage, items }) {
  const [currentPage, setCurrentPage] = useState(cupage || 1);
  const searchParams = useSearchParams();
  const itemsPerPage = items;
  const totalPages = Math.ceil(totalDocuments / itemsPerPage);
  const text = "";
  const filter = searchParams.get("filter") || "";

  const router = useRouter();

  const getPageNumbers = (total) => {
    const pageNumbers = [];

    for (let i = 1; i <= total; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);

    router.push(
      `?${new URLSearchParams({
        filter: filter,
        searchText: text,
        page: pageNumber,
        items: itemsPerPage,
      })}`
    );
  };
  const handlePreviousClick = () => {
    if (currentPage > 1) {
      const previousPage = currentPage - 1;
      handlePageClick(previousPage);
    }
  };
  const handleNextClick = () => {
    if (currentPage < totalPages) {
      const nextPage = currentPage + 1;
      handlePageClick(nextPage);
    }
  };
  return (
    <div className="flex items-center justify-between border-t border-gray-400 px-4 py-3 sm:px-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full">
        <div className="flex flex-col sm:flex-row sm:items-center">
          <div className="mb-2 sm:mb-0 sm:mr-4">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              <span className="font-medium">{totalDocuments}</span> resultados
            </p>
          </div>

          <div className="flex space-x-2">
            <a
              onClick={handlePreviousClick}
              className={`inline-flex items-center px-3 py-1 text-sm font-semibold rounded-md ${currentPage === 1
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-white text-gray-700 hover:bg-gray-100 hover:text-green-500"
                }`}
              disabled={currentPage === 1}
            >
              <ChevronLeftIcon className="h-4 w-4 mr-1" />
              Anterior
            </a>

            {getPageNumbers(totalPages).map((pageNumber) => (
              <a
                key={pageNumber}
                onClick={() => handlePageClick(pageNumber)}
                className={`inline-flex items-center px-3 py-1 text-sm font-semibold rounded-md ${currentPage === pageNumber
                    ? "bg-yellow-300 text-gray-800 dark:bg-yellow-500 dark:text-green-600"
                    : "bg-white text-gray-700 hover:bg-gray-600 hover:text-green-500 dark:text-gray-600 dark:hover:text-green-500 dark:hover:bg-yellow-100"
                  } ${currentPage === pageNumber ? 'active' : ''}`}
              >
                {pageNumber}
              </a>
            ))}

            <a
              onClick={handleNextClick}
              className={`inline-flex items-center px-3 py-1 text-sm font-semibold rounded-md ${currentPage === totalPages
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-white text-gray-700 hover:bg-gray-100 hover:text-green-500"
                }`}
              disabled={currentPage === totalPages}
            >
              Siguiente
              <ChevronRightIcon className="h-4 w-4 ml-1" />
            </a>
          </div>
        </div>

        <PaginationComboBox itemsPerPage={items} />
      </div>
    </div>
  );
}
