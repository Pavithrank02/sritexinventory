import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";
import { motion } from "framer-motion";
import CountUp from "react-countup";

const data = [
  { material: "1.2mm Sheet- 2500X1250(8x4)", noOfSheets: 2, balance: 0 },
  { material: "2.5mm Sheet- 2500X1250(8x4)", noOfSheets: 1, balance: 0 },
  { material: "3mm Sheet- 2500X1250(8x4)", noOfSheets: 2, balance: 0 },
  { material: "4mm HR Sheet (8x4)", noOfSheets: 1, balance: 0 },
  { material: "5mm Sheet 905X905", noOfSheets: 1, balance: 0 },
  { material: "6mm Sheet 2500x1250(8x4)", noOfSheets: 3, balance: 3 },
];

// Calculate totals dynamically
const totalSheets = data.reduce((acc, item) => acc + item.noOfSheets, 0);
const pendingSheets = data.reduce((acc, item) => acc + item.balance, 0);
const receivedSheets = totalSheets - pendingSheets;

const Dashboard = () => {
  return (
    <div className="p-6 bg-gradient-to-br from-gray-100 to-gray-300 min-h-screen">
      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        {[
          { label: "Total Sheets", value: totalSheets },
          { label: "Pending Sheets", value: pendingSheets },
          { label: "Received Sheets", value: receivedSheets },
        ].map((item, index) => (
          <motion.div
            key={index}
            className="p-4 bg-white shadow-lg rounded-xl text-center border-l-4 border-blue-500 transform hover:scale-105 transition duration-200"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
          >
            <h2 className="text-lg font-semibold text-gray-700">
              {item.label}
            </h2>
            <p className="text-3xl font-bold text-blue-500">
              <CountUp end={item.value} duration={2} />
            </p>
          </motion.div>
        ))}
      </div>

      {/* Bar Chart for Material Distribution */}
      <motion.div
        className="mb-8 bg-white p-6 rounded-lg shadow-xl"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-xl font-bold mb-4 text-gray-800">
          Material Sheets Overview
        </h2>
        <BarChart width={600} height={300} data={data}>
          <XAxis dataKey="material" stroke="#4B5563" />
          <YAxis stroke="#4B5563" />
          <Tooltip />
          <Legend />
          <Bar dataKey="noOfSheets" fill="#1D4ED8" name="No of Sheets" />
          <Bar dataKey="balance" fill="#10B981" name="Pending Sheets" />
        </BarChart>
      </motion.div>

      {/* Detailed Data Table */}
      <motion.div
        className="bg-white p-6 rounded-lg shadow-xl"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-xl font-bold mb-4 text-gray-800">
          Material Details
        </h2>
        <table className="w-full bg-white rounded-lg shadow">
          <thead>
            <tr className="bg-blue-500 text-white">
              <th className="p-3 text-left text-sm">Material</th>
              <th className="p-3 text-left text-sm">No of Sheets</th>
              <th className="p-3 text-left text-sm">Pending Sheets</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
              >
                <td className="p-3 border-b text-sm">{item.material}</td>
                <td className="p-3 border-b text-sm">{item.noOfSheets}</td>
                <td className="p-3 border-b text-sm">{item.balance}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
};

export default Dashboard;
