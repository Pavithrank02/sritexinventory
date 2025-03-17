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
import axios from "axios";
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
  const [updated, setUpdated] = useState([]);
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
    const fetchData = async () => {
      try {
        const res = await axios
          .get("http://localhost:5000/api/maindata")
          .then((resp) => {
            console.log("inside", resp.data);
            resp.data.map((data) => {
              setComponents(data?.boltData);
              setNutShow(data?.nutData);
              setWasherShow(data?.washerData);
            });
          });

        //
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAddOrUpdate = async (event) => {
    event.preventDefault();
    const requiredFields = {
      component_name: "Component Name",
      boltsize: "Bolt Size",
      boltquantity: "Bolt Quantity",
      nutSize: "Nut Size",
      nutQuantity: "Nut Quantity",
      washerSize: "Washer Size",
      washerQuantity: "Washer Quantity",
    };
    
    for (const field in requiredFields) {
      if (!formData[field] || formData[field].trim() === "") {
        alert(`${requiredFields[field]} is required.`);
        return;
      }
    }
  
    try {
      // Fetch the document
      const res = await axios.get("http://localhost:5000/api/maindata");
      console.log("Fetched document:", res.data);
      const document = res.data[0];

      console.log(document._id)

     
  
      if (!document) {
        throw new Error("Document not found");
      }
  
      // Prepare formData for backend
      const updatedData = {
        component_name: formData.component_name,
        boltsize: formData.boltsize,
        boltquantity: parseInt(formData.boltquantity, 10) || 0,
        nutSize: formData.nutSize,
        nutQuantity: parseInt(formData.nutQuantity, 10) || 0,
        washerSize: formData.washerSize,
        washerQuantity: parseInt(formData.washerQuantity, 10) || 0,
      };
      console.log(`PUT URL: http://localhost:5000/api/maindata/${document._id}`);
      // Send the updated data to the backend
      const response = await axios.put(
        `http://localhost:5000/api/maindata/${document._id}`,
        updatedData
      );
      console.log("res",response)
  
      if (response.status === 200) {
        alert("Document updated successfully!");
        setComponents(response.data.boltData); // Update state if necessary
        handleCloseModal();
      } else {
        throw new Error("Failed to update document");
      }
    } catch (error) {
      console.error("Error updating document:", error);
      alert(error.message || "Failed to update the document. Please try again.");
    }
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
                  <form onSubmit={handleAddOrUpdate}>
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
                          name="nutSize"
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
                        <button type="submit" className="bg-customBgColor">
                          Submit
                        </button>
                        <Button variant="link" onClick={handleCloseModal}>
                          Cancel
                        </Button>
                      </div>
                    </Modal>
                  </form>
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
                    {components?.map((component, index) => {
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
                    {nutShow?.map((component, index) => {
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
                    {washerShow?.map((component, index) => {
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
      </div>
    </div>
  );
};
export default MachineDashboard;
