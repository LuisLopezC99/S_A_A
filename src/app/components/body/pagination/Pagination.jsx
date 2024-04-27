"use client";
import { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import PaginationComboBox from "./PaginationComboBox";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

export default function Pagination({ totalDocuments,cupage,items }) {
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
      <div className="flex flex-1 justify-between sm:hidden">
        <a className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
          Previous
        </a>
        <a className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
          Next
        </a>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mx-4 ">
            <span className="font-medium">{totalDocuments}</span> resultados
          </p>
        </div>

        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            <a
              onClick={handlePreviousClick}
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 hover:text-green-500 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </a>

            {getPageNumbers(totalPages).map((pageNumber) => (
              <a
                key={pageNumber}
                className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
                  currentPage === pageNumber
                    ? "bg-yellow-300 text-green-600 dark:bg-yellow-500 dark:text-gray-50"
                    : "text-gray-700 hover:bg-gray-200 hover:text-green-500 dark:text-neutral-100 dark:hover:text-green-500 dark:hover:bg-yellow-100  "
                } ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0`}
                aria-hidden="true"
                onClick={() => handlePageClick(pageNumber)}
              >
                {pageNumber}
              </a>
            ))}
            <a
              onClick={handleNextClick}
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 hover:text-green-500 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5 " aria-hidden="true" />
            </a>
          </nav>
        </div>
        <PaginationComboBox itemsPerPage={items}/>
      </div>
    </div>
  );
}