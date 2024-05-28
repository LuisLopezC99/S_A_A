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
 * Archive: PaginationComboBox.jsx
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
  const typeSesion = searchParams.get("type") || "";
  const consecutiveSesion = searchParams.get("consecutive") || "";
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
        consecutive:consecutiveSesion,
        type:typeSesion,
      })}`
    );
  };
  return (
    <div className="text-gray-500 mx-4 dark:text-gray-400 flex flex-col sm:flex-row items-center justify-center sm:justify-start">
      <span className="mr-2">Ítems por página:</span>
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
