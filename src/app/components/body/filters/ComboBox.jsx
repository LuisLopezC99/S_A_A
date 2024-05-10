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
 * File_2: filters
 * Archive: ComboBox.jsx
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

"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

const ComboBox = ({ options, filterName,currentSelect }) => {
  const router = useRouter();
  const [selected, setSelected] = useState(currentSelect || '')

  const searchParams = useSearchParams()
  const text = searchParams.get("searchText") || ""
  const page = 1;
  const itemsPerPage = Number(searchParams.get("items")) || "";
  const currentSelect2 = Number(searchParams.get("filter")) || "";


  const handleOnChange = (event) => {
    const value = event.target.value
    setSelected(value)
    router.push(`?${new URLSearchParams({filter:value, searchText : text,page: page,items: itemsPerPage})}`)
  }

  return (
    <div className="relative">
      <select
        value={selected}
        onChange={handleOnChange}
        className="appearance-none bg-white border border-gray-400 focus:outline-none focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-6 py-1.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:focus:ring-gray-700"
      >
        <option key={filterName} value={currentSelect2}>
          {`${filterName}`}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default ComboBox;