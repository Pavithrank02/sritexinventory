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
import { nutBoltData } from "../../data.js";
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

const DemoBoltNutMachine = () => {
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
    const fetchData = () => {
      try {
        nutBoltData.map((data) => {
          setboltShow(data?.boltData);
          setNutShow(data?.nutData);
          setWasherShow(data?.washerData);
        });

        //
      } catch (error) {
        alert("Error fetching data:", error);
      }
    };
    fetchData();
  }, [nutBoltData]);

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

    // try {
    //   // Fetch the document
    //   const res = await axios.get("http://localhost:5000/api/maindata");
    //   console.log("Fetched document:", res.data);
    //   const document = res.data[0];

    //   console.log(document._id);

    //   if (!document) {
    //     throw new Error("Document not found");
    //   }

    //   // Prepare formData for backend
    //   const updatedData = {
    //     component_name: formData.component_name,
    //     boltsize: formData.boltsize,
    //     boltquantity: parseInt(formData.boltquantity, 10) || 0,
    //     nutSize: formData.nutSize,
    //     nutQuantity: parseInt(formData.nutQuantity, 10) || 0,
    //     washerSize: formData.washerSize,
    //     washerQuantity: parseInt(formData.washerQuantity, 10) || 0,
    //   };
    //   // Send the updated data to the backend
    //   const response = await axios.put(
    //     `http://localhost:5000/api/maindata/${document._id}`,
    //     updatedData
    //   );
    //   console.log("res", response);

    //   if (response.status === 200) {
    //     alert("Document updated successfully!");
    //     setboltShow(response.data.boltData); // Update state if necessary
    //     setFormData({
    //       component_name: "",
    //       boltsize: "",
    //       boltquantity: "",
    //       nutSize: "",
    //       nutQuantity: "",
    //       washerSize: "",
    //       washerQuantity: "",
    //     });
    //     handleCloseModal();
    //   } else {
    //     throw new Error("Failed to update document");
    //   }
    // } catch (error) {
    //   console.error("Error updating document:", error);
    //   alert(
    //     error.message || "Failed to update the document. Please try again."
    //   );
    // }
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
    // if (!selectedComponent) return;

    // const { index, type } = selectedComponent;
    // const sizeToDelete = fieldsToDelete[0]?.split("-")[1]; // Extract size from `fieldsToDelete`

    // try {
    //   // Make API call to backend
    //   const response = await fetch(
    //     "http://localhost:5000/api/maindata/delete-item",
    //     {
    //       method: "DELETE",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify({
    //         type,
    //         size: sizeToDelete,
    //         component_name: selectedComponent.component_name,
    //       }),
    //     }
    //   );

    //   if (response.ok) {
    //     // Update local state on success
    //     if (type === "bolt") {
    //       const updatedboltShow = boltShow.map((component, idx) =>
    //         idx === index
    //           ? {
    //               ...component,
    //               boltDetails: component.boltDetails?.filter(
    //                 (bolt) => !fieldsToDelete.includes(`bolt-${bolt.size}`)
    //               ),
    //             }
    //           : component
    //       );
    //       setboltShow(updatedboltShow);
    //     } else if (type === "nut") {
    //       const updatedNutShow = nutShow.map((nutComponent, idx) =>
    //         idx === index
    //           ? {
    //               ...nutComponent,
    //               nutDetails: nutComponent.nutDetails?.filter(
    //                 (nut) => !fieldsToDelete.includes(`nut-${nut.size}`)
    //               ),
    //             }
    //           : nutComponent
    //       );
    //       setNutShow(updatedNutShow);
    //     } else if (type === "washer") {
    //       const updatedWasherShow = washerShow.map((washerComponent, idx) =>
    //         idx === index
    //           ? {
    //               ...washerComponent,
    //               washerDetails: washerComponent.washerDetails?.filter(
    //                 (washer) =>
    //                   !fieldsToDelete.includes(`washer-${washer.size}`)
    //               ),
    //             }
    //           : washerComponent
    //       );
    //       setWasherShow(updatedWasherShow);
    //     }

    //     // Reset modal state
    //     setFieldsToDelete([]);
    //     setIsDeleteModalOpen(false);
    //   } else {
    //     console.error("Failed to delete item:", await response.json());
    //   }
    // } catch (error) {
    //   console.error("Error deleting item:", error);
    // }
    alert("items deleted");
  };

  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false);
    setSelectedComponent(null);
  };

  return (
    <div className="flex flex-row h-screen bg-customBgColor-bg ">
  {/* Sidebar */}
  <SidebarDemo />

  {/* Main Content */}
  <div className="flex-1 p-2 mt-12 sm:mt-1">
    {/* Horizontal Menu */}
    <HorizontalMenu />

    {/* Content Section */}
    <div className="p-4 mb-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
      >
        {/* Machine-based Component Details Card */}
        <Card className="col-span-full">
          <CardContent>
            <h2 className="text-xl sm:text-2xl font-bold mb-4 text-customTextColor">
              Machine-based Component Details
            </h2>

            <div className="p-4 space-y-4">
              {/* Add Button */}
              <Button
                className="w-full sm:w-auto"
                onClick={handleOpenModal}
              >
                Add boltShow
              </Button>

              {/* Modal for Adding Components */}
              <form onSubmit={handleAddOrUpdate}>
                <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                  <h2 className="text-xl sm:text-2xl font-bold mb-4 text-customTextColor">
                    Add Nut, Bolt, Washer
                  </h2>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Input
                      placeholder="Component Name"
                      name="component_name"
                      value={formData.component_name}
                      onChange={handleInputChange}
                      className="w-full sm:w-1/2 border border-customBorderColor"
                    />
                    <label className="block w-full sm:w-1/2 text-sm font-medium text-gray-700">
                      Bolt Size
                    </label>
                    <select
                      className="w-full sm:w-1/2 border border-customBorderColor rounded-lg p-2"
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
                    {/* Repeat similar for other inputs */}
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <button
                      type="submit"
                      className="bg-customBgColor p-2 rounded-lg text-customBgColor-bg w-full sm:w-auto"
                    >
                      Submit
                    </button>
                    <Button
                      variant="link"
                      onClick={handleCloseModal}
                      className="w-full sm:w-auto"
                    >
                      Cancel
                    </Button>
                  </div>
                </Modal>
              </form>
            </div>

            {/* Table for Bolt Details */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-customBorderColor bg-customBgColor-bg">
                <thead className="bg-customBgColor-bg">
                  <tr>
                    <th className="border border-customBorderColor p-2 text-sm sm:text-base">
                      Component Name
                    </th>
                    <th className="border border-customBorderColor p-2 text-sm sm:text-base">
                      Bolt Size
                    </th>
                    <th className="border border-customBorderColor p-2 text-sm sm:text-base">
                      Quantity
                    </th>
                    <th className="border border-customBorderColor p-2 text-sm sm:text-base">
                      Edit
                    </th>
                    <th className="border border-customBorderColor p-2 text-sm sm:text-base">
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
                        className="hover:bg-gray-100"
                      >
                        {boltIndex === 0 && (
                          <td
                            rowSpan={filteredBoltDetails.length}
                            className="border border-customBorderColor p-2 text-center align-middle text-sm sm:text-base"
                          >
                            {component.component_name}
                          </td>
                        )}
                        <td className="border border-customBorderColor p-2 text-sm sm:text-base">
                          {bolt.size}
                        </td>
                        <td className="border border-customBorderColor p-2 text-center text-sm sm:text-base">
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
            </div>
          </CardContent>
        </Card>

        {/* Bar Graphs for Components */}
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
export default DemoBoltNutMachine;
