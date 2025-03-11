import React, { useState } from "react";
import { SidebarDemo } from "./SideComponent";
import axios from "axios";

const ChannelPattaForm = () => {
  const channelType = ["MS", "SS"];
  const angleType = ["MS", "SS"];
  const sizes = [
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

  const [formData, setFormData] = useState({
    datePurchased: "",
    dateDelivered: "",
    items: [
      {
        channelType: "",
        channelSize: "",
        noOfChannels: "",
        channelWeight: "",
        angleType: "",
        angleSize: "",
        angleWeight: "",
      },
    ],
  });

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const updatedItems = [...formData.items];
    updatedItems[index][name] = value;
    setFormData((prevData) => ({ ...prevData, items: updatedItems }));
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const addRow = () => {
    setFormData((prevData) => ({
      ...prevData,
      items: [
        ...prevData.items,
        {
          channelType: "",
          channelSize: "",
          noOfChannels: "",
          channelWeight: "",
          angleType: "",
          angleSize: "",
          angleWeight: "",
        },
      ],
    }));
  };

  const removeRow = (index) => {
    const updatedItems = [...formData.items];
    updatedItems.splice(index, 1);
    setFormData((prevData) => ({ ...prevData, items: updatedItems }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.datePurchased || !formData.dateDelivered) {
      alert("Please fill out all required fields for dates.");
      return;
    }

    const incompleteItems = formData.items.some((item) =>
      Object.values(item).some((value) => value === "")
    );

    if (incompleteItems) {
      alert("Please fill out all fields for each item.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/channel-patta/add",
        formData
      );
      alert(response.data.message);
      setFormData({
        datePurchased: "",
        dateDelivered: "",
        items: [
          {
            channelType: "",
            channelSize: "",
            noOfChannels: "",
            channelWeight: "",
            angleType: "",
            angleSize: "",
            angleWeight: "",
          },
        ],
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to submit data.");
    }
  };

  return (
    <div className="flex flex-row h-screen w-full">
      <SidebarDemo />
      <div className="flex-1 bg-gray-50 dark:bg-neutral-900 p-6">
        <h1 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
          Channel and Patta Form
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Dates */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
                Date Purchased
              </label>
              <input
                type="date"
                name="datePurchased"
                value={formData.datePurchased}
                onChange={handleFormChange}
                className="w-full border border-gray-300 dark:border-neutral-600 dark:bg-neutral-800 rounded-lg p-2 focus:ring-2 focus:ring-customTextColor-light"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
                Date Delivered
              </label>
              <input
                type="date"
                name="dateDelivered"
                value={formData.dateDelivered}
                onChange={handleFormChange}
                className="w-full border border-gray-300 dark:border-neutral-600 dark:bg-neutral-800 rounded-lg p-2 focus:ring-2 focus:ring-customTextColor-light"
                required
              />
            </div>
          </div>

          {/* Items Section */}
          <div>
            <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">
              Items
            </h2>
            {formData.items.map((item, index) => (
              <div
                key={index}
                className="bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 shadow-sm rounded-lg p-6 mb-4"
              >
                
                  {/* Row 1 */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <select
                      name="channelType"
                      className="border border-gray-300 dark:border-neutral-600 dark:bg-neutral-800 rounded-lg p-2"
                      value={item.channelType}
                      onChange={(e) => handleInputChange(e, index)}
                      required
                    >
                      <option value="">Channel Type</option>
                      {channelType.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                    <select
                      name="channelSize"
                      className="border border-gray-300 dark:border-neutral-600 dark:bg-neutral-800 rounded-lg p-2"
                      value={item.channelSize}
                      onChange={(e) => handleInputChange(e, index)}
                      required
                    >
                      <option value="">Channel Size</option>
                      {sizes.map((size) => (
                        <option key={size} value={size}>
                          {size}
                        </option>
                      ))}
                    </select>
                    <input
                      type="number"
                      name="noOfChannels"
                      placeholder="No. of Channels"
                      className="border border-gray-300 dark:border-neutral-600 dark:bg-neutral-800 rounded-lg p-2"
                      value={item.noOfChannels}
                      onChange={(e) => handleInputChange(e, index)}
                      required
                    />
                    <input
                      type="number"
                      name="channelWeight"
                      placeholder="Channel Weight (kg)"
                      className="border border-gray-300 dark:border-neutral-600 dark:bg-neutral-800 rounded-lg p-2"
                      value={item.channelWeight}
                      onChange={(e) => handleInputChange(e, index)}
                      required
                    />
                  </div>

                  {/* Row 2 */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <select
                      name="angleType"
                      className="border border-gray-300 dark:border-neutral-600 dark:bg-neutral-800 rounded-lg p-2"
                      value={item.angleType}
                      onChange={(e) => handleInputChange(e, index)}
                      required
                    >
                      <option value="">Angle Type</option>
                      {angleType.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                    <select
                      name="angleSize"
                      className="border border-gray-300 dark:border-neutral-600 dark:bg-neutral-800 rounded-lg p-2"
                      value={item.angleSize}
                      onChange={(e) => handleInputChange(e, index)}
                      required
                    >
                      <option value="">Angle Size</option>
                      {sizes.map((size) => (
                        <option key={size} value={size}>
                          {size}
                        </option>
                      ))}
                    </select>
                    <input
                      type="number"
                      name="angleWeight"
                      placeholder="Angle Weight (kg)"
                      className="border border-gray-300 dark:border-neutral-600 dark:bg-neutral-800 rounded-lg p-2"
                      value={item.angleWeight}
                      onChange={(e) => handleInputChange(e, index)}
                      required
                    />
                  </div>
                

                {/* Remove Button */}
                {index > 0 && (
                  <button
                    type="button"
                    onClick={() => removeRow(index)}
                    className="text-red-500 hover:text-red-700 font-medium mt-4"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addRow}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md"
            >
              + Add Row
            </button>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChannelPattaForm;
