"use client"
import React, { ChangeEvent } from 'react';
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import {useDebouncedCallback} from "use-debounce"
import { useState } from "react";

export default function SearchText({currentText}) {
    const router = useRouter();
    const [text, setText] = useState(currentText || "");
    const searchParams = useSearchParams()
    const filter = searchParams.get("filter") || ""
    const page = 1;
    const itemsPerPage = Number(searchParams.get("items")) || "";
    const handleOnChange = useDebouncedCallback((event) => {
      setText(event.target.value);
      router.push(
        `?${new URLSearchParams({
          filter: filter,
          searchText: event.target.value,
          page: page,
          items: itemsPerPage,
        })}`
      );
    }, 1000);
    return (
      <div className="relative">
        <div className="absolute h-10 inset-y-0 left-0 flex items-center pl-3 pointer-events-none ">
          <svg
            className="h-5 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            ></path>
          </svg>
        </div>
        <input
          defaultValue={text}
          type="text"
          onChange={handleOnChange}
          id="table-search"
          className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Buscar"
        />
      </div>
    );
}