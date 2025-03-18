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
                  <Button onClick={handleOpenModal}>Add boltShow</Button>
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
                        <button
                          type="submit"
                          className="bg-customBgColor p-2 rounded-lg text-customBgColor-bg"
                        >
                          Submit
                        </button>
                        <Button variant="link" onClick={handleCloseModal}>
                          Cancel
                        </Button>
                      </div>
                    </Modal>
                  </form>
                </div>
                <Modal isOpen={isDeleteModalOpen} onClose={handleCancelDelete}>
                  <h2 className="text-xl font-bold mb-4">
                    Select Fields to Delete
                  </h2>
                  {selectedComponent && (
                    <div>
                      <p>Component Name: {selectedComponent.component_name}</p>
                      <div className="mt-4">
                        <h3 className="font-semibold">Bolt Details:</h3>
                        {selectedComponent.boltDetails?.map((bolt) => (
                          <div
                            key={bolt.size}
                            className="flex items-center gap-2"
                          >
                            <input
                              type="checkbox"
                              id={`bolt-${bolt.size}`}
                              onChange={() =>
                                handleFieldSelection(`bolt-${bolt.size}`)
                              }
                              checked={fieldsToDelete.includes(
                                `bolt-${bolt.size}`
                              )}
                            />
                            <label htmlFor={`bolt-${bolt.size}`}>
                              Size: {bolt.size}, Quantity: {bolt.quantity}
                            </label>
                          </div>
                        ))}
                        <h3 className="font-semibold mt-4">Nut Details:</h3>
                        {selectedComponent.nutDetails?.map((nut) => (
                          <div
                            key={nut.size}
                            className="flex items-center gap-2"
                          >
                            <input
                              type="checkbox"
                              id={`nut-${nut.size}`}
                              onChange={() =>
                                handleFieldSelection(`nut-${nut.size}`)
                              }
                              checked={fieldsToDelete.includes(
                                `nut-${nut.size}`
                              )}
                            />
                            <label htmlFor={`nut-${nut.size}`}>
                              Size: {nut.size}, Quantity: {nut.quantity}
                            </label>
                          </div>
                        ))}
                        <h3 className="font-semibold mt-4">Washer Details:</h3>
                        {selectedComponent.washerDetails?.map((washer) => (
                          <div
                            key={washer.size}
                            className="flex items-center gap-2"
                          >
                            <input
                              type="checkbox"
                              id={`washer-${washer.size}`}
                              onChange={() =>
                                handleFieldSelection(`washer-${washer.size}`)
                              }
                              checked={fieldsToDelete.includes(
                                `washer-${washer.size}`
                              )}
                            />
                            <label htmlFor={`washer-${washer.size}`}>
                              Size: {washer.size}, Quantity: {washer.quantity}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  <div className="flex gap-2 mt-4">
                    <button
                      className="bg-red-500 text-white p-2 rounded"
                      onClick={handleConfirmDelete}
                      disabled={fieldsToDelete.length === 0}
                    >
                      Delete Selected
                    </button>
                    <button
                      className="bg-gray-300 p-2 rounded"
                      onClick={handleCancelDelete}
                    >
                      Cancel
                    </button>
                  </div>
                </Modal>

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
                    {boltShow?.map((component, index) => {
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
                                  onClick={() =>
                                    handleDeleteClick(index, "nut")
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
                        component.washerDetails?.filter(
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
                                  rowSpan={filteredWasherDetails?.length}
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
                                    onClick={() =>
                                      handleDeleteClick(index, "washer")
                                    }
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
            <BarGraph
              data={boltShow}
              name={"Bolt Component Quantities Overview"}
              detailKey="boltDetails"
              getLabel={(entry) => entry.component_name}
            />
            <BarGraph
              data={nutShow}
              name={"Nut Component Quantities Overview"}
              detailKey="nutDetails"
              getLabel={(_, index) => `Nut ${index + 1}`}
            />
            <BarGraph
              data={washerShow}
              name={"Washer Component Quantities Overview"}
              detailKey="washerDetails"
              getLabel={(_, index) => `Washer ${index + 1}`}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};
export default BoltNutMachine;
