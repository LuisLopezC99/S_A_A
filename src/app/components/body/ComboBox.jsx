"use client"

import { ChangeEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

const ComboBox = ({ options, filterName }) => {
  const router = useRouter();
  const [selected, setSelected] = useState('')

  const searchParams = useSearchParams()
  const text = searchParams.get("searchText") || ""

  const handleOnChange = (event) => {
    const value = event.target.value
    setSelected(value)
    router.push(`?${new URLSearchParams({filter:value, searchText : text})}`)
  }

  return (
    <div className="relative">
      <select
        value={selected}
        onChange={handleOnChange}
        className="appearance-none bg-white border border-gray-300 focus:outline-none focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:focus:ring-gray-700"
      >
         <option key={filterName} value={""}>
            {`${filterName}`}
          </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>

        ))}
      </select>
    </div>
  )
}

export default ComboBox;