"use client"
import { useState } from 'react'; 
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import PaginationComboBox from "./PaginationComboBox";

export default function Pagination({ totalDocuments }) {
  const itemsPerPage = 10;
  const totalPages = Math.ceil(totalDocuments / itemsPerPage);
  const [currentPage, setCurrentPage] = useState(1); 

  const getPageNumbers = (total) => {
    const pageNumbers = [];
    
    for (let i = 1; i <= total; i++) {
      pageNumbers.push(i);
    }
    
    return pageNumbers;
  };

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="flex items-center justify-between border-t border-gray-400 px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        <a
          href="#"
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Previous
        </a>
        <a
          href="#"
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Next
        </a>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          
          <p className="text-sm text-gray-700 dark:text-gray-400  ">
            <span className="font-medium">{totalDocuments}</span> {' '}
            resultados
          </p>
          
        </div>
        
        <div>
          
          <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
            <a
              href="#"
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 hover:text-blue-500 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </a>

            {getPageNumbers(totalPages).map((pageNumber) => (
              <a
                key={pageNumber}
                href={`#${pageNumber}`}
                className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
                  currentPage === pageNumber
                    ? 'bg-yellow-400 text-gray-900 dark:bg-yellow-500 dark:text-gray-50'
                    : 'text-gray-700 hover:bg-gray-200 hover:text-blue-500 dark:text-gray-00'
                } ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0`}
                onClick={() => handlePageClick(pageNumber)}
              >
                {pageNumber}
              </a>
            ))}
            <a
              href="#"
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-400 hover:bg-gray-50 hover:text-blue-500 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </a>
          </nav>
        </div>
        <PaginationComboBox/>
      </div>
      
    </div>
    
  );
}

