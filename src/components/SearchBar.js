import React, { useEffect, useState, useRef, useMemo } from "react";
import StockCard from "./StockCard.js";

const SearchBar = ({ data }) => {
  const [searchData, setSearchData] = useState(""); // Current input value
  const [matches, setMatches] = useState([]);
  const [throttledSearch, setThrottledSearch] = useState(""); // Throttled value
  const throttleTimeout = useRef(null); // Ref to manage throttling timeout

  // ✅ Memoize dataToDisplay to avoid unnecessary re-renders
  const dataToDisplay = useMemo(() => {
    return Object.entries(data).map(([key, items]) => ({ key, items }));
  }, [data]);

  // Throttled search logic
  const throttledSearchHandler = (value) => {
    if (throttleTimeout.current) {
      clearTimeout(throttleTimeout.current);
    }

    throttleTimeout.current = setTimeout(() => {
      setThrottledSearch(value.trim().toLowerCase());
    }, 300); // Throttle delay: 300ms
  };

  useEffect(() => {
    if (searchData.trim() === "") {
      setMatches([]); // Clear matches when input is empty
      setThrottledSearch(""); // Reset throttled value
      return;
    }

    throttledSearchHandler(searchData);
  }, [searchData]);

  useEffect(() => {
    if (throttledSearch) {
      const filteredMatches = dataToDisplay.filter((res) =>
        res.key.toLowerCase().includes(throttledSearch)
      );

      setMatches(filteredMatches.length > 0 ? filteredMatches : []);
    } else {
      setMatches([]); // Ensure matches are cleared when throttledSearch is empty
    }
  }, [throttledSearch, dataToDisplay]); // Now stable because of useMemo

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchData(value);
  };

  return (
    <div className="mb-6">
      {/* Search Input */}
      <form onSubmit={(e) => e.preventDefault()} className="mb-4">
        <input
          type="text"
          placeholder="Search by category or size..."
          value={searchData}
          onChange={handleSearch}
          className="w-full p-3 rounded-md shadow-md border bg-customBgColor-bg border-customBorderColor focus:outline-none focus:ring-2 focus:ring-customBgColor text-sm md:text-base"
        />
      </form>

      {/* Matches Display */}
      {searchData.trim() !== "" && matches.length > 0 && (
        <div>
          {matches.map((match, index) => (
            <div key={index} className="mb-6 bg-white p-4 rounded-md shadow-md">
              <h3 className="text-lg md:text-xl font-bold text-neutral-700 mb-4">
                {match.key}
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {match.items.map((item, i) => (
                  <StockCard
                    key={i}
                    size={item.size}
                    stock={item.stock}
                    totalWeight={item.totalWeight}
                    required={item.required}
                  />
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {/* No Matches Display */}
      {searchData.trim() !== "" && matches.length === 0 && (
        <p className="text-gray-500">No matches found</p>
      )}
    </div>
  );
};

export default SearchBar;
