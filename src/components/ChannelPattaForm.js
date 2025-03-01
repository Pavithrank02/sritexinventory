import React, { useState } from "react";

const ChannelPattaForm = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const channelType = ["channel type", "ms", "ss"];
  const angleType = ["angle type", "ms", "ss"];
  const channelSize = [
    "mm",
    " 1",
    "1.2",
    "1.6",
    "2",
    " 2.5",
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
    "mm",
    " 1",
    "1.2",
    "1.6",
    "2",
    " 2.5",
    "3",
    "4",
    "5",
    "6",
    "8",
    "10",
    "12",
    "16",
  ];

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div>
      <p>Channel and Patta List</p>
      <form className="flex flex-col w-1/2 ">
        <select
          className="border-2"
          value={selectedOption}
          onChange={handleChange}
        >
          {channelType.map((type, index) => {
            return (
              <option key={index} value={type}>
                {type}
              </option>
            );
          })}
        </select>
        <select
          className="border-2"
          value={selectedOption}
          onChange={handleChange}
        >
          {channelSize.map((type, index) => {
            return (
              <option key={index} value={type}>
                {type}
              </option>
            );
          })}
        </select>
        <label>No. of Channel</label>
        <input type="text" name="number" required className="border-2" />
        <label>Weight</label>
        <input type="text" name="number" required className="border-2" />

        <select
          className="border-2"
          value={selectedOption}
          onChange={handleChange}
        >
          {angleType.map((type, index) => {
            return (
              <option key={index} value={type}>
                {type}
              </option>
            );
          })}
        </select>
        <select
          className="border-2"
          value={selectedOption}
          onChange={handleChange}
        >
          {angleSize.map((type, index) => {
            return (
              <option key={index} value={type}>
                {type}
              </option>
            );
          })}
        </select>
        <label>No. of Angles</label>
        <label>Date Purchased</label>
        <input type="date" placeholder="enter date" className="border-2" />
        <label>Date Delivered</label>
        <input type="date" placeholder="enter date" className="border-2" />
      </form>
    </div>
  );
};

export default ChannelPattaForm;
