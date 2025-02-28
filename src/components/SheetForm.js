import React, { useState } from "react";

const SheetForm = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const sheetType = ["sheet type", "ms", "ss"];
  const sheetSize = [
    "mm",
    " 1",
    "1.2",
    "1.6",
    "2",
    " 2.5",
    "3",
    "4",
    "5",
    "6",
    "8",
    "10",
    "12",
    "16",
  ];

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div>
      <p>Metal Sheet List</p>
      <form className="flex flex-col w-1/2 ">
        <input type="text" name="metal type" required className="border-2" />
        <select
          className="border-2"
          value={selectedOption}
          onChange={handleChange}
        >
          {sheetType.map((type, index) => {
            return (
              <option key={index} value={type}>
                {type}
              </option>
            );
          })}
        </select>
        <label>No of Sheets</label>
        <input type="text" name="number" required className="border-2" />
        <label>Weight</label>
        <input type="text" name="number" required className="border-2" />
        <label>Date Purchased</label>
        <input type="date" placeholder="enter date" className="border-2" />
        <select
          className="border-2"
          value={selectedOption}
          onChange={handleChange}
        >
          {sheetSize.map((type, index) => {
            return (
              <option key={index} value={type}>
                {type}
              </option>
            );
          })}
        </select>
        <label>Date Delivered</label>
        <input type="date" placeholder="enter date" className="border-2" />
        <label>Drawing sent Date</label>
        <input type="date" placeholder="enter date" className="border-2" />
        <label>Sheet Returned Date</label>
        <input type="date" placeholder="enter date" className="border-2" />
        <label>Balance Sheet</label>
        <input type="date" placeholder="enter date" className="border-2" />
      </form>
    </div>
  );
};

export default SheetForm;
