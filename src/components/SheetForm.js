import React from "react";

const SheetForm = () => {
  const [selectedOption, setSelectedOption] = useState("");

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div>
      <p>Metal Sheet List</p>
      <form>
        <input type="text" name="metal type" required />
        <select value={selectedOption} onChange={handleChange}>
          <option value="">Select...</option>
          <option value="ms">MS</option>
          <option value="ss">SS</option>
          <option value="orange">Orange</option>
        </select>
        <input type="date" placeholder="enter date"/>
      </form>
    </div>
  );
};

export default SheetForm;
