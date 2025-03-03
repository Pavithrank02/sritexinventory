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
import CountUp from "react-countup"; // Import the CountUp library
import { SidebarDemo } from "./SideComponent";

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
    { size: "3/4x1/2", required: 60 },
    { size: "11/2x1/2", required: 50 },
    { size: "1x1/4", required: 500 },
  ],
  summary: {
    total_bolts_stock: 1600,
    total_bolts_required: 2230,
    total_nuts_stock: 637,
    total_nuts_required: 1780,
    total_washers_required: 610,
  },
};

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const Dashboard = () => {
  return (
    <div className="flex flex-row">
      <SidebarDemo />
      <div className="p-6 bg-gradient-to-br bg-customBgColor-bg to-gray-300 min-h-screen">
        {/* Summary Cards */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          {Object.entries(data.summary).map(([key, value], index) => (
            <motion.div
              key={index}
              className="p-4 bg-white shadow-xl rounded-xl text-center border-l-4 border-customBorderColor transform hover:scale-105 transition duration-200"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <h2 className="text-lg font-semibold capitalize text-gray-700">
                {key.replace(/_/g, " ")}
              </h2>
              {/* Use CountUp for animated numbers */}
              <p className="text-3xl text-customTextColor font-bold">
                <CountUp end={value} duration={2} />
              </p>
            </motion.div>
          ))}
        </div>

        {/* Bar Chart for Bolts */}
        <motion.div
          className="mb-8 bg-white p-6 rounded-lg shadow-xl border-t-4 border-blue-500"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-xl font-bold mb-4 text-gray-800">
            Bolts Stock vs. Required
          </h2>
          <BarChart width={600} height={300} data={data.bolts}>
            <XAxis dataKey="size" stroke="#4B5563" />
            <YAxis stroke="#4B5563" />
            <Tooltip />
            <Legend />
            <Bar dataKey="stock" fill="#1D4ED8" name="Stock" />
            <Bar dataKey="required" fill="#10B981" name="Required" />
          </BarChart>
        </motion.div>

        {/* Pie Chart for Nuts */}
        <motion.div
          className="mb-8 bg-white p-6 rounded-lg shadow-xl border-t-4 border-green-500"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-xl font-bold mb-4 text-gray-800">
            Nuts Stock Distribution
          </h2>
          <PieChart width={400} height={400}>
            <Pie
              data={data.nuts}
              dataKey="stock"
              nameKey="size"
              cx="50%"
              cy="50%"
              outerRadius={120}
              fill="#10B981"
              label
            >
              {data.nuts.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </motion.div>

        {/* Washer Table */}
        <motion.div
          className="mb-8 bg-white p-6 rounded-lg shadow-xl border-t-4 border-yellow-500"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-xl font-bold mb-4 text-gray-800">
            Washer Requirements
          </h2>
          <table className="w-full bg-white rounded-lg shadow">
            <thead>
              <tr className="bg-yellow-500 text-white">
                <th className="border-b p-3 text-left text-sm">Size</th>
                <th className="border-b p-3 text-left text-sm">Required</th>
              </tr>
            </thead>
            <tbody>
              {data.washers.map((washer, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                >
                  <td className="p-3 border-b text-sm">{washer.size}</td>
                  <td className="p-3 border-b text-sm">{washer.required}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
