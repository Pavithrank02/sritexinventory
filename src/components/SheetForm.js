import React, { useState } from "react";
import { SidebarDemo } from "./SideComponent";
import axios from "axios";

const SheetForm = () => {
  const [formData, setFormData] = useState({
    items: [{ sheetType: "", noOfSheets: "", weight: "", sheetSize: "" }],
    datePurchased: "",
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

  const addItem = () => {
    setFormData({
      ...formData,
      items: [
        ...formData.items,
        { sheetType: "", sheetSize: "", noOfSheets: "", weight: "" },
      ],
    });
  };

  const handleChange = (event, index = null) => {
    const { name, value } = event.target;
    if (index !== null) {
      const items = [...formData.items];
      items[index][name] = value;
      setFormData({ ...formData, items });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate the form
    const hasEmptyFields = formData.items.some(
      (item) =>
        !item.sheetType || !item.noOfSheets || !item.weight || !item.sheetSize
    );
    if (hasEmptyFields) {
      alert("Please fill out all fields in the form.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/sheet-forms/sheetforms",
        formData
      );
      alert(response.data.message);
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Error submitting form.");
    }
    setFormData({
      items: [{ sheetType: "", noOfSheets: "", weight: "", sheetSize: "" }],
      datePurchased: "",
      dateDelivered: "",
      drawingSentDate: "",
      sheetReturnedDate: "",
      balanceSheet: "",
    });
  };

  return (
    <div className="flex flex-row bg-gray-50 min-h-screen">
      <SidebarDemo />
      <div className="p-8 w-full">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Metal Sheet Form
        </h1>
        <form
          className="space-y-8 bg-customBgColor-bg p-8 rounded-lg shadow-md"
          onSubmit={handleSubmit}
        >
          <div className="space-y-6">
            {formData.items.map((item, index) => (
              <div
                key={index}
                className="grid grid-cols-1 md:grid-cols-4 gap-6 border-b pb-4 mb-4"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Sheet Type
                  </label>
                  <select
                    className="border border-customBgColor rounded-lg p-2 w-full"
                    value={item.sheetType}
                    onChange={(e) => handleChange(e, index)}
                    name="sheetType"
                  >
                    {sheetType.map((type, i) => (
                      <option key={i} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Sheet Size
                  </label>
                  <select
                    className="border border-customBorderColor rounded-lg p-2 w-full"
                    value={item.sheetSize}
                    onChange={(e) => handleChange(e, index)}
                    name="sheetSize"
                  >
                    {sheetSize.map((size, i) => (
                      <option key={i} value={size}>
                        {size}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    No of Sheets
                  </label>
                  <input
                    type="text"
                    name="noOfSheets"
                    className="border border-customBorderColor rounded-lg p-2 w-full"
                    value={item.noOfSheets}
                    onChange={(e) => handleChange(e, index)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Weight
                  </label>
                  <input
                    type="text"
                    name="weight"
                    className="border border-customBorderColor rounded-lg p-2 w-full"
                    value={item.weight}
                    onChange={(e) => handleChange(e, index)}
                  />
                </div>
              </div>
            ))}
            <button
              onClick={addItem}
              type="button"
              className="bg-customBgColor hover:bg-customTextColor-light text-white px-6 py-2 rounded-lg"
            >
              Add Item
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date Purchased
              </label>
              <input
                type="date"
                placeholder="Enter date"
                name="datePurchased"
                className="border border-customBorderColor rounded-lg p-2 w-full"
                value={formData.datePurchased}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date Delivered
              </label>
              <input
                type="date"
                placeholder="Enter date"
                name="dateDelivered"
                className="border border-customBorderColor rounded-lg p-2 w-full"
                value={formData.dateDelivered}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Drawing Sent Date
              </label>
              <input
                type="date"
                placeholder="Enter date"
                name="drawingSentDate"
                className="border border-customBorderColor rounded-lg p-2 w-full focus:ring-2 focus:ring-customTextColor-light focus:outline-none"
                value={formData.drawingSentDate}
                onChange={handleChange}
              />
            </div>
            {/* Sheet Returned Date */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Sheet Returned Date
              </label>
              <input
                type="date"
                placeholder="Enter date"
                name="sheetReturnedDate"
                className="border border-customBorderColor rounded-lg p-2 w-full focus:ring-2 focus:ring-customTextColor-light focus:outline-none"
                value={formData.sheetReturnedDate}
                onChange={handleChange}
              />
            </div>

            {/* Balance Sheet */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Balance Sheet
              </label>
              <input
                type="text"
                placeholder="balanceSheet"
                name="balanceSheet"
                className="border border-customBorderColor rounded-lg p-2 w-full focus:ring-2 focus:ring-customTextColor-light focus:outline-none"
                value={formData.balanceSheet}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="w-1/3 py-3 bg-customBgColor text-white rounded-lg hover:bg-customTextColor-light transition"
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
