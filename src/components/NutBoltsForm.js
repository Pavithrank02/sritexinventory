import React, { useState } from "react";

const SheetForm = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const boltType = ["sheet type", "ms", "ss"];
  const boltSize = [
    "size",
    " 1x3/8",
    "3/4x3/8",
    "2x3/8",
    "1x5/16",
    " 3/4x5/16",
    "1 1/2x5/16",
    "3/4x1/2",
    "11/2x1/2",
    "1/2 x 1/4",
    "3/4x 1/4",
    "1x1/4",
    "12",
    "16",
  ];
  const nuttType = ["sheet type", "ms", "ss"];
  const nutSize = ["size", " 3/8", "5/16", "1/2", "1/4", "12", "16"];
  const washerSize = ["size", " 3/8", "5/16", "1/2", "1/4", "12", "16"];

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div>
      <p>Nuts and Bolts List</p>
      <form className="flex flex-col w-1/2 ">
        <input type="text" name="metal type" required className="border-2" />
        <select
          className="border-2"
          value={selectedOption}
          onChange={handleChange}
        >
          {boltType.map((type, index) => {
            return (
              <option key={index} value={type}>
                {type}
              </option>
            );
          })}
        </select>
        <select
          className="border-2"
          value={selectedOption}
          onChange={handleChange}
        >
          {boltSize.map((type, index) => {
            return (
              <option key={index} value={type}>
                {type}
              </option>
            );
          })}
        </select>
        <label>No of items</label>
        <input type="text" name="number" required className="border-2" />
        <label>Weight</label>
        <input type="text" name="number" required className="border-2" />
        <select
          className="border-2"
          value={selectedOption}
          onChange={handleChange}
        >
          {nutSize.map((type, index) => {
            return (
              <option key={index} value={type}>
                {type}
              </option>
            );
          })}
        </select>
        <label>No of items</label>
        <input type="text" name="number" required className="border-2" />
        <label>Weight</label>
        <input type="text" name="number" required className="border-2" />
        <select
          className="border-2"
          value={selectedOption}
          onChange={handleChange}
        >
          {nuttType.map((type, index) => {
            return (
              <option key={index} value={type}>
                {type}
              </option>
            );
          })}
        </select>
        <label>No of items</label>
        <input type="text" name="number" required className="border-2" />
        <label>Weight</label>
        <input type="text" name="number" required className="border-2" />
        <select
          className="border-2"
          value={selectedOption}
          onChange={handleChange}
        >
          {washerSize.map((type, index) => {
            return (
              <option key={index} value={type}>
                {type}
              </option>
            );
          })}
        </select>
        <label>No of items</label>
        <input type="text" name="number" required className="border-2" />

        <label>Weight</label>
        <input type="text" name="number" required className="border-2" />
        <label>Date Purchased</label>
        <input type="date" placeholder="enter date" className="border-2" />

        <label>Date Delivered</label>
        <input type="date" placeholder="enter date" className="border-2" />
       
      </form>
    </div>
  );
};

export default SheetForm;
