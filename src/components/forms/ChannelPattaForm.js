import React, { useState } from "react";
import { SidebarDemo } from "../SideComponent";
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
    <div className="flex flex-col md:flex-row h-full md:h-screen w-full">
      <SidebarDemo />
      <div className="flex-1 bg-customTextColor-white p-4 sm:p-6">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-4 text-gray-800  text-center">
          Channel and Patta Form
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Dates */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-customTextColor  font-medium mb-2">
                Date Purchased
              </label>
              <input
                type="date"
                name="datePurchased"
                value={formData.datePurchased}
                onChange={handleFormChange}
                className="w-full border border-customBorderColor  rounded-lg p-2  focus:outline-none focus:ring-2 focus:ring-customTextColor-light"
                required
              />
            </div>
            <div>
              <label className="block text-customTextColor font-medium mb-2">
                Date Delivered
              </label>
              <input
                type="date"
                name="dateDelivered"
                value={formData.dateDelivered}
                onChange={handleFormChange}
                className="w-full border border-customBorderColor rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-customTextColor-light"
                required
              />
            </div>
          </div>

          {/* Items Section */}
          <div className="bg-customBgColor-bg  p-4 sm:p-6 rounded-lg shadow-lg">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-customTextColor  mb-6">
              Items
            </h2>
            {formData.items.map((item, index) => (
              <div
                key={index}
                className="bg-white  border border-gray-200 shadow-md rounded-lg p-4 sm:p-6 mb-6 transition-transform transform hover:scale-[1.02]"
              >
                {/* Row 1 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <select
                    name="channelType"
                    className="w-full border border-customBorderColor  rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-customTextColor-light"
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
                    className="w-full border border-customBorderColor  rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-customTextColor-light"
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
                    className="w-full border border-customBorderColor  rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-customTextColor-light"
                    value={item.noOfChannels}
                    onChange={(e) => handleInputChange(e, index)}
                    required
                  />
                  <input
                    type="number"
                    name="channelWeight"
                    placeholder="Channel Weight (kg)"
                    className="w-full border border-customBorderColor  rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-customTextColor-light"
                    value={item.channelWeight}
                    onChange={(e) => handleInputChange(e, index)}
                    required
                  />
                </div>

                {/* Row 2 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  <select
                    name="angleType"
                    className="w-full border border-customBorderColor  rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-customTextColor-light"
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
                    className="w-full border border-customBorderColor  rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-customTextColor-light"
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
                    className="w-full border border-customBorderColor  rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-customTextColor-light"
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
                    className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-600 font-medium mt-4"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addRow}
              className="bg-customBgColor hover:bg-customTextColor-light text-white font-semibold py-2 px-4 md:px-6 rounded-lg shadow-md transition-transform transform hover:scale-105"
            >
              + Add Row
            </button>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 md:px-6 rounded-lg shadow-md"
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
