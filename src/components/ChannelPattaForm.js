import React, { useState } from "react";
import { SidebarDemo } from "./SideComponent";
import axios from "axios";

const ChannelPattaForm = () => {
  const channelType = ["Channel Type", "MS", "SS"];
  const angleType = ["Angle Type", "MS", "SS"];
  const channelSize = [
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
  const angleSize = [
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

  const [formData, setFormData] = useState({
    channelType: "",
    channelSize: "",
    noOfChannels: "",
    channelweight: "",
    angleType: "",
    angleSize: "",
    angleweight: "",
    datePurchased: "",
    dateDelivered: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/channel-patta/add",
        formData
      );
      alert(response.data.message);
      setFormData({
        channelType: "",
        channelSize: "",
        noOfChannels: "",
        channelweight: "",
        angleType: "",
        angleSize: "",
        angleweight: "",
        datePurchased: "",
        dateDelivered: "",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to submit data.");
    }
  };

  return (
    <div className="flex flex-row h-screen w-full">
      <SidebarDemo />
      <div className="flex-1 bg-gray-50 dark:bg-neutral-900 p-6 ">
        <h1 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
          Channel and Patta List
        </h1>
        <form
          onSubmit={handleSubmit}
          className="h-screen w-5/6 bg-customBgColor-bg dark:bg-neutral-800 p-6 rounded-2xl shadow-md border dark:border-neutral-700 grid grid-cols-1 md:grid-cols-2 space-x-1 items-center justify-center"
        >
          {/* Channel Type */}
          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
              Channel Type
            </label>
            <select
              name="channelType"
              className="w-full border  border-gray-300 dark:border-neutral-600 dark:bg-neutral-800 rounded-lg p-2 focus:ring-2 focus:ring-customTextColor-light"
              value={formData.channelType}
              onChange={handleChange}
            >
              {channelType.map((type, index) => (
                <option key={index} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          {/* Channel Size */}
          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
              Channel Size
            </label>
            <select
              name="channelSize"
              className="w-full border  border-gray-300 dark:border-neutral-600 dark:bg-neutral-800 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-customTextColor-light"
              value={formData.channelSize}
              onChange={handleChange}
            >
              {channelSize.map((size, index) => (
                <option key={index} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>

          {/* No. of Channels */}
          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
              No. of Channels
            </label>
            <input
              type="number"
              name="noOfChannels"
              className="w-full border  border-gray-300 dark:border-neutral-600 dark:bg-neutral-800 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-customTextColor-light"
              placeholder="Enter the number of channels"
              value={formData.noOfChannels}
              onChange={handleChange}
              required
            />
          </div>

          {/* Weight */}
          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
              Channel Weight (kg)
            </label>
            <input
              type="number"
              name="weight"
              className="w-full border  border-gray-300 dark:border-neutral-600 dark:bg-neutral-800 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-customTextColor-light"
              placeholder="Enter weight"
              value={formData.channelweight}
              onChange={handleChange}
              required
            />
          </div>

          {/* Angle Type */}
          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
              Angle Type
            </label>
            <select
              name="angleType"
              className="w-full border  border-gray-300 dark:border-neutral-600 dark:bg-neutral-800 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-customTextColor-light"
              value={formData.angleType}
              onChange={handleChange}
            >
              {angleType.map((type, index) => (
                <option key={index} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          {/* Angle Size */}
          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
              Angle Size
            </label>
            <select
              name="angleSize"
              className="w-full border  border-gray-300 dark:border-neutral-600 dark:bg-neutral-800 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-customTextColor-light"
              value={formData.angleSize}
              onChange={handleChange}
            >
              {angleSize.map((size, index) => (
                <option key={index} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
            Angle Weight (kg)
            </label>
            <input
              type="number"
              name="weight"
              className="w-full border  border-gray-300 dark:border-neutral-600 dark:bg-neutral-800 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-customTextColor-light"
              placeholder="Enter weight"
              value={formData.angleweight}
              onChange={handleChange}
              required
            />
          </div>

          {/* Dates */}
          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
              Date Purchased
            </label>
            <input
              type="date"
              name="datePurchased"
              value={formData.datePurchased}
              onChange={handleChange}
              className="w-full border  border-gray-300 dark:border-neutral-600 dark:bg-neutral-800 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-customTextColor-light"
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
              onChange={handleChange}
              className="w-full border border-gray-300 dark:border-neutral-600 dark:bg-neutral-800 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-customTextColor-light"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="col-span-2 flex justify-center items-center">
            <button
              type="submit"
              className="w-96 bg-customBgColor hover:bg-customTextColor-light text-white font-semibold py-2 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-customTextColor-light"
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
