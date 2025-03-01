import React, { useState } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";

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
    const slNo = 0
    setFormData({
      ...formData,
      items: [...formData.items, { slNo: slNo + 1, description: "", quantity: "" }],
    });
  };

  const generatePDF = () => {
    const doc = new jsPDF();

    // Add logo
    const logo = "data:image/png;base64,PUT_YOUR_BASE64_LOGO_HERE"; // Replace with your base64 logo
    doc.addImage(logo, "PNG", 10, 10, 50, 20);

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
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Delivery Challan Form</h1>

      <div className="mb-4">
        <label>Address</label>
        <textarea
          name="address"
          value={formData.address}
          onChange={handleChange}
          className="border p-2 w-full"
        />
      </div>

      <div className="mb-4">
        <label>Recipient</label>
        <input
          name="recipient"
          value={formData.recipient}
          onChange={handleChange}
          className="border p-2 w-full"
        />
      </div>

      <div className="mb-4">
        <label>GSTIN</label>
        <input
          name="gstin"
          value={formData.gstin}
          onChange={handleChange}
          className="border p-2 w-full"
        />
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label>Delivery Note</label>
          <input
            name="deliveryNote"
            value={formData.deliveryNote}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        </div>

        <div>
          <label>D.C. No</label>
          <input
            name="dcNumber"
            value={formData.dcNumber}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        </div>

        <div>
          <label>D.C. Date</label>
          <input
            name="dcDate"
            type="date"
            value={formData.dcDate}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        </div>

        <div>
          <label>P.O. No</label>
          <input
            name="poNumber"
            value={formData.poNumber}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        </div>

        <div>
          <label>P.O. Date</label>
          <input
            name="poDate"
            type="date"
            value={formData.poDate}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        </div>

        <div>
          <label>Mode Of Dispatch</label>
          <input
            name="modeOfDispatch"
            value={formData.modeOfDispatch}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        </div>
      </div>

      <div className="mb-4">
        <h2 className="text-lg font-bold mb-2">Items</h2>
        {formData.items.map((item, index) => (
          <div key={index} className="grid grid-cols-2 gap-4 mb-2">
            <input
              name="description"
              placeholder="Description"
              value={item.description}
              onChange={(e) => handleChange(e, index)}
              className="border p-2 w-full"
            />
            <input
              name="quantity"
              placeholder="Quantity"
              value={item.quantity}
              onChange={(e) => handleChange(e, index)}
              className="border p-2 w-full"
            />
          </div>
        ))}
        <button onClick={addItem} className="bg-blue-500 text-white px-4 py-2 rounded">
          Add Item
        </button>
      </div>

      <button onClick={generatePDF} className="bg-green-500 text-white px-4 py-2 rounded">
        Export to PDF
      </button>
    </div>
  );
};

export default DeliveryChallanForm;
