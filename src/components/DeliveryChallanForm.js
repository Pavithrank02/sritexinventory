import React, { useState } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import logoBase64 from "../assets/images/logoBase64.js";
import { SidebarDemo } from "./SideComponent";

const DeliveryChallanForm = () => {
  const [formData, setFormData] = useState({
    address: "",
    recipient: "",
    gstin: "",
    deliveryNote: "",
    dcNumber: "",
    dcDate: "",
    poNumber: "",
    poDate: "",
    modeOfDispatch: "",
    items: [{ description: "", quantity: "" }],
  });

  const handleChange = (e, index = null) => {
    const { name, value } = e.target;
    if (index !== null) {
      const items = [...formData.items];
      items[index][name] = value;
      setFormData({ ...formData, items });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const addItem = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { description: "", quantity: "" }],
    });
  };

  const generatePDF = () => {
    const doc = new jsPDF();

    // Add logo
   // Replace with your base64 logo
    doc.addImage(logoBase64, "PNG", 10, 10, 50, 20);

    // Add header
    doc.setFontSize(12);
    doc.text("Delivery Challan", 80, 20);

    // Add address and recipient details
    doc.setFontSize(10);
    doc.text(`Address: ${formData.address}`, 10, 40);
    doc.text(`Recipient: ${formData.recipient}`, 10, 50);
    doc.text(`GSTIN: ${formData.gstin}`, 10, 60);

    // Add document details
    doc.text(`Delivery Note: ${formData.deliveryNote}`, 120, 40);
    doc.text(`D.C. No: ${formData.dcNumber}`, 120, 50);
    doc.text(`D.C. Date: ${formData.dcDate}`, 120, 60);
    doc.text(`P.O. No: ${formData.poNumber}`, 120, 70);
    doc.text(`P.O. Date: ${formData.poDate}`, 120, 80);
    doc.text(`Mode Of Dispatch: ${formData.modeOfDispatch}`, 120, 90);

    // Add items table
    const tableData = formData.items.map((item, index) => [
      index + 1,
      item.description,
      item.quantity,
    ]);

    doc.autoTable({
      head: [["Sl. No", "Description", "Quantity"]],
      body: tableData,
      startY: 100,
    });

    // Save the PDF
    doc.save("DeliveryChallan.pdf");
  };

  return (
    <div className="flex flex-row h-screen bg-gray-50 dark:bg-neutral-900">
      <SidebarDemo />
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-200">
          Delivery Challan Form
        </h1>

        {/* Address and Recipient Details */}
        <form className="space-y-6 bg-white dark:bg-neutral-800 p-6 rounded-2xl shadow-md border dark:border-neutral-700 max-w-3xl">
          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
              Address
            </label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full border-gray-300 dark:border-neutral-600 dark:bg-neutral-800 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
            />
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
              Recipient
            </label>
            <input
              name="recipient"
              value={formData.recipient}
              onChange={handleChange}
              className="w-full border-gray-300 dark:border-neutral-600 dark:bg-neutral-800 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
              GSTIN
            </label>
            <input
              name="gstin"
              value={formData.gstin}
              onChange={handleChange}
              className="w-full border-gray-300 dark:border-neutral-600 dark:bg-neutral-800 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Document Details */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
                Delivery Note
              </label>
              <input
                name="deliveryNote"
                value={formData.deliveryNote}
                onChange={handleChange}
                className="w-full border-gray-300 dark:border-neutral-600 dark:bg-neutral-800 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
                D.C. No
              </label>
              <input
                name="dcNumber"
                value={formData.dcNumber}
                onChange={handleChange}
                className="w-full border-gray-300 dark:border-neutral-600 dark:bg-neutral-800 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
                D.C. Date
              </label>
              <input
                name="dcDate"
                type="date"
                value={formData.dcDate}
                onChange={handleChange}
                className="w-full border-gray-300 dark:border-neutral-600 dark:bg-neutral-800 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
                P.O. No
              </label>
              <input
                name="poNumber"
                value={formData.poNumber}
                onChange={handleChange}
                className="w-full border-gray-300 dark:border-neutral-600 dark:bg-neutral-800 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
                P.O. Date
              </label>
              <input
                name="poDate"
                type="date"
                value={formData.poDate}
                onChange={handleChange}
                className="w-full border-gray-300 dark:border-neutral-600 dark:bg-neutral-800 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
                Mode Of Dispatch
              </label>
              <input
                name="modeOfDispatch"
                value={formData.modeOfDispatch}
                onChange={handleChange}
                className="w-full border-gray-300 dark:border-neutral-600 dark:bg-neutral-800 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Items */}
          <div>
            <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
              Items
            </h2>
            {formData.items.map((item, index) => (
              <div key={index} className="grid grid-cols-2 gap-4 mb-2">
                <input
                  name="description"
                  placeholder="Description"
                  value={item.description}
                  onChange={(e) => handleChange(e, index)}
                  className="border-gray-300 dark:border-neutral-600 dark:bg-neutral-800 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  name="quantity"
                  placeholder="Quantity"
                  value={item.quantity}
                  onChange={(e) => handleChange(e, index)}
                  className="border-gray-300 dark:border-neutral-600 dark:bg-neutral-800 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            ))}
            <button
              onClick={addItem}
              type="button"
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg mt-2"
            >
              Add Item
            </button>
          </div>

          {/* Export Button */}
          <button
            onClick={generatePDF}
            type="button"
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg mt-6"
          >
            Export to PDF
          </button>
        </form>
      </div>
    </div>
  );
};

export default DeliveryChallanForm;
