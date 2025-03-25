import React from "react";
import { motion } from "framer-motion";
import CountUp from "react-countup";

const StockCard = ({ size, stock, totalWeight, required }) => {
  const isCritical = stock < 50;
  const shortageOrSurplus = (stock || 0) - (required || 0);

  return (
    <motion.div
      className={`p-4 shadow-lg rounded-lg border-l-4 transition-transform transform hover:scale-105 ${
        isCritical ? "bg-red-50 border-red-500" : "bg-green-50 border-green-500"
      }`}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
    >
      <h3 className="text-md font-bold text-gray-700 capitalize">{size}</h3>
      <p className="text-sm text-gray-500">
        {isCritical ? "⚠ Critical Stock" : "Sufficient Stock"}
      </p>
      <p className="text-lg font-bold text-gray-800">
        Stock:{" "}
        <CountUp start={0} end={stock} duration={2} separator="," />
      </p>
      <p className="text-sm text-gray-600">Weight: {totalWeight} kg</p>
      <p
        className={`text-sm font-semibold ${
          shortageOrSurplus < 0 ? "text-red-500" : "text-green-500"
        }`}
      >
        {shortageOrSurplus < 0
          ? `Shortage: ${Math.abs(shortageOrSurplus)}`
          : `Surplus: ${shortageOrSurplus}`}
      </p>
    </motion.div>
  );
};

export default StockCard;
