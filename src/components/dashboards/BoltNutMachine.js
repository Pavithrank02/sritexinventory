import React, { useState, useEffect } from "react";
import Button from "../Button.js";
import Card, { CardContent } from "../Card.js";
import Input from "../Input.js";
import Modal from "../Modal.js";
import { motion } from "framer-motion";
import { SidebarDemo } from "../SideComponent.js";
import { Chart as ChartJS, registerables } from "chart.js";
import axios from "axios";
import BarGraph from "../BarGraph.js";
import HorizontalMenu from "../HorizontalMenu.js";
ChartJS.register(...registerables);

const boltSize = [
  "Select Size",
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
const nutSize = ["Select Size", "3/8", "5/16", "1/2", "1/4"];
const washerSize = ["Select Size", "3/8", "5/16", "1/2", "1/4"];

const BoltNutMachine = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [boltShow, setboltShow] = useState([]);
  const [nutShow, setNutShow] = useState([]);
  const [washerShow, setWasherShow] = useState([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [fieldsToDelete, setFieldsToDelete] = useState([]);
  const [selectedComponent, setSelectedComponent] = useState(null);
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
        await axios.get("http://localhost:5000/api/maindata").then((resp) => {
          resp.data.map((data) => {
            setboltShow(data?.boltData);
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
  useEffect(() => {
    console.log("Updated boltShow:", boltShow);
  }, [boltShow]);
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

      console.log(document._id);

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
      // Send the updated data to the backend
      const response = await axios.put(
        `http://localhost:5000/api/maindata/${document._id}`,
        updatedData
      );
      console.log("res", response);

      if (response.status === 200) {
        alert("Document updated successfully!");
        setboltShow(response.data.boltData); // Update state if necessary
        setFormData({
          component_name: "",
          boltsize: "",
          boltquantity: "",
          nutSize: "",
          nutQuantity: "",
          washerSize: "",
          washerQuantity: "",
        });
        handleCloseModal();
      } else {
        throw new Error("Failed to update document");
      }
    } catch (error) {
      console.error("Error updating document:", error);
      alert(
        error.message || "Failed to update the document. Please try again."
      );
    }
  };

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  const handleEdit = (index) => {
    setFormData(boltShow[index]);
    setEditingIndex(index);
    setIsModalOpen(true);
  };
  const handleFieldSelection = (field) => {
    setFieldsToDelete(
      (prev) =>
        prev.includes(field)
          ? prev.filter((f) => f !== field) // Deselect if already selected
          : [...prev, field] // Add if not selected
    );
  };

  const handleDeleteClick = (index, type) => {
    let componentToDelete = null;

    if (type === "bolt") {
      componentToDelete = { ...boltShow[index], index, type };
      console.log("bolt");
    } else if (type === "nut") {
      componentToDelete = { ...nutShow[index], index, type };
      console.log("nut");
    } else if (type === "washer") {
      componentToDelete = { ...washerShow[index], index, type };
      console.log("washer");
    }

    setSelectedComponent(componentToDelete);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedComponent) return;

    const { index, type } = selectedComponent;
    const sizeToDelete = fieldsToDelete[0]?.split("-")[1]; // Extract size from `fieldsToDelete`

    try {
      // Make API call to backend
      const response = await fetch(
        "http://localhost:5000/api/maindata/delete-item",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            type,
            size: sizeToDelete,
            component_name: selectedComponent.component_name,
          }),
        }
      );

      if (response.ok) {
        // Update local state on success
        if (type === "bolt") {
          const updatedboltShow = boltShow.map((component, idx) =>
            idx === index
              ? {
                  ...component,
                  boltDetails: component.boltDetails?.filter(
                    (bolt) => !fieldsToDelete.includes(`bolt-${bolt.size}`)
                  ),
                }
              : component
          );
          setboltShow(updatedboltShow);
        } else if (type === "nut") {
          const updatedNutShow = nutShow.map((nutComponent, idx) =>
            idx === index
              ? {
                  ...nutComponent,
                  nutDetails: nutComponent.nutDetails?.filter(
                    (nut) => !fieldsToDelete.includes(`nut-${nut.size}`)
                  ),
                }
              : nutComponent
          );
          setNutShow(updatedNutShow);
        } else if (type === "washer") {
          const updatedWasherShow = washerShow.map((washerComponent, idx) =>
            idx === index
              ? {
                  ...washerComponent,
                  washerDetails: washerComponent.washerDetails?.filter(
                    (washer) =>
                      !fieldsToDelete.includes(`washer-${washer.size}`)
                  ),
                }
              : washerComponent
          );
          setWasherShow(updatedWasherShow);
        }

        // Reset modal state
        setFieldsToDelete([]);
        setIsDeleteModalOpen(false);
      } else {
        console.error("Failed to delete item:", await response.json());
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false);
    setSelectedComponent(null);
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-customBgColor-bg dark:bg-neutral-900">
      <SidebarDemo />
      <div className="flex-1 p-4 sm:mt-10">
        <HorizontalMenu />
        <div className="p-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          >
            {/* Machine Details Section */}
            <Card className="col-span-full">
              <CardContent>
                <h2 className="text-xl font-bold mb-4 text-customTextColor">
                  Machine based Component Details
                </h2>
                <div className="space-y-4">
                  <Button onClick={handleOpenModal}>Add Component</Button>
                  <form onSubmit={handleAddOrUpdate}>
                    <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                      <h2 className="text-xl font-bold mb-4 text-customTextColor">
                        Add Nut, Bolt, Washer
                      </h2>
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <Input
                          placeholder="Component Name"
                          name="component_name"
                          value={formData.component_name}
                          onChange={handleInputChange}
                          className="border border-customBorderColor"
                        />
                        <select
                          className="border border-customBorderColor rounded-lg p-2"
                          value={formData.boltsize}
                          onChange={handleInputChange}
                          name="boltsize"
                        >
                          {boltSize.map((size, i) => (
                            <option key={i} value={size}>
                              {size}
                            </option>
                          ))}
                        </select>
                        <Input
                          placeholder="Bolt Quantity"
                          type="number"
                          name="boltquantity"
                          value={formData.boltquantity}
                          onChange={handleInputChange}
                          className="border border-customBorderColor"
                        />
                        <select
                          className="border border-customBorderColor rounded-lg p-2"
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
                          placeholder="Nut Quantity"
                          type="number"
                          name="nutQuantity"
                          value={formData.nutQuantity}
                          onChange={handleInputChange}
                          className="border border-customBorderColor"
                        />
                        <select
                          className="border border-customBorderColor rounded-lg p-2"
                          value={formData.washerSize}
                          onChange={handleInputChange}
                          name="washerSize"
                        >
                          {washerSize.map((size, i) => (
                            <option key={i} value={size}>
                              {size}
                            </option>
                          ))}
                        </select>
                        <Input
                          placeholder="Washer Quantity"
                          type="number"
                          name="washerQuantity"
                          value={formData.washerQuantity}
                          onChange={handleInputChange}
                          className="border border-customBorderColor"
                        />
                      </div>
                      <div className="flex gap-4 mt-4">
                        <Button type="submit" className="bg-customBgColor p-2">
                          Submit
                        </Button>
                        <Button variant="link" onClick={handleCloseModal}>
                          Cancel
                        </Button>
                      </div>
                    </Modal>
                  </form>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-customBorderColor">
                    <thead>
                      <tr>
                        <th className="border p-2">Component Name</th>
                        <th className="border p-2">Bolt Size</th>
                        <th className="border p-2">Quantity</th>
                        <th className="border p-2">Edit</th>
                        <th className="border p-2">Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      {boltShow?.map((component, index) => {
                        const filteredBoltDetails =
                          component.boltDetails.filter(
                            (bolt) => bolt.quantity > 0
                          );
                        return filteredBoltDetails.map((bolt, boltIndex) => (
                          <tr key={`${index}-${boltIndex}`}>
                            {boltIndex === 0 && (
                              <td
                                rowSpan={filteredBoltDetails.length}
                                className="border p-2"
                              >
                                {component.component_name}
                              </td>
                            )}
                            <td className="border p-2">{bolt.size}</td>
                            <td className="border p-2">{bolt.quantity}</td>
                            {boltIndex === 0 && (
                              <>
                                <td
                                  rowSpan={filteredBoltDetails.length}
                                  className="border p-2"
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
                                  className="border p-2"
                                >
                                  <Button
                                    variant="link"
                                    className="text-red-500"
                                    onClick={() =>
                                      handleDeleteClick(index, "bolt")
                                    }
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
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
export default BoltNutMachine;
