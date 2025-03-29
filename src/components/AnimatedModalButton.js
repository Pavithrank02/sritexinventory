"use client";
import React, { useState } from "react";

const boltSize = [
  "Select Size",
  "1x3/8",
  "3/4x3/8",
  "2x3/8",
  "1x5/16",
  "3/4x5/16",
  "1 1/2x5/16",
  "3/4x1/2",
  "11/2x1/2",
  "1/2x1/4",
  "3/4x1/4",
  "1x1/4",
];
const nutSize = ["Select Size", "3/8", "5/16", "1/2", "1/4"];
const washerSize = ["Select Size", "3/8", "5/16", "1/2", "1/4"];

export function AnimatedModalButton() {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    component_name: "",
    boltsize: "",
    boltquantity: "",
    nutSize: "",
    nutQuantity: "",
    washerSize: "",
    washerQuantity: "",
    boltDetails: boltSize.map((size) => ({ size, quantity: 0 })),
    nutDetails: nutSize.map((size) => ({ size, quantity: 0 })),
    washerDetails: washerSize.map((size) => ({ size, quantity: 0 })),
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleClick = () => {
    alert("Form submitted");
    setOpen(false); // Close the modal after submission
  };

  return (
    <div className="relative">
      {/* Button to open modal */}
      <div>
        <button
          onClick={() => setOpen(true)}
          className="relative group bg-customBgColor  text-customTextColor-white font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-customTextColor-light transition-all duration-300"
        >
          <span className="relative z-10">Edit Components</span>
        </button>
      </div>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 flex items-center justify-center bg-customBgColor-dark bg-opacity-50 z-50 ">
          <div className="bg-customBgColor-bg rounded-2xl shadow-xl w-11/12 max-w-lg p-6 relative">
            {/* Close Button */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 text-customTextColor-dark hover:text-customTextColor-light transition"
            >
              ✕
            </button>

            {/* Modal Header */}
            <h4 className="text-2xl font-bold text-customTextColor-dark text-center mb-4">
              Supplies Used
            </h4>
            <p className="text-sm text-customTextColor-dark text-center mb-6">
              Please fill in the details of the supplies used.
            </p>

            {/* Scrollable Form */}
            <form className="space-y-6 h-72 overflow-y-auto pr-2 scrollbar-hide">
              {/* Styling for scrollbar */}
              <style>
                {`
            form::-webkit-scrollbar {
              width: 6px;
            }
            form::-webkit-scrollbar-thumb {
              background-color: #068343; /* Use your custom color */
              border-radius: 4px;
            }
            form::-webkit-scrollbar-track {
              background-color: #FBFCF1; /* Background color */
            }
          `}
              </style>

              {/* Bolts */}
              <div className="flex flex-col space-y-2">
                <label className="text-sm font-medium text-customTextColor-dark">
                  Bolt Size
                </label>
                <select
                  className="border border-customBorderColor rounded-lg p-3 focus:ring-2 focus:ring-customTextColor-light focus:outline-none"
                  value={formData.boltSize}
                  onChange={handleInputChange}
                  name="boltSize"
                >
                  {boltSize.map((size, i) => (
                    <option key={i} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
                <label className="text-sm font-medium text-customTextColor-dark">
                  Number of Bolts
                </label>
                <input
                  type="number"
                  name="boltquantity"
                  className="w-full p-3 border border-customBorderColor rounded-lg focus:ring-2 focus:ring-customTextColor-light focus:outline-none"
                  placeholder="Enter number of bolts"
                />
              </div>

              {/* Nuts */}
              <div className="flex flex-col space-y-2">
                <label className="text-sm font-medium text-customTextColor-dark">
                  Nut Size
                </label>
                <select
                  className="border border-customBorderColor rounded-lg p-3 focus:ring-2 focus:ring-customTextColor-light focus:outline-none"
                  value={formData.nutSize}
                  onChange={handleInputChange}
                  name="nutSize"
                >
                  {nutSize.map((size, i) => (
                    <option key={i} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
                <label className="text-sm font-medium text-customTextColor-dark">
                  Number of Nuts
                </label>
                <input
                  type="number"
                  name="nutQuantity"
                  className="w-full p-3 border border-customBorderColor rounded-lg focus:ring-2 focus:ring-customTextColor-light focus:outline-none"
                  placeholder="Enter number of nuts"
                />
              </div>

              {/* Washers */}
              <div className="flex flex-col space-y-2">
                <label className="text-sm font-medium text-customTextColor-dark">
                  Washer Size
                </label>
                <select
                  className="border border-customBorderColor rounded-lg p-3 focus:ring-2 focus:ring-customTextColor-light focus:outline-none"
                  value={formData.washerSize}
                  onChange={handleInputChange}
                  name="washerSize"
                >
                  {washerSize.map((size, i) => (
                    <option key={i} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
                <label className="text-sm font-medium text-customTextColor-dark">
                  Number of Washers
                </label>
                <input
                  type="number"
                  name="washerQuantity"
                  className="w-full p-3 border border-customBorderColor rounded-lg focus:ring-2 focus:ring-customTextColor-light focus:outline-none"
                  placeholder="Enter number of washers"
                />
              </div>
            </form>

            {/* Buttons */}
            <div className="flex justify-end space-x-4 mt-6">
              <button
                onClick={() => setOpen(false)}
                className="px-4 py-2 text-customTextColor-dark bg-customTextColor-white rounded-lg hover:bg-customBorderColor-light transition"
              >
                Cancel
              </button>
              <button
                onClick={handleClick}
                className="px-4 py-2 text-customTextColor-white bg-customTextColor-light rounded-lg hover:bg-customTextColor-dark transition"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
