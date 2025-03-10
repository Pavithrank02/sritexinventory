import React, { useState } from "react";
import { jsPDF } from "jspdf";
import "jspdf-yworks";
import "jspdf-autotable";
import { SidebarDemo } from "./SideComponent";
import logoBase64 from "../assets/images/logobase";

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
  
    // Add logo (Ensure logoBase64 contains the Base64 representation of the image)
    const logoWidth = 200; // Width of the logo in the PDF
    const logoHeight = 25; // Height of the logo in the PDF
    doc.addImage(logoBase64, "PNG", 10, 10, logoWidth, logoHeight);
  
    // Add company information below the logo
    doc.setFontSize(10);
    const companyStartY = 10 + logoHeight + 5; // Position after the logo
    doc.text("M/S", 10, companyStartY);
    doc.setFont("helvetica", "bold");
    doc.text("Sri Tex Hitech Machines", 10, companyStartY + 5);
    doc.setFont("helvetica", "normal");
    doc.text(
      "#4/96(4), Lakshmi Nagar, Kollupalayam, Kaniyur Post, Coimbatore 641 659.",
      10,
      companyStartY + 10
    );
    doc.text("Phone: 0422-2270540 | Email: info@sritexhitechmachines.com", 10, companyStartY + 15);
    doc.text("Website: www.sritexhitechmachines.com", 10, companyStartY + 20);
    doc.text("GSTIN: 33ABIFS9750L1ZL", 10, companyStartY + 25);
  
    // Add recipient details
    const recipientStartY = companyStartY + 35;
    doc.setFont("helvetica", "bold");
    doc.text("To:", 10, recipientStartY);
    doc.setFont("helvetica", "normal");
    doc.text(`Recipient: ${formData.recipient}`, 10, recipientStartY + 5);
    doc.text(`Party's GSTIN/UIN: ${formData.gstin}`, 10, recipientStartY + 10);
  
    // Add delivery note details
    doc.text(`D.C. No.: ${formData.dcNumber}`, 120, recipientStartY);
    doc.text(`D.C. Date: ${formData.dcDate}`, 120, recipientStartY + 5);
    doc.text(`P.O. No.: ${formData.poNumber}`, 120, recipientStartY + 10);
    doc.text(`P.O. Date: ${formData.poDate}`, 120, recipientStartY + 15);
    doc.text(`Mode Of Dispatch: ${formData.modeOfDispatch}`, 120, recipientStartY + 20);
  
    // Add table headers
    const startX = 10;
    const startY = recipientStartY + 35;
    const rowHeight = 10;
    const colWidths = [20, 100, 30]; // Adjust column widths
  
    doc.setFont("helvetica", "bold");
    doc.text("Sl. No", startX + 5, startY - 5);
    doc.text("Description", startX + colWidths[0] + 5, startY - 5);
    doc.text("Quantity", startX + colWidths[0] + colWidths[1] + 5, startY - 5);
  
    // Draw table header borders
    doc.rect(startX, startY - rowHeight, colWidths[0], rowHeight); // Sl. No
    doc.rect(startX + colWidths[0], startY - rowHeight, colWidths[1], rowHeight); // Description
    doc.rect(
      startX + colWidths[0] + colWidths[1],
      startY - rowHeight,
      colWidths[2],
      rowHeight
    ); // Quantity
  
    // Add table rows
    formData.items.forEach((item, index) => {
      const currentY = startY + index * rowHeight;
  
      // Draw row borders
      doc.rect(startX, currentY, colWidths[0], rowHeight); // Sl. No
      doc.rect(startX + colWidths[0], currentY, colWidths[1], rowHeight); // Description
      doc.rect(
        startX + colWidths[0] + colWidths[1],
        currentY,
        colWidths[2],
        rowHeight
      ); // Quantity
  
      // Add row text
      doc.text(String(index + 1), startX + 5, currentY + 5);
      doc.text(item.description, startX + colWidths[0] + 5, currentY + 5);
      doc.text(item.quantity, startX + colWidths[0] + colWidths[1] + 5, currentY + 5);
    });
  
    // Add footer
    doc.text("Received the goods in good condition", 10, 250);
    doc.text("Customer's Signature", 10, 260);
    doc.text("Authorized Signatory", 150, 260);
  
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
