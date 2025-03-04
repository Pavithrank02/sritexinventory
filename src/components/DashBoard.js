import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import { SidebarDemo } from "./SideComponent";

// Dynamic calculation function
const calculateSummary = (data) => {
  const summary = {};
  Object.entries(data).forEach(([key, items]) => {
    if (key !== "summary") {
      const totalStock = items.reduce((sum, item) => sum + (item.stock || 0), 0);
      const totalRequired = items.reduce(
        (sum, item) => sum + (item.required || 0),
        0
      );
      summary[`total_${key}_stock`] = totalStock;
      summary[`total_${key}_required`] = totalRequired;
    }
  });
  return summary;
};

// Dynamic data input
const data = {
  bolts: [
    { size: "1x3/8", stock: 350, required: 400, remaining: 50 },
    { size: "3/4x3/8", stock: 120, required: 88, remaining: 0 },
    { size: "2x3/8", stock: 100, required: 100, remaining: 0 },
    { size: "3/4x5/16", stock: 300, required: 286, remaining: 0 },
    { size: "1x5/16", stock: 150, required: 106, remaining: 0 },
    { size: "1/2 x 1/4", stock: 400, required: 500, remaining: 100 },
    { size: "3/4x 1/4", stock: 80, required: 120, remaining: 0 },
    { size: "1x1/4", stock: 100, required: 500, remaining: 400 },
  ],
  nuts: [
    { size: "1x3/8", stock: 337, required: 350, remaining: 13 },
    { size: "1x5/16", stock: 100, required: 106, remaining: 10 },
    { size: "3/4x1/2", stock: 100, required: 60, remaining: 0 },
    { size: "11/2x1/2", stock: 100, required: 50, remaining: 0 },
  ],
  washers: [
    { size: "1x3/8", stock: 350, required: 400, remaining: 50 },
    { size: "3/4x3/8", stock: 120, required: 88, remaining: 0 },
    { size: "2x3/8", stock: 100, required: 100, remaining: 0 },
    { size: "3/4x1/2", stock: 0, required: 60, remaining: 60 },
    { size: "11/2x1/2", stock: 0, required: 50, remaining: 50 },
    { size: "1x1/4", stock: 0, required: 500, remaining: 500 },
  ],
};

// Summary dynamically calculated
const summary = calculateSummary(data);

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const Dashboard = () => {
  return (
    <div className="flex flex-row">
      <SidebarDemo />
      <div className="p-6 bg-gradient-to-br from-customTextColor-white via-customBorderColor-light to-gray-300 min-h-screen">
        {/* Summary Cards */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          {Object.entries(summary).map(([key, value], index) => (
            <motion.div
              key={index}
              className="p-4 bg-customBgColor-bg shadow-xl rounded-xl text-center border-l-4 border-customBorderColor transform hover:scale-105 transition duration-200"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <h2 className="text-lg font-semibold capitalize text-gray-700">
                {key.replace(/_/g, " ")}
              </h2>
              <p className="text-3xl text-customTextColor font-bold">
                <CountUp end={value} duration={2} />
              </p>
            </motion.div>
          ))}
        </div>

        {/* Dynamic Charts and Data Tables */}
        {Object.entries(data).map(([key, items], index) => (
          <motion.div
            key={index}
            className="mb-8 bg-white p-6 rounded-lg shadow-xl border-t-4 border-customBorderColor"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-xl font-bold mb-4 text-gray-800">
              {key.charAt(0).toUpperCase() + key.slice(1)} Details
            </h2>
            {/* Bar Chart */}
            {key === "bolts" && (
              <BarChart width={600} height={300} data={items}>
                <XAxis dataKey="size" stroke="#4B5563" />
                <YAxis stroke="#4B5563" />
                <Tooltip />
                <Legend />
                <Bar dataKey="stock" fill="#1D4ED8" name="Stock" />
                <Bar dataKey="required" fill="#10B981" name="Required" />
              </BarChart>
            )}
            {/* Pie Chart */}
            {key === "nuts" && (
              <PieChart width={400} height={400}>
                <Pie
                  data={items}
                  dataKey="stock"
                  nameKey="size"
                  cx="50%"
                  cy="50%"
                  outerRadius={120}
                  fill="#10B981"
                  label
                >
                  {items.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            )}
            {/* Data Table */}
            <table className="w-full bg-white rounded-lg shadow">
              <thead>
                <tr className="bg-customTextColor-light text-white">
                  <th className="p-3 text-left text-sm">Size</th>
                  <th className="p-3 text-left text-sm">Stock</th>
                  <th className="p-3 text-left text-sm">Required</th>
                  {items.some((item) => item.remaining !== undefined) && (
                    <th className="p-3 text-left text-sm">Remaining</th>
                  )}
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? "bg-gray-50" : "bg-customBgColor-bg"}
                  >
                    <td className="p-3 border-b text-sm">{item.size}</td>
                    <td className="p-3 border-b text-sm">{item.stock}</td>
                    <td className="p-3 border-b text-sm">{item.required}</td>
                    {item.remaining !== undefined && (
                      <td className="p-3 border-b text-sm">{item.remaining}</td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
