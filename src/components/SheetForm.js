import React, { useState } from "react";
import { SidebarDemo } from "./SideComponent";
import axios from "axios";
const SheetForm = () => {
  
  const [formData, setFormData] = useState({
    sheetType: "",
    noOfSheets: "",
    weight: "",
    datePurchased: "",
    sheetSize: "",
    dateDelivered: "",
    drawingSentDate: "",
    sheetReturnedDate: "",
    balanceSheet: "",
  });
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
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/sheet-forms/sheetforms", formData);
      alert(response.data.message);
      // Clear form or handle success
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Error submitting form.");
    }
  };
  return (
    <div className="flex flex-row bg-white min-h-screen">
      <SidebarDemo />
      <div className="p-8 w-full">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Metal Sheet Form</h1>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-customBgColor-bg p-6 rounded-lg shadow-lg"
        onSubmit={handleSubmit}>
          {/* Sheet Type */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Sheet Type</label>
            <select
              className="border border-gray-300 rounded-lg p-2 w-full focus:ring-2 focus:ring-customTextColor-light focus:outline-none"
              value={formData.sheetType}
              onChange={handleChange}
              name="sheetType"
              
            >
              {sheetType.map((type, index) => (
                <option key={index} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Sheet Size</label>
            <select
              className="border border-gray-300 rounded-lg p-2 w-full focus:ring-2 focus:ring-customTextColor-light focus:outline-none"
              value={formData.sheetSize}
              onChange={handleChange}
              name="sheetSize"
            >
              {sheetSize.map((size, index) => (
                <option key={index} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>
          {/* No of Sheets */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">No of Sheets</label>
            <input
              type="text"
              name="noOfSheets"
              required
              className="border border-gray-300 rounded-lg p-2 w-full focus:ring-2 focus:ring-customTextColor-light focus:outline-none"
              value={formData.noOfSheets}
              onChange={handleChange}
            />
          </div>

          {/* Weight */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Weight</label>
            <input
              type="text"
              name="weight"
              required
              className="border border-gray-300 rounded-lg p-2 w-full focus:ring-2 focus:ring-customTextColor-light focus:outline-none"
              value={formData.weight}
              onChange={handleChange}
            />
          </div>

          {/* Date Purchased */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Date Purchased</label>
            <input
              type="date"
              placeholder="Enter date"
              name="datePurchased"
              className="border border-gray-300 rounded-lg p-2 w-full focus:ring-2 focus:ring-customTextColor-light focus:outline-none"
              value={formData.datePurchased}
              onChange={handleChange}
            />
          </div>

          {/* Sheet Size */}
         

          {/* Date Delivered */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Date Delivered</label>
            <input
              type="date"
              placeholder="Enter date"
              name='dateDelivered'
              className="border border-gray-300 rounded-lg p-2 w-full focus:ring-2 focus:ring-customTextColor-light focus:outline-none"
              value={formData.dateDelivered}
              onChange={handleChange}
            />
          </div>

          {/* Drawing Sent Date */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Drawing Sent Date</label>
            <input
              type="date"
              placeholder="Enter date"
              name="drawingSentDate"
              className="border border-gray-300 rounded-lg p-2 w-full focus:ring-2 focus:ring-customTextColor-light focus:outline-none"
              value={formData.drawingSentDate}
              onChange={handleChange}
            />
          </div>

          {/* Sheet Returned Date */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Sheet Returned Date</label>
            <input
              type="date"
              placeholder="Enter date"
              name="sheetReturnedDate"
              className="border border-gray-300 rounded-lg p-2 w-full focus:ring-2 focus:ring-customTextColor-light focus:outline-none"
              value={formData.sheetReturnedDate}
              onChange={handleChange}
            />
          </div>

          {/* Balance Sheet */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Balance Sheet</label>
            <input
              type="text"
              placeholder="balanceSheet"
              name="balanceSheet"
              className="border border-gray-300 rounded-lg p-2 w-full focus:ring-2 focus:ring-customTextColor-light focus:outline-none"
              value={formData.balanceSheet}
              onChange={handleChange}
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
