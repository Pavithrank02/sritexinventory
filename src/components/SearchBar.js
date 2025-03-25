import React, { useEffect, useState, useRef } from "react";
import StockCard from "./StockCard.js";

const SearchBar = ({ data }) => {
  const [searchData, setSearchData] = useState(""); // Current input value
  const [matches, setMatches] = useState([]);
  const [throttledSearch, setThrottledSearch] = useState(""); // Throttled value
  const lastCall = useRef(0); // Ref to track the last execution time

  const dataToDisplay = Object.entries(data).map(([key, items]) => ({
    key,
    items,
  }));

  // Throttled search logic
  const throttledSearchHandler = (value) => {
    const now = Date.now();
    if (now - lastCall.current >= 1000) { // Throttle interval: 1000ms
      setThrottledSearch(value.trim().toLowerCase());
      lastCall.current = now;
    }
  };

  // Update throttledSearch whenever user types
  useEffect(() => {
    throttledSearchHandler(searchData);
  }, [searchData]);

  // Perform search based on throttledSearch
  useEffect(() => {
    if (throttledSearch) {
      const filteredMatches = dataToDisplay.filter((res) =>
        res.key.toLowerCase().includes(throttledSearch)
      );

      setMatches(filteredMatches.length > 0 ? filteredMatches : []);
    } else {
      setMatches([]); // Clear matches when input is empty
    }
  }, [throttledSearch]);

  const handleSearch = (e) => {
    setSearchData(e.target.value);
  };

  return (
    <div className="mb-6">
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          placeholder="Search by category or size..."
          value={searchData}
          onChange={handleSearch}
          className="w-full p-3 rounded-md shadow-md border bg-customBgColor-bg border-customBorderColor focus:outline-none focus:ring-2 focus:ring-customBgColor"
        />
      </form>
      <div>
        {matches.length > 0 ? (
          matches.map((match, index) => (
            <div key={index}>
              <h3 className="text-lg font-bold">{match.key}</h3>
              <ul>
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
          ))
        ) : (
          <p className="text-gray-500">No matches found</p>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
