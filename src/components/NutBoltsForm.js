import React, { useState } from "react";
import { SidebarDemo } from "./SideComponent";

const NutBoltsForm = () => {
  const [formData, setFormData] = useState({
    metalType: "Other",
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

  const [isUpdateMode, setIsUpdateMode] = useState(false); // Track whether it's update mode

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

  const handleGet = async() => {
    try{

      const response = await fetch(`http://localhost:5000/nuts-and-bolts/`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
    if (response.ok) {
      const result = await response.json();
   
      console.log("Response:", result);
      
  } else {
      const error = await response.json();
      alert(`Error: ${error.message}`);
  }
} catch (error) {
  console.error("Error submitting form:", error);
  alert("Failed to submit form. Please try again later.");
}
    }


  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure all fields are filled
    if (Object.values(formData).some(value => value === "")) {
        alert("Please fill out all fields.");
        return;
    }

    // Ensure numeric fields are valid numbers
    if (
        ["boltQuantity", "boltWeight", "nutQuantity", "nutWeight", "washerQuantity", "washerWeight", "faultyNuts", "faultyBolts"].some(
            (key) => isNaN(Number(formData[key]))
        )
    ) {
        alert("Quantities and weights must be valid numbers.");
        return;
    }

  

    try {
        const response = await fetch(`http://localhost:5000/nuts-and-bolts/add-or-update`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            const result = await response.json();
            alert(formData._id ? "Data updated successfully!" : "Data added successfully!");
            console.log("Response:", result);
            resetForm();
        } else {
            const error = await response.json();
            alert(`Error: ${error.message}`);
        }
    } catch (error) {
        console.error("Error submitting form:", error);
        alert("Failed to submit form. Please try again later.");
    }
};



  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/nuts-and-bolts/update-stock", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        alert("Stock updated successfully!");
        console.log("Updated Item:", result);
        resetForm();
      } else {
        const error = await response.json();
        alert(`Error: ${error.message}`);
      }
    } catch (error) {
      console.error("Error updating stock:", error);
      alert("Failed to update stock. Please try again later.");
    }
  };

  const resetForm = () => {
    setFormData({
      metalType: "Other",
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
    setIsUpdateMode(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const renderInput = (label, name, type = "text", placeholder = "") => (
    <div>
      <label className="block text-sm font-medium text-gray-600 mb-1">
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={formData[name]}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full border border-gray-300 dark:border-neutral-600 dark:bg-neutral-800 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-customTextColor-light"
        required
      />
    </div>
  );

  const renderSelect = (label, name, optionsArray) => (
    <div>
      <label className="block text-sm font-medium text-gray-600 mb-1">
        {label}
      </label>
      <select
        name={name}
        value={formData[name]}
        onChange={handleChange}
        className="w-full border border-gray-300 dark:border-neutral-600 dark:bg-neutral-800 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-customTextColor-light"
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
    <div className="flex flex-row justify-center">
      <SidebarDemo />
      <div className="p-8 w-full">
        <h1 className="text-xl font-bold mb-4">Nuts and Bolts Form</h1>
        <form
          onSubmit={ handleGet}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-customBgColor-bg p-6 rounded-lg shadow-lg"
        >
        
          {renderSelect("Metal Type", "metalType", ["MS", "SS", "Aluminum", "Other"])}
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
          <button
            type="submit"
            className="w-96 bg-customBgColor hover:bg-customTextColor-light text-white font-semibold py-2 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-customTextColor-light"
          >
            {isUpdateMode ? "Update Stock" : "Submit"}
          </button>
          <button
            type="button"
            onClick={resetForm}
            className="w-96 bg-gray-300 hover:bg-gray-400 text-black font-semibold py-2 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Reset Form
          </button>
        </form>
      </div>
    </div>
  );
};

export default NutBoltsForm;
