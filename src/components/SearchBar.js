import React, { useEffect, useState } from "react";

const SearchBar = () => {
  const [searchData, setSearchData] = useState(""); // Current input value
  const [debouncedSearch, setDebouncedSearch] = useState(""); // Debounced value

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchData);
    }, 2000);

    return () => clearTimeout(timer); 
  }, [searchData]);

  useEffect(() => {
    if (debouncedSearch) {
      console.log("Search triggered for:", debouncedSearch);
    }
  }, [debouncedSearch]);

  const handleSearch = (e) => {
    setSearchData(e.target.value); // Update searchData as user types
  };

  const handleSubmit = (e) =>{
     e.preventDefault()
  }

  return (
    <div className="mb-6">
      <form onSubmit={handleSubmit}> {/* Prevent form submission */}
        <input
          type="text"
          placeholder="Search by category or size..."
          value={searchData}
          onChange={handleSearch}
          className="w-full p-3 rounded-md shadow-md border bg-customBgColor-bg border-customBorderColor focus:outline-none focus:ring-2 focus:ring-customBgColor"
        />
        <button
          type="submit"
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 transition"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
