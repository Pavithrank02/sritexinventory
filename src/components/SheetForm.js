import React, { useState } from "react";
import { SidebarDemo } from "./SideComponent";

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
    <div className="flex flex-row">
      <SidebarDemo />
      <div className="p-4">
        <h1 className="text-xl font-bold mb-4">Metal Sheet Form</h1>

        <form className="grid grid-cols-2 gap-4">
         
          <div>
            <label>Sheet Type</label>
            <select
              className="border p-2 w-full"
              value={selectedOption}
              onChange={handleChange}
            >
              {sheetType.map((type, index) => (
                <option key={index} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label>No of Sheets</label>
            <input
              type="text"
              name="number"
              required
              className="border p-2 w-full"
            />
          </div>

          <div>
            <label>Weight</label>
            <input
              type="text"
              name="number"
              required
              className="border p-2 w-full"
            />
          </div>

          <div>
            <label>Date Purchased</label>
            <input
              type="date"
              placeholder="enter date"
              className="border p-2 w-full"
            />
          </div>

          <div>
            <label>Sheet Size</label>
            <select
              className="border p-2 w-full"
              value={selectedOption}
              onChange={handleChange}
            >
              {sheetSize.map((type, index) => (
                <option key={index} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label>Date Delivered</label>
            <input
              type="date"
              placeholder="enter date"
              className="border p-2 w-full"
            />
          </div>

          <div>
            <label>Drawing Sent Date</label>
            <input
              type="date"
              placeholder="enter date"
              className="border p-2 w-full"
            />
          </div>

          <div>
            <label>Sheet Returned Date</label>
            <input
              type="date"
              placeholder="enter date"
              className="border p-2 w-full"
            />
          </div>

          <div>
            <label>Balance Sheet</label>
            <input
              type="date"
              placeholder="enter date"
              className="border p-2 w-full"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default SheetForm;
