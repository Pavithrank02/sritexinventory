import React, { useState } from "react";
import { SidebarDemo } from "./SideComponent";

const SheetForm = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const sheetType = ["Sheet Type", "MS", "SS"];
  const sheetSize = [
    "MM",
    "1",
    "1.2",
    "1.6",
    "2",
    "2.5",
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
    <div className="flex flex-row bg-white min-h-screen">
      <SidebarDemo />
      <div className="p-8 w-full">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Metal Sheet Form</h1>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-customBgColor-bg p-6 rounded-lg shadow-lg">
          {/* Sheet Type */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Sheet Type</label>
            <select
              className="border border-gray-300 rounded-lg p-2 w-full focus:ring-2 focus:ring-customTextColor-light focus:outline-none"
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

          {/* No of Sheets */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">No of Sheets</label>
            <input
              type="text"
              name="number"
              required
              className="border border-gray-300 rounded-lg p-2 w-full focus:ring-2 focus:ring-customTextColor-light focus:outline-none"
            />
          </div>

          {/* Weight */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Weight</label>
            <input
              type="text"
              name="number"
              required
              className="border border-gray-300 rounded-lg p-2 w-full focus:ring-2 focus:ring-customTextColor-light focus:outline-none"
            />
          </div>

          {/* Date Purchased */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Date Purchased</label>
            <input
              type="date"
              placeholder="Enter date"
              className="border border-gray-300 rounded-lg p-2 w-full focus:ring-2 focus:ring-customTextColor-light focus:outline-none"
            />
          </div>

          {/* Sheet Size */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Sheet Size</label>
            <select
              className="border border-gray-300 rounded-lg p-2 w-full focus:ring-2 focus:ring-customTextColor-light focus:outline-none"
              value={selectedOption}
              onChange={handleChange}
            >
              {sheetSize.map((size, index) => (
                <option key={index} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>

          {/* Date Delivered */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Date Delivered</label>
            <input
              type="date"
              placeholder="Enter date"
              className="border border-gray-300 rounded-lg p-2 w-full focus:ring-2 focus:ring-customTextColor-light focus:outline-none"
            />
          </div>

          {/* Drawing Sent Date */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Drawing Sent Date</label>
            <input
              type="date"
              placeholder="Enter date"
              className="border border-gray-300 rounded-lg p-2 w-full focus:ring-2 focus:ring-customTextColor-light focus:outline-none"
            />
          </div>

          {/* Sheet Returned Date */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Sheet Returned Date</label>
            <input
              type="date"
              placeholder="Enter date"
              className="border border-gray-300 rounded-lg p-2 w-full focus:ring-2 focus:ring-customTextColor-light focus:outline-none"
            />
          </div>

          {/* Balance Sheet */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Balance Sheet</label>
            <input
              type="date"
              placeholder="Enter date"
              className="border border-gray-300 rounded-lg p-2 w-full focus:ring-2 focus:ring-customTextColor-light focus:outline-none"
            />
          </div>

          {/* Submit Button */}
          <div className="col-span-2 items-center">
            <button
              type="submit"
              className=" w-1/2 py-3 bg-customBgColor text-white rounded-lg hover:bg-customTextColor-light transition focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SheetForm;
