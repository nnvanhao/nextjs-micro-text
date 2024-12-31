"use client";

import React, { useState, useRef, ChangeEvent } from "react";
import { useRouter } from "next/navigation"; // For updating the URL
import { Input } from "./ui/input";
import SearchIcon from "@/app/icons/search-icon";

export default function SearchBox() {
  const [searchTerm, setSearchTerm] = useState<string>(""); // Explicitly typed as string
  const router = useRouter();
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null); // To hold the timeout ID

  // Manual debounce function
  const debounce = (func: (query: string) => void, delay: number) => {
    return (...args: [string]) => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current); // Clear previous timeout
      }
      debounceTimeout.current = setTimeout(() => {
        func(...args); // Execute the function after the delay
      }, delay);
    };
  };

  const updateSearchQuery = debounce((query: string) => {
    if (query.trim() === "") {
      // If the search term is empty, remove the query parameter
      router.push(window.location.pathname); // Reset the URL without query params
    } else {
      router.push(`?search=${encodeURIComponent(query)}`);
    }
  }, 500); // 500ms debounce delay

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    updateSearchQuery(value); // Call the debounced function
  };

  return (
    <div className="relative w-full">
      <Input
        value={searchTerm}
        onChange={handleChange} // Trigger the debounced change handler
        className="sx:h-14 sx:text-md sx: placeholder:text-md h-20 w-full rounded-xl border border-gray-300 bg-white pr-12 text-2xl shadow-none placeholder:text-xl placeholder:font-medium focus:border-gray-300 focus:ring-0 xl:text-xl"
        placeholder="Search micro text"
      />
      <div className="absolute right-8 top-1/2 -translate-y-1/2 transform">
        <SearchIcon />
      </div>
    </div>
  );
}
