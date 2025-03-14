import React, { useState, useEffect } from "react";
import Button from "./Button";
import Card, { CardContent } from "./Card";
import Input from "./Input";
import Modal from "./Modal";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";
import { SidebarDemo } from "./SideComponent.js";
import Plot from "react-plotly.js";
import { Chart as ChartJS, registerables } from "chart.js";
ChartJS.register(...registerables);

const boltSize = [
  "1x3/8",
  "3/4x3/8",
  "2x3/8",
  "1x5/16",
  "3/4x5/16",
  "1 1/2x5/16",
  "3/4x1/2",
  "11/2x1/2",
  "1/2x1/4",
  "3/4x1/4",
  "1x1/4",
];
const nutSize = ["3/8", "5/16", "1/2", "1/4"];
const washerSize = ["3/8", "5/16", "1/2", "1/4"];

const MachineDashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [components, setComponents] = useState([]);
  const [nutShow, setNutShow] = useState([]);
  const [washerShow, setWasherShow] = useState([]);
  const [formData, setFormData] = useState({
    component_name: "",
    boltsize: "",
    boltquantity: "",
    nutSize: "",
    nutQuantity: "",
    washerSize: "",
    washerQuantity: "",
    boltDetails: boltSize.map((size) => ({ size, quantity: 0 })),
    nutDetails: nutSize.map((size) => ({ size, quantity: 0 })),
    washerDetails: washerSize.map((size) => ({ size, quantity: 0 })),
  });
  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    const nutData = [
      {
        nutDetails: [
          { size: "5/16", quantity: 780 },
          { size: "3/8", quantity: 530 },
          { size: "1/4", quantity: 1350 },
          { size: "1/2", quantity: 80 },
        ],
      },
    ];
    const washerData = [
      {
        washerDetails: [
          { size: "5/16", quantity: 500 },
          { size: "3/8", quantity: 500 },
          { size: "1/4", quantity: 500 },
          { size: "1/2", quantity: 100 },
        ],
      },
    ];
    const boltData = [
      {
        component_name: "Belt Conveyor",
        boltDetails: [
          { size: "3/4x5/16", quantity: 120 },
          { size: "1x5/16", quantity: 100 },
          { size: "3/4x 1/4", quantity: 60 },
        ],
      },
      {
        component_name: "Reserve Box",
        boltDetails: [
          { size: "1x3/8", quantity: 24 },
          { size: "3/4x3/8", quantity: 30 },
        ],
      },
      {
        component_name: "Trolly",
        boltDetails: [
          { size: "1x3/8", quantity: 88 },
          { size: "3/4x3/8", quantity: 24 },
          { size: "3/4x5/16", quantity: 16 },
          { size: "1x5/16", quantity: 28 },
          { size: "11/2x1/2", quantity: 8 },
          { size: "1/2 x 1/4", quantity: 50 },
        ],
      },
      {
        component_name: "Track + Post",
        boltDetails: [
          { size: "1x3/8", quantity: 70 },
          { size: "3/4x1/2", quantity: 35 },
        ],
      },
      {
        component_name: "Blower - 25 Hp",
        boltDetails: [{ size: "1x3/8", quantity: 20 }],
      },
      {
        component_name: "Blower - 5 Hp",
        boltDetails: [
          { size: "3/4x3/8", quantity: 12 },
          { size: "1x5/16", quantity: 16 },
          { size: "11/2x1/2", quantity: 32 },
        ],
      },
      {
        component_name: "Kappas Structure + Platform",
        boltDetails: [
          { size: "1x3/8", quantity: 50 },
          { size: "1 1/2x3/8", quantity: 25 },
          { size: "11/2x1/2", quantity: 16 },
        ],
      },
      {
        component_name: "Lint Structure",
        boltDetails: [{ size: "1x3/8", quantity: 70 }],
      },
      {
        component_name: "Air Separator",
        boltDetails: [
          { size: "1x3/8", quantity: 32 },
          { size: "3/4x3/8", quantity: 4 },
          { size: "3/4x5/16", quantity: 36 },
          { size: "1x5/16", quantity: 54 },
          { size: "1/2x5/16", quantity: 54 },
          { size: "11/2x1/2", quantity: 16 },
          { size: "1/2 x 1/4", quantity: 20 },
          { size: "3/4x 1/4", quantity: 30 },
          { size: "1x1/4", quantity: 20 },
        ],
      },
      {
        component_name: "Lint Air separator",
        boltDetails: [
          { size: "1x3/8", quantity: 32 },
          { size: "3/4x3/8", quantity: 4 },
          { size: "3/4x5/16", quantity: 36 },
          { size: "1x5/16", quantity: 54 },
          { size: "1/2x5/16", quantity: 54 },
          { size: "11/2x1/2", quantity: 8 },
          { size: "1/2 x 1/4", quantity: 20 },
          { size: "3/4x 1/4", quantity: 30 },
          { size: "1x1/4", quantity: 20 },
        ],
      },
      {
        component_name: "lint Box",
        boltDetails: [{ size: "1/2 x 1/4", quantity: 120 }],
      },
      {
        component_name: "Change Over",
        boltDetails: [
          { size: "1x3/8", quantity: 30 },
          { size: "1x5/16", quantity: 18 },
          { size: "1x1/4", quantity: 8 },
        ],
      },
      {
        component_name: "Cyclone 2 nos",
        boltDetails: [{ size: "1x1/4", quantity: 18 }],
      },
      {
        component_name: "Lint Bypass",
        boltDetails: [{ size: "3/4x5/16", quantity: 60 }],
      },
      {
        component_name: "List Piston Box",
        boltDetails: [
          { size: "1/2 x 1/4", quantity: 200 },
          { size: "3/4x 1/4", quantity: 240 },
        ],
      },
      {
        component_name: "Pipe line",
        boltDetails: [
          { size: "3/4x5/16", quantity: 200 },
          { size: "1x1/4", quantity: 500 },
        ],
      },
      {
        component_name: "Seed Box",
        boltDetails: [{ size: "1x5/16", quantity: 20 }],
      },
      {
        component_name: "Total",
        boltDetails: [
          { size: "1x3/8", quantity: 450 },
          { size: "3/4x3/8", quantity: 74 },
          { size: "1 1/2x3/8", quantity: 25 },
          { size: "2x3/8", quantity: 35 },
          { size: "3/4x5/16", quantity: 480 },
          { size: "1x5/16", quantity: 300 },
          { size: "1/2x5/16", quantity: 110 },
          { size: "3/4x1/2", quantity: 35 },
          { size: "11/2x1/2", quantity: 60 },
          { size: "1/2 x 1/4", quantity: 410 },
          { size: "3/4x 1/4", quantity: 360 },
          { size: "1x1/4", quantity: 600 },
        ],
      },
    ];

    setComponents(boltData);
    setNutShow(nutData);
    setWasherShow(washerData);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleBoltQuantityChange = (index, quantity) => {
    const updatedBoltDetails = [...formData.boltDetails];
    updatedBoltDetails[index].quantity = parseInt(quantity, 10) || 0;
    setFormData({ ...formData, boltDetails: updatedBoltDetails });
  };
  // Pie Chart Data for Washer Quantities
  const bolt3DChartData = {
    x: components.map((bolt) => bolt.component_name),
    y: components.map((bolt) => bolt.quantity),
    z: components.map((bolt) => bolt.quantity), // For visual depth
    type: "bar3d", // Using Plotly's 3D bar chart
  };

  // Data for Heatmap (Nut and Washer Sizes vs Quantities)
  const heatmapData = [
    {
      x: ["Nut", "Washer"],
      y: nutShow.map((nut) => nut.size),
      z: [
        nutShow.map((nut) => nut.quantity),
        washerShow.map((washer) => washer.quantity),
      ],
      type: "heatmap",
      colorscale: "Viridis",
    },
  ];

  const handleAddOrUpdate = () => {
    if (!formData.component_name) {
      alert("Component Name is required.");
      return;
    }

    const updatedBoltDetails = formData.boltDetails.filter(
      (bolt) => bolt.quantity > 0
    );

    if (editingIndex !== null) {
      // Update existing component
      const updatedComponents = [...components];
      updatedComponents[editingIndex] = {
        ...formData,
        boltDetails: updatedBoltDetails,
      };
      setComponents(updatedComponents);
      setEditingIndex(null);
    } else {
      // Add new component
      setComponents([
        ...components,
        { ...formData, boltDetails: updatedBoltDetails },
      ]);
    }

    // Reset form
    setFormData({
      component_name: "",
      boltsize: "",
      boltquantity: "",
      nutSize: "",
      nutQuantity: "",
      washerSize: "",
      washerQuantity: "",
      boltDetails: boltSize.map((size) => ({ size, quantity: 0 })),
      nutDetails: nutSize.map((size) => ({ size, quantity: 0 })),
      washerDetails: washerSize.map((size) => ({ size, quantity: 0 })),
    });
    setIsModalOpen(false);
  };
  const handleOpenModal = () => setIsModalOpen(true);

  const handleCloseModal = () => setIsModalOpen(false);

  const handleEdit = (index) => {
    setFormData(components[index]);
    setEditingIndex(index);
    setIsModalOpen(true);
  };

  const handleDelete = (index) => {
    const updatedComponents = components.filter((_, i) => i !== index);
    setComponents(updatedComponents);
  };

  return (
    <div className="flex flex-row h-screen bg-customBgColor-bg dark:bg-neutral-900">
      <SidebarDemo />
      <div className="flex-1 p-2  ">
        <div className="p-4 ">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3  "
          >
            <Card className="col-span-full md:col-span-full ">
              <CardContent>
                <h2 className="text-xl font-bold mb-4 text-customTextColor">
                  Machine based Component Details
                </h2>

                <div className="p-4 space-y-4">
                  <Button onClick={handleOpenModal}>Add Components</Button>

                  <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                    <h2 className="text-xl font-bold mb-4 text-customTextColor">
                      Add Nut, Bolt, Washer
                    </h2>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <Input
                        placeholder="Component Name"
                        name="component_name"
                        value={formData.component_name}
                        onChange={handleInputChange}
                        className="border border-customBorderColor"
                      />
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Bolt Size
                      </label>
                      <select
                        className="border border-customBorderColor rounded-lg p-2 w-full"
                        value={formData.boltsize}
                        onChange={handleInputChange}
                        name="boltsize"
                        placeholder="bolt size"
                      >
                        {boltSize.map((size, i) => (
                          <option key={i} value={size}>
                            {size}
                          </option>
                        ))}
                      </select>
                      <Input
                        placeholder="bolt quantity"
                        type="number"
                        name="boltquantity"
                        value={formData.boltquantity}
                        onChange={handleInputChange}
                        className="border border-customBorderColor"
                      />
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Nut
                      </label>
                      <select
                        className="border border-customBorderColor rounded-lg p-2 w-full"
                        value={formData.nutSize}
                        onChange={handleInputChange}
                        name="size"
                      >
                        {nutSize.map((size, i) => (
                          <option key={i} value={size}>
                            {size}
                          </option>
                        ))}
                      </select>
                      <Input
                        placeholder="nut Quantity"
                        type="number"
                        name="nutQuantity"
                        value={formData.nutQuantity}
                        onChange={handleInputChange}
                        className="border border-customBorderColor"
                      />
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Washer
                      </label>
                      <select
                        className="border border-customBorderColor rounded-lg p-2 w-full"
                        value={formData.washerSize}
                        onChange={handleInputChange}
                        name="washerSize"
                        placeholder="washer Size"
                      >
                        {washerSize.map((size, i) => (
                          <option key={i} value={size}>
                            {size}
                          </option>
                        ))}
                      </select>
                      <Input
                        placeholder="washer Quantity"
                        type="number"
                        name="washerQuantity"
                        value={formData.washerQuantity}
                        onChange={handleInputChange}
                        className="border border-customBorderColor"
                      />
                    </div>

                    <div className="flex gap-2 ">
                      <Button
                        onClick={handleAddOrUpdate}
                        className="bg-customBgColor"
                      >
                        {editingIndex !== null ? "Update" : "Add"}
                      </Button>
                      <Button variant="link" onClick={handleCloseModal}>
                        Cancel
                      </Button>
                    </div>
                  </Modal>
                </div>

                <table className="w-full border-collapse border border-customBorderColor bg-customBgColor-bg">
                  <thead className="bg-customBgColor-bg">
                    <tr className="bg-customBgColor-bg">
                      <th className="border border-customBorderColor p-2 ">
                        Component Name
                      </th>
                      <th className="border border-customBorderColor p-2 ">
                        Bolt Size
                      </th>
                      <th className="border border-customBorderColor p-2 ">
                        Quantity
                      </th>
                      <th className="border border-customBorderColor p-2 ">
                        Edit
                      </th>
                      <th className="border border-customBorderColor p-2 ">
                        Delete
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {components.map((component, index) => {
                      const filteredBoltDetails = component.boltDetails.filter(
                        (bolt) => bolt.quantity > 0
                      );
                      return filteredBoltDetails.map((bolt, boltIndex) => (
                        <tr
                          key={`${index}-${boltIndex}`}
                          className="hover:bg-gray-100 "
                        >
                          {boltIndex === 0 && (
                            <td
                              rowSpan={filteredBoltDetails.length}
                              className="border border-customBorderColor p-2 text-center align-middle"
                            >
                              {component.component_name}
                            </td>
                          )}
                          <td className="border border-customBorderColor p-2">
                            {bolt.size}
                          </td>
                          <td className="border border-customBorderColor p-2 text-center">
                            {bolt.quantity}
                          </td>
                          {boltIndex === 0 && (
                            <>
                              <td
                                rowSpan={filteredBoltDetails.length}
                                className="border border-customBorderColor p-2 text-center align-middle"
                              >
                                <Button
                                  variant="link"
                                  onClick={() => handleEdit(index)}
                                >
                                  Edit
                                </Button>
                              </td>
                              <td
                                rowSpan={filteredBoltDetails.length}
                                className="border border-customBorderColor p-2 text-center align-middle"
                              >
                                <Button
                                  variant="link"
                                  className="text-red-500"
                                  onClick={() => handleDelete(index)}
                                >
                                  Delete
                                </Button>
                              </td>
                            </>
                          )}
                        </tr>
                      ));
                    })}
                  </tbody>
                </table>
              </CardContent>
            </Card>
            <Card className="col-span-full md:col-span-full">
              <CardContent>
                <table className="w-full border-collapse border border-customBorderColor bg-customBgColor-bg">
                  <thead>
                    <tr>
                      <th className="border border-customBorderColor p-2">
                        Nut Size
                      </th>
                      <th className="border border-customBorderColor p-2">
                        Quantity
                      </th>
                      <th className="border border-customBorderColor p-2">
                        Edit
                      </th>
                      <th className="border border-customBorderColor p-2">
                        Delete
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {nutShow.map((component, index) => {
                      const filteredNutDetails = component.nutDetails.filter(
                        (nut) => nut.quantity > 0
                      );
                      return filteredNutDetails.map((nut, nutIndex) => (
                        <tr
                          key={`${index}-${nutIndex}`}
                          className="hover:bg-gray-100"
                        >
                          <td className="border border-customBorderColor p-2">
                            {nut.size}
                          </td>
                          <td className="border border-customBorderColor p-2 text-center">
                            {nut.quantity}
                          </td>
                          {nutIndex === 0 && (
                            <>
                              <td
                                rowSpan={filteredNutDetails.length}
                                className="border border-customBorderColor p-2 text-center align-middle"
                              >
                                <Button
                                  variant="link"
                                  onClick={() => handleEdit(index)}
                                >
                                  Edit
                                </Button>
                              </td>
                              <td
                                rowSpan={filteredNutDetails.length}
                                className="border border-customBorderColor p-2 text-center align-middle"
                              >
                                <Button
                                  variant="link"
                                  className="text-red-500"
                                  onClick={() => handleDelete(index)}
                                >
                                  Delete
                                </Button>
                              </td>
                            </>
                          )}
                        </tr>
                      ));
                    })}
                  </tbody>
                </table>
              </CardContent>
            </Card>

            <Card className="col-span-full md:col-span-full">
              <CardContent>
                <table className="w-full border-collapse border border-customBorderColor bg-customBgColor-bg">
                  <thead>
                    <tr>
                      <th className="border border-customBorderColor p-2">
                        Washer Size
                      </th>
                      <th className="border border-customBorderColor p-2">
                        Quantity
                      </th>
                      <th className="border border-customBorderColor p-2">
                        Edit
                      </th>
                      <th className="border border-customBorderColor p-2">
                        Delete
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {washerShow.map((component, index) => {
                      const filteredWasherDetails =
                        component.washerDetails.filter(
                          (washer) => washer.quantity > 0
                        );
                      return filteredWasherDetails.map(
                        (washer, washerIndex) => (
                          <tr
                            key={`${index}-${washerIndex}`}
                            className="hover:bg-gray-100"
                          >
                            <td className="border border-customBorderColor p-2">
                              {washer.size}
                            </td>
                            <td className="border border-customBorderColor p-2 text-center">
                              {washer.quantity}
                            </td>
                            {washerIndex === 0 && (
                              <>
                                <td
                                  rowSpan={filteredWasherDetails.length}
                                  className="border border-customBorderColor p-2 text-center align-middle"
                                >
                                  <Button
                                    variant="link"
                                    onClick={() => handleEdit(index)}
                                  >
                                    Edit
                                  </Button>
                                </td>
                                <td
                                  rowSpan={filteredWasherDetails.length}
                                  className="border border-customBorderColor p-2 text-center align-middle"
                                >
                                  <Button
                                    variant="link"
                                    className="text-red-500"
                                    onClick={() => handleDelete(index)}
                                  >
                                    Delete
                                  </Button>
                                </td>
                              </>
                            )}
                          </tr>
                        )
                      );
                    })}
                  </tbody>
                </table>
              </CardContent>
            </Card>
            <Card className="col-span-1 md:col-span-2">
              <CardContent>
                <h2 className="text-xl font-bold mb-4">
                  Component Quantities Overview
                </h2>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart
                    data={components}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <XAxis dataKey="component_name" tick={{ fontSize: 12 }} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar
                      dataKey={(entry) =>
                        entry.boltDetails.reduce(
                          (sum, bolt) => sum + bolt.quantity,
                          0
                        )
                      }
                      fill="#8884d8"
                      name="Total Quantity"
                    />
                  </BarChart>
                  
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>
        </div>
        <div style={{ padding: "20px" }}>
      <h1>Advanced Dashboard</h1>
      <div style={{ marginBottom: "50px" }}>
        <h2>3D Bar Chart: Bolt Quantities</h2>
        <Plot
          data={[bolt3DChartData]}
          layout={{
            title: "Bolt Quantities by Component",
            scene: {
              xaxis: { title: "Components" },
              yaxis: { title: "Quantities" },
              zaxis: { title: "Depth (Quantities)" },
            },
          }}
        />
      </div>
      <div style={{ marginBottom: "50px" }}>
        <h2>Heatmap: Nut and Washer Quantities</h2>
        <Plot
          data={heatmapData}
          layout={{
            title: "Heatmap of Nut and Washer Sizes vs Quantities",
            xaxis: { title: "Type" },
            yaxis: { title: "Sizes" },
          }}
        />
      </div>
    </div>
      
      </div>
    </div>
  );
};

export default MachineDashboard;
