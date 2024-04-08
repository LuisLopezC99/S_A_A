"use client"
import React, { useState } from 'react';

const PaginationComboBox = ({ totalItems, itemsPerPage, onPageChange }) => {
  const [selectedItemsPerPage, setSelectedItemsPerPage] = useState(itemsPerPage || 10);

  const handleItemsPerPageChange = (event) => {
    const newItemsPerPage = parseInt(event.target.value);
    setSelectedItemsPerPage(newItemsPerPage);
    onPageChange(1, newItemsPerPage);
  };

  const totalPages = Math.ceil(totalItems / selectedItemsPerPage);

  return (
    <div className="dark:text-gray-400">
       
      <span >Items: </span>
      <select className="dark:bg-gray-800 dark:text-white" value={selectedItemsPerPage} onChange={handleItemsPerPageChange}>
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="50">50</option>
      </select>
      
    </div>
  );
};

export default PaginationComboBox;