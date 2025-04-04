import React, { useState } from "react";
import { SidebarDemo } from "../SideComponent";
//
const SprocketForm = () => {
  const [formData, setFormData] = useState({
    material: "",
    name: "",
    datePurchased: " ",
    quantity: "",
    amount: "",
  });
  const handleSubmit = () =>{
    alert("Form Submitted")
      
  }
  const materialType = ["Select Type", "MS", "SS"];
  const handleSelect = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    //s
  };
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      <SidebarDemo />

      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-2xl bg-customBgColor-bg rounded-2xl shadow-lg p-8 space-y-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            Add Material Details
          </h2>

          <form 
          onSubmit={handleSubmit}
          className="space-y-6 w-full">
            {/* Material Select */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Material
              </label>
              <select
                className="border border-customTextColor-light rounded-lg p-2 w-full focus:ring-2 focus:ring-customBorderColor focus:outline-none"
                onChange={handleSelect}
                name="material"
                value={formData.material}
              >
                <option value="">Select Material</option>
                {materialType.map((type, index) => (
                  <option key={index} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            {/* Date Purchased */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date Purchased
              </label>
              <input
                type="date"
                name="datePurchased"
                className="border border-customTextColor-light rounded-lg p-2 w-full focus:ring-2 focus:ring-customBorderColor focus:outline-none"
                value={formData.datePurchased}
                onChange={handleSelect}
              />
            </div>

            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="Enter name"
                className="border border-customTextColor-light rounded-lg p-2 w-full focus:ring-2 focus:ring-customBorderColor focus:outline-none"
                value={formData.name}
                onChange={handleSelect}
              />
            </div>

            {/* Quantity & Amount */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Quantity
                </label>
                <input
                  type="number"
                  name="quantity"
                  placeholder="Quantity"
                  className="border border-customTextColor-light rounded-lg p-2 w-full focus:ring-2 focus:ring-customBorderColor focus:outline-none"
                  value={formData.quantity}
                  onChange={handleSelect}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Amount
                </label>
                <input
                  type="number"
                  name="amount"
                  placeholder="Amount"
                  className="border border-customTextColor-light rounded-lg p-2 w-full focus:ring-2 focus:ring-customBorderColor focus:outline-none"
                  value={formData.amount}
                  onChange={handleSelect}
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full bg-customBgColor font-semibold text-lg text-customBgColor-bg py-2 px-4 rounded-lg hover:bg-customTextColor-light transition-all duration-200"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SprocketForm;
