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
import { color, motion } from "framer-motion";
import CountUp from "react-countup";
import { SidebarDemo } from "../SideComponent";
import HorizontalMenu from "../HorizontalMenu";
import { AnimatedModalButton } from "../AnimatedModalButton";
import SearchBar from "../SearchBar";
import StockCard from "../StockCard";

// Dynamic calculation function
const calculateSummary = (data) => {
  const summary = {};
  Object.entries(data).forEach(([key, items]) => {
    if (key !== "summary") {
      const totalStock = items.reduce(
        (sum, item) => sum + (item.stock || 0),
        0
      );

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

// const calculateWeight = (data) => {
//   // console.log(data)
//   const boltTaken = 50;
//   const changedWeight = [];
//   Object.entries(data).forEach(([key, items]) => {
//     // console.log(items, key);

//     if (key === "bolts") {

//         const updatedWeight = items.map((item) => {
//           // console.log("item",item)
//           if(item.size ==="3/4x3/8"){
//           // console.log("item",item?.totalWeight)
//           return item?.totalWeight - item?.weightPerBolt * boltTaken;
//         }
//       });
//       console.log("updatedWeight", updatedWeight);
//     }
//     // console.log(items)
//   });
// };

// Dynamic data input
const data = {
  bolts: [
    { size: "1x3/8", stock: 350, totalWeight: 400, weightPerBolt: 1 },
    { size: "3/4x3/8", stock: 355, totalWeight: 5800, weightPerBolt: 17 },
    { size: "2x3/8", stock: 100, totalWeight: 400, weightPerBolt: 1 },
    { size: "3/4x5/16", stock: 300, totalWeight: 400, weightPerBolt: 1 },
    { size: "1x5/16", stock: 256, totalWeight: 400, weightPerBolt: 1 },
    { size: "1/2x5/16", stock: 340, totalWeight: 3150, weightPerBolt: 10 },
    { size: "1/2 x 1/4", stock: 98, totalWeight: 400, weightPerBolt: 1 },
    { size: "3/4x 1/4", stock: 178, totalWeight: 1150, weightPerBolt: 8 },
    { size: "1x1/4", stock: 280, totalWeight: 2200, weightPerBolt: 9 },
    { size: "3/4x 1/2", stock: 132, totalWeight: 2640, weightPerBolt: 20 },
    { size: "1x 1/2", stock: 80, totalWeight: 400, weightPerBolt: 1 },
    { size: "1 1/2x 1/2", stock: 126, totalWeight: 6400, weightPerBolt: 50 },
  ],
  nuts: [
    { size: "3/8", stock: 283, totalWeight: 400, weightPerNut: 1 },
    { size: "5/16", stock: 168, totalWeight: 400, weightPerNut: 1 },
    { size: "1/2", stock: 0, totalWeight: 400, weightPerNut: 1 },
    { size: "1/4", stock: 569, totalWeight: 400, weightPerNut: 1 },
  ],
  washers: [
    { size: "3/8", stock: 390, totalWeight: 400, weightPerWasher: 1 },
    { size: "1/2", stock: 119, totalWeight: 400, weightPerWasher: 1 },
    { size: "5/16", stock: 0, totalWeight: 400, weightPerWasher: 1 },
    { size: "1/4", stock: 341, totalWeight: 400, weightPerWasher: 1 },
  ],
};
const createItemSummaries = (data) => {
  const summaries = [];

  Object.entries(data).forEach(([key, items]) => {
    items.forEach((item) => {
      summaries.push({
        category: key,
        size: item.size,
        totalStock: item.stock || 0,
        totalWeight: item.totalWeight || 0,
        shortageOrSurplus: (item.stock || 0) - (item.required || 0),
        isCritical: (item.stock || 0) < 50,
      });
    });
  });

  return summaries;
};

// Generate summaries for all items
const itemSummaries = createItemSummaries(data);

// Summary dynamically calculated
const summary = calculateSummary(data);

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#DD8042",
  "#FFC59F",
  "#ED0987",
  "#AD7890",
  "#098700",
  "#123456",
  "#654345",
  "#ADDADE",
];

const Dashboard = () => {
  const calculateWeight = (data) => {
    const boltTaken = 50;
    const nutTaken = 50;
    const washerTaken = 50;

    Object.entries(data).forEach(([key, items]) => {
      if (key === "bolts") {
        // Map through the items to update totalWeight
        items.forEach((item) => {
          if (item.size === "3/4x3/8") {
            // Update totalWeight directly
            item.totalWeight -= item.weightPerBolt * boltTaken;
          }
        });
      }
      if (key === "nuts") {
        // Map through the items to update totalWeight
        items.forEach((item) => {
          if (item.size === "3/8") {
            // Update totalWeight directly
            item.totalWeight -= item.weightPerNut * nutTaken;
          }
        });
      }
      if (key === "washers") {
        // Map through the items to update totalWeight
        items.forEach((item) => {
          if (item.size === "3/8") {
            // Update totalWeight directly
            item.totalWeight -= item.weightPerWasher * washerTaken;
          }
        });
      }
    });

    return data; // Return the updated data
  };
  calculateWeight(data);
  return (
    <div className="flex flex-col lg:flex-row">
      <SidebarDemo />
      <div className="p-6 bg-gradient-to-br from-customTextColor-white via-customBorderColor-light to-gray-300 min-h-screen w-full">
        <HorizontalMenu />

        <div className="mb-8">
          <div className="flex flex-col sm:flex-row justify-between">
            <h2 className="text-2xl font-bold mb-4 sm:mb-0 text-gray-800">
              Inventory Summary
            </h2>
            <div className="mb-5">
              <AnimatedModalButton />
            </div>
          </div>

          {/* Search Bar */}
          <SearchBar data={data} />

          {/* Dropdown Structure for Each Category */}
          {Object.entries(data).map(([category, items], index) => (
            <div key={index} className="mb-4">
              <details className="rounded-lg shadow-md bg-customBgColor-bg border border-gray-300 group">
                <summary className="px-4 py-3 flex items-center justify-between cursor-pointer text-lg font-semibold text-gray-700 group-hover:bg-gray-100">
                  <span className="capitalize">{category}</span>
                  <svg
                    className="w-5 h-5 transform group-open:rotate-180 transition-transform"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </summary>

                <div className="px-4 py-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {items.map((item, idx) => (
                      <StockCard
                        key={idx}
                        size={item.size}
                        stock={item.stock}
                        totalWeight={item.totalWeight}
                        required={item.required}
                      />
                    ))}
                  </div>
                </div>
              </details>
            </div>
          ))}
        </div>

        {/* Existing Dynamic Visualizations */}
        {Object.entries(data).map(([key, items], index) => (
          <motion.div
            key={index}
            className="mb-8 bg-white p-6 rounded-lg shadow-xl border-t-4 border-customBorderColor"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-xl font-bold mb-4 text-gray-800">
              {key.charAt(0).toUpperCase() + key.slice(1)} Visualization
            </h2>

            {/* Bar Chart */}
            <div className="mb-6 w-full max-w-full overflow-auto">
              <h3 className="text-lg font-semibold text-gray-700">
                Stock Analysis
              </h3>
              <BarChart
                width={Math.min(600, window.innerWidth - 50)}
                height={300}
                data={items}
              >
                <XAxis dataKey="size" stroke="#4B5563" />
                <YAxis stroke="#4B5563" />
                <Tooltip />
                <Legend />
                <Bar dataKey="stock" fill="#177643" name="Stock" />
              </BarChart>
            </div>

            {/* Pie Chart */}
            <div className="mb-6 flex justify-center">
              <h3 className="text-lg font-semibold text-gray-700">
                Stock Distribution
              </h3>
              <PieChart width={300} height={300}>
                <Pie
                  data={items}
                  dataKey="stock"
                  nameKey="size"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#10B981"
                  label
                >
                  {items.map((_, i) => (
                    <Cell key={`cell-${i}`} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </div>

            {/* Data Table */}
            <div className="overflow-x-auto">
              <h3 className="text-lg font-semibold text-gray-700">
                Data Table
              </h3>
              <table className="w-full bg-white rounded-lg shadow">
                <thead>
                  <tr className="bg-customTextColor-light text-white">
                    <th className="p-3 text-left text-sm">Size</th>
                    <th className="p-3 text-left text-sm">Stock</th>
                    <th className="p-3 text-left text-sm">Total Weight</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, i) => (
                    <tr
                      key={i}
                      className={
                        i % 2 === 0 ? "bg-gray-50" : "bg-customBgColor-bg"
                      }
                    >
                      <td className="p-3 border-b text-sm">{item.size}</td>
                      <td className="p-3 border-b text-sm">{item.stock}</td>
                      <td className="p-3 border-b text-sm">
                        {item.totalWeight}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
