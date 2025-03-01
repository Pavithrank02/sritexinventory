import React, { useState } from "react";

const NutBoltsForm = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const boltType = ["sheet type", "ms", "ss"];
  const boltSize = [
    "size",
    " 1x3/8",
    "3/4x3/8",
    "2x3/8",
    "1x5/16",
    " 3/4x5/16",
    "1 1/2x5/16",
    "3/4x1/2",
    "11/2x1/2",
    "1/2 x 1/4",
    "3/4x 1/4",
    "1x1/4",
    "12",
    "16",
  ];
  const nuttType = ["sheet type", "ms", "ss"];
  const nutSize = ["size", " 3/8", "5/16", "1/2", "1/4", "12", "16"];
  const washerSize = ["size", " 3/8", "5/16", "1/2", "1/4", "12", "16"];

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Nuts and Bolts Form</h1>

      <form className="grid grid-cols-2 gap-4">
        <div>
          <label>Metal Type</label>
          <input type="text" name="metal type" required className="border p-2 w-full" />
        </div>

        <div>
          <label>Bolt Type</label>
          <select
            className="border p-2 w-full"
            value={selectedOption}
            onChange={handleChange}
          >
            {boltType.map((type, index) => (
              <option key={index} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Bolt Size</label>
          <select
            className="border p-2 w-full"
            value={selectedOption}
            onChange={handleChange}
          >
            {boltSize.map((type, index) => (
              <option key={index} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Quantity</label>
          <input type="text" name="number" required className="border p-2 w-full" />
        </div>

        <div>
          <label>Weight</label>
          <input type="text" name="number" required className="border p-2 w-full" />
        </div>

        <div>
          <label>Nut Size</label>
          <select
            className="border p-2 w-full"
            value={selectedOption}
            onChange={handleChange}
          >
            {nutSize.map((type, index) => (
              <option key={index} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Quantity</label>
          <input type="text" name="number" required className="border p-2 w-full" />
        </div>

        <div>
          <label>Weight</label>
          <input type="text" name="number" required className="border p-2 w-full" />
        </div>

        <div>
          <label>Nut Type</label>
          <select
            className="border p-2 w-full"
            value={selectedOption}
            onChange={handleChange}
          >
            {nuttType.map((type, index) => (
              <option key={index} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Quantity</label>
          <input type="text" name="number" required className="border p-2 w-full" />
        </div>

        <div>
          <label>Weight</label>
          <input type="text" name="number" required className="border p-2 w-full" />
        </div>

        <div>
          <label>Washer Size</label>
          <select
            className="border p-2 w-full"
            value={selectedOption}
            onChange={handleChange}
          >
            {washerSize.map((type, index) => (
              <option key={index} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Quantity</label>
          <input type="text" name="number" required className="border p-2 w-full" />
        </div>

        <div>
          <label>Weight</label>
          <input type="text" name="number" required className="border p-2 w-full" />
        </div>

        <div>
          <label>Date Purchased</label>
          <input type="date" placeholder="enter date" className="border p-2 w-full" />
        </div>

        <div>
          <label>No of Faulty Nuts</label>
          <input type="text" name="number" required className="border p-2 w-full" />
        </div>

        <div>
          <label>No of Faulty Bolts</label>
          <input type="text" name="number" required className="border p-2 w-full" />
        </div>
      </form>
    </div>
  );
};

export default NutBoltsForm;
