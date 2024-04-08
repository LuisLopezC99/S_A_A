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
  const page = searchParams.get("page") || "";
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
    <div className=" text-gray-500 mx-4 dark:text-gray-400 ">
      <span>Items: </span>
      <select
        className=" text-green-700 dark:bg-gray-800 dark:text-white  border  rounded"
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
