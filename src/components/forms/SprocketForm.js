import React from "react";
//
const SprocketForm = () => {
  const materialType = ["Select Type", "MS", "SS"]
  const handleSelect = (e) =>{
    const {name, value} = e.target
//s
  }
  return (
    <div>
      <label>Material</label>
      <select
      className="border border-customBorderColor rounded-lg p-2 w-full"
      onChange={handleSelect}
      >
        {materialType.map((type, index) =>{
          <option key={index}>{type}</option>
        })}
        
       
      </select>
    </div>
  );
};

export default SprocketForm;
