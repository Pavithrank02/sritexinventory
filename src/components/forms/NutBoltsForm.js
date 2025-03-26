import React, { useState } from "react";
import { SidebarDemo } from "../SideComponent";

const NutBoltsForm = () => {
  const [formData, setFormData] = useState({
    items: [
      {
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
        faultyNuts: "",
        faultyBolts: "",
      },
    ],
    datePurchased: new Date().toISOString().split("T")[0],
  });

  const [isUpdateMode, setIsUpdateMode] = useState(false);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { items, datePurchased } = formData;

    // Validate items and datePurchased
    const emptyFields = [];

    if (!datePurchased) {
      emptyFields.push("Date Purchased");
    }

    items.forEach((item, itemIndex) => {
      Object.entries(item).forEach(([key, value]) => {
        if (value === "") {
          emptyFields.push(`Item ${itemIndex + 1}: ${key}`);
        }
      });
    });

    if (emptyFields.length > 0) {
      alert(
        `Please fill out the following fields:\n- ${emptyFields.join("\n- ")}`
      );
      return;
    }
    // try {
    //   const response = await fetch(
    //     `http://localhost:5000/nuts-and-bolts/add-or-update`,
    //     {
    //       method: "PUT",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify(formData),
    //     }
    //   );

    //   if (response.ok) {
    //     const result = await response.json();
    //     alert(
    //       formData._id
    //         ? "Data updated successfully!"
    //         : "Data added successfully!"
    //     );
    //     console.log("Response:", result);
    //     resetForm();
    //   } else {
    //     const error = await response.json();
    //     alert(`Error: ${error.message}`);
    //   }
    // } catch (error) {
    //   console.error("Error submitting form:", error);
    //   alert("Failed to submit form. Please try again later.");
    // }
    alert("Form Submmitted")
  };

  const resetForm = () => {
    setFormData({
      items: [
        {
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
          faultyNuts: "",
          faultyBolts: "",
        },
      ],
      datePurchased: "",
    });
    setIsUpdateMode(false);
  };

  const handleChange = (e, index = null) => {
    const { name, value } = e.target;

    if (index === null) {
      // Update top-level fields like datePurchased
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    } else {
      // Update specific item fields
      const updatedItems = [...formData.items];
      updatedItems[index] = { ...updatedItems[index], [name]: value };
      setFormData((prevFormData) => ({
        ...prevFormData,
        items: updatedItems,
      }));
    }
  };

  const addItem = () => {
    setFormData({
      ...formData,
      items: [
        ...formData.items,
        {
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
          faultyNuts: "",
          faultyBolts: "",
        },
      ],
    });
  };

  const removeItem = (index) => {
    const updatedItems = formData.items.filter((_, i) => i !== index);
    setFormData({ ...formData, items: updatedItems });
  };

  const renderInput = (label, name, index, type = "text", placeholder = "") => (
    <div>
      <label className="block text-sm font-medium text-gray-600 mb-1">
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={formData.items[index][name]}
        onChange={(e) => handleChange(e, index)}
        placeholder={placeholder}
        className="w-full border border-customBorderColor dark:border-neutral-600 dark:bg-neutral-800 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-customTextColor-light"
        required
      />
    </div>
  );

  const renderSelect = (label, name, index, optionsArray) => (
    <div>
      <label className="block text-sm font-medium text-gray-600 mb-1">
        {label}
      </label>
      <select
        name={name}
        value={formData.items[index][name]}
        onChange={(e) => handleChange(e, index)}
        className="w-full border border-customBorderColor dark:border-neutral-600 dark:bg-neutral-800 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-customTextColor-light"
        required
      >
        <option value="">Select {label}</option>
        {optionsArray.map((option, i) => (
          <option key={i} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );

  return (
    <div className="flex flex-row bg-gray-100 min-h-screen">
      <SidebarDemo />
      <div className="p-8 w-full max-w-7xl">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">
          Nuts and Bolts Form
        </h1>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-white p-8 rounded-xl shadow-2xl w-full"
        >
          {formData.items.map((item, index) => (
            <div
              key={index}
              className="col-span-full border p-6 rounded-lg shadow-md bg-customBgColor-bg dark:bg-neutral-800"
            >
              <h3 className="text-lg font-semibold mb-4 text-gray-700 dark:text-cuborder-customBgColor-bg">
                Item {index + 1}
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {renderSelect("Metal Type", "metalType", index, [
                  "MS",
                  "SS",
                  "Aluminum",
                  "Other",
                ])}
                {renderSelect("Bolt Type", "boltType", index, options.boltType)}
                {renderSelect("Bolt Size", "boltSize", index, options.boltSize)}
                {renderInput("Bolt Quantity", "boltQuantity", index)}
                {renderInput("Bolt Weight", "boltWeight", index)}
                {renderSelect("Nut Type", "nutType", index, options.nutType)}
                {renderSelect("Nut Size", "nutSize", index, options.nutSize)}
                {renderInput("Nut Quantity", "nutQuantity", index)}
                {renderInput("Nut Weight", "nutWeight", index)}
                {renderSelect(
                  "Washer Size",
                  "washerSize",
                  index,
                  options.washerSize
                )}
                {renderInput("Washer Quantity", "washerQuantity", index)}
                {renderInput("Washer Weight", "washerWeight", index)}
                {renderInput("No of Faulty Nuts", "faultyNuts", index)}
                {renderInput("No of Faulty Bolts", "faultyBolts", index)}
              </div>
              <button
                type="button"
                onClick={() => removeItem(index)}
                className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-lg mt-4"
              >
                Remove Item
              </button>
            </div>
          ))}

          <div className="lg:col-span-2">
            <button
              type="button"
              onClick={addItem}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg mb-6"
            >
              Add Item
            </button>
            <input
              type="date"
              value={formData.datePurchased}
              onChange={(e) => {
                console.log("Date Purchased:", e.target.value);
                setFormData((prev) => ({
                  ...prev,
                  datePurchased: e.target.value,
                }));
              }}
            />
            <div className="grid grid-cols-2 gap-4 mt-6">
              <button
                type="submit"
                className="w-full bg-customTextColor hover:bg-blue-600 text-white font-semibold py-3 rounded-lg shadow-md"
              >
                {isUpdateMode ? "Update Stock" : "Submit"}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="w-full bg-cuborder-customBgColor-bg hover:bg-gray-400 text-black font-semibold py-3 rounded-lg shadow-md"
              >
                Reset Form
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NutBoltsForm;
