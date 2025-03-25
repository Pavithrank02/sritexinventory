import React, { useEffect, useState } from "react";
import StockCard from "./StockCard ";

const SearchBar = ({ data }) => {
  const [searchData, setSearchData] = useState(""); // Current input value
  const [debouncedSearch, setDebouncedSearch] = useState(""); // Debounced value
  const [matches, setMatches] = useState([]);

  const dataToDisplay = Object.entries(data).map(([key, items]) => {
    return { key, items: items.map((val) => val) };
  });

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

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if the debouncedSearch value matches any keys in dataToDisplay
    const filteredMatches = dataToDisplay.filter(
      (res) => res.key.toLowerCase() === debouncedSearch.toLowerCase()
    );

    if (filteredMatches.length > 0) {
      setMatches(filteredMatches); // Store matches in state
    } else {
      setMatches([]); // Clear matches if no match is found
      console.log("No match found");
    }
  };
  return (
    <div className="mb-6">
      <form onSubmit={handleSubmit}>
        {" "}
        {/* Prevent form submission */}
        <input
          type="text"
          placeholder="Search by category or size..."
          value={searchData}
          onChange={handleSearch}
          className="w-full p-3 rounded-md shadow-md border bg-customBgColor-bg border-customBorderColor focus:outline-none focus:ring-2 focus:ring-customBgColor"
        />
        <button
          type="submit"
          className="mt-2 px-4 py-2 bg-customBgColor text-white rounded-md shadow-md hover:bg-customTextColor-light transition"
        >
          Search
        </button>
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
         ""
        )}
      </div>
    </div>
  );
};

export default SearchBar;
