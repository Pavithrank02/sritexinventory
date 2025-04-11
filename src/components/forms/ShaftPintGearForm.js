import React, { useState } from "react";
import { SidebarDemo } from "../SideComponent";

const ShaftPintGearForm = () => {
  const BearingType = ["Select Bearing Type", "UCF207", "UCM206"];
  const [formData, setFormData] = useState({
    shaftQuantity: "",
    shaftAmount: "",
    pintQuantity: "",
    pintAmount: "",
    gearQuantity: "",
    gearAmount: "",
    motorQuantity: "",
    motorAmount: "",
    bearingType: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="flex flex-row h-screen bg-customTextColor-white">
      <SidebarDemo />
      <div className="flex-1 p-6 justify-center items-center mt-10">
        <h1 className="text-2xl font-semibold mb-6 text-gray-800 text-center">
          Shaft, Pint, Gear & Motor Entry
        </h1>
        <div className="flex justify-center">
          <form className="space-y-6 bg-customBgColor-bg p-6 rounded-2xl shadow-md border w-9/12">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Shafts */}
              <div>
                <label className="block text-customTextColor font-medium mb-2">Shaft Quantity</label>
                <input
                  type="number"
                  name="shaftQuantity"
                  value={formData.shaftQuantity}
                  onChange={handleChange}
                  placeholder="Enter shaft quantity"
                  className="w-full border border-customBorderColor rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-customBgColor"
                />
              </div>
              <div>
                <label className="block text-customTextColor font-medium mb-2">Shaft Amount</label>
                <input
                  type="number"
                  name="shaftAmount"
                  value={formData.shaftAmount}
                  onChange={handleChange}
                  placeholder="Enter shaft amount"
                  className="w-full border border-customBorderColor rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-customBgColor"
                />
              </div>

              {/* Pints */}
              <div>
                <label className="block text-customTextColor font-medium mb-2">Pint Quantity</label>
                <input
                  type="number"
                  name="pintQuantity"
                  value={formData.pintQuantity}
                  onChange={handleChange}
                  placeholder="Enter pint quantity"
                  className="w-full border border-customBorderColor rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-customBgColor"
                />
              </div>
              <div>
                <label className="block text-customTextColor font-medium mb-2">Pint Amount</label>
                <input
                  type="number"
                  name="pintAmount"
                  value={formData.pintAmount}
                  onChange={handleChange}
                  placeholder="Enter pint amount"
                  className="w-full border border-customBorderColor rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-customBgColor"
                />
              </div>

              {/* Gears */}
              <div>
                <label className="block text-customTextColor font-medium mb-2">Gear Quantity</label>
                <input
                  type="number"
                  name="gearQuantity"
                  value={formData.gearQuantity}
                  onChange={handleChange}
                  placeholder="Enter gear quantity"
                  className="w-full border border-customBorderColor rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-customBgColor"
                />
              </div>
              <div>
                <label className="block text-customTextColor font-medium mb-2">Gear Amount</label>
                <input
                  type="number"
                  name="gearAmount"
                  value={formData.gearAmount}
                  onChange={handleChange}
                  placeholder="Enter gear amount"
                  className="w-full border border-customBorderColor rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-customBgColor"
                />
              </div>

              {/* Motors */}
              <div>
                <label className="block text-customTextColor font-medium mb-2">Motor Quantity</label>
                <input
                  type="number"
                  name="motorQuantity"
                  value={formData.motorQuantity}
                  onChange={handleChange}
                  placeholder="Enter motor quantity"
                  className="w-full border border-customBorderColor rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-customBgColor"
                />
              </div>
              <div>
                <label className="block text-customTextColor font-medium mb-2">Motor Amount</label>
                <input
                  type="number"
                  name="motorAmount"
                  value={formData.motorAmount}
                  onChange={handleChange}
                  placeholder="Enter motor amount"
                  className="w-full border border-customBorderColor rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-customBgColor"
                />
              </div>
            </div>
            <div>
              <label className="block text-customTextColor font-medium mb-2">Bearing Type</label>
              <select
                name="bearingType"
                value={formData.bearingType}
                onChange={handleChange}
                className="w-full border border-customBorderColor rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-customBgColor"
              >
                {BearingType.map((type, index) => (
                  <option key={index} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            {/* Submit or Export Action (Optional) */}
            <div className="text-center">
              <button
                type="button"
                className="bg-customBgColor hover:bg-customTextColor-light text-customBgColor-bg font-semibold px-6 py-2 rounded-lg mt-4"
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

export default ShaftPintGearForm;
