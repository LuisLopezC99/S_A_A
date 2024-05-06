"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
const PaginationComboBox = ({ itemsPerPage }) => {
  const [selectedItemsPerPage, setSelectedItemsPerPage] = useState(
    itemsPerPage || 5
  );
  const searchParams = useSearchParams();
  const text = "";
  const filter = searchParams.get("filter") || "";
  const page = 1;
  const router = useRouter();
  const handleItemsPerPageChange = (event) => {
    const newItemsPerPage = event.target.value;
    
    setSelectedItemsPerPage(newItemsPerPage);
    router.push(
      `?${new URLSearchParams({
        filter: filter,
        searchText: text,
        page: page,
        items: newItemsPerPage,
      })}`
    );
  };
  return (
    <div className="text-gray-500 mx-4 dark:text-gray-400 flex flex-col sm:flex-row items-center justify-center sm:justify-start">
      <span className="mr-2">Items per page:</span>
      <select
        className="text-green-700 dark:bg-gray-800 dark:text-white border rounded my-2 sm:my-0 sm:ml-2"
        value={selectedItemsPerPage}
        onChange={handleItemsPerPageChange}
      >
        <option value="5">5</option>
        <option className="hover:bg-green-300" value="10">
          10
        </option>
        <option value="20">20</option>
        <option value="50">50</option>
      </select>
    </div>
  );
};

export default PaginationComboBox;
