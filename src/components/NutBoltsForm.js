import React, { useState } from "react";
import { SidebarDemo } from "./SideComponent";

const NutBoltsForm = () => {
  const [formData, setFormData] = useState({
    metalType: "",
    boltType: "",
    boltSize: "",
    boltQuantity: "",
    boltWeight: "",
    nutType: "",
    nutSize: "",
    nutQuantity: "",
    nutWeight: "",
    washerSize: "",
    washerQuantity: "",
    washerWeight: "",
    datePurchased: "",
    faultyNuts: "",
    faultyBolts: "",
  });

  const options = {
    boltType: ["Sheet Type", "MS", "SS"],
    boltSize: [
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
      "12",
      "16",
    ],
    nutType: ["Sheet Type", "MS", "SS"],
    nutSize: ["3/8", "5/16", "1/2", "1/4", "12", "16"],
    washerSize: ["3/8", "5/16", "1/2", "1/4", "12", "16"],
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const renderInput = (label, name, type = "text", placeholder = "") => (
    <div>
      <label>{label}</label>
      <input
        type={type}
        name={name}
        value={formData[name]}
        onChange={handleChange}
        placeholder={placeholder}
        className="border p-2 w-full"
        required
      />
    </div>
  );

  const renderSelect = (label, name, optionsArray) => (
    <div>
      <label>{label}</label>
      <select
        name={name}
        value={formData[name]}
        onChange={handleChange}
        className="border p-2 w-full"
        required
      >
        <option value="">Select {label}</option>
        {optionsArray.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );

  return (
    <div className="flex flex-row">
      <SidebarDemo />
      <div className="p-4">
        <h1 className="text-xl font-bold mb-4">Nuts and Bolts Form</h1>
        <form className="grid grid-cols-2 gap-4">
          {renderSelect("Bolt Type", "boltType", options.boltType)}
          {renderSelect("Bolt Size", "boltSize", options.boltSize)}
          {renderInput("Bolt Quantity", "boltQuantity")}
          {renderInput("Bolt Weight", "boltWeight")}
          {renderSelect("Nut Type", "nutType", options.nutType)}
          {renderSelect("Nut Size", "nutSize", options.nutSize)}
          {renderInput("Nut Quantity", "nutQuantity")}
          {renderInput("Nut Weight", "nutWeight")}
          {renderSelect("Washer Size", "washerSize", options.washerSize)}
          {renderInput("Washer Quantity", "washerQuantity")}
          {renderInput("Washer Weight", "washerWeight")}
          {renderInput("Date Purchased", "datePurchased", "date")}
          {renderInput("No of Faulty Nuts", "faultyNuts")}
          {renderInput("No of Faulty Bolts", "faultyBolts")}
        </form>
      </div>
    </div>
  );
};

export default NutBoltsForm;
