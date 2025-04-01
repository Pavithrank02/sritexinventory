import React, { useState } from "react";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import logoBase64 from "../assets/images/logobase.js";
import { SidebarDemo } from "./SideComponent.js";

const QuotationGenerator = () => {
  const [formData, setFormData] = useState({
    businessName: "",
    customerName: "",
    quotationDate: "",
    quotationNumber: "",
    validity: "",
    paymentTerms: "",
    items: [
      {
        description: "",
        quantity: "",
        unitPrice: "",
        amount: "",
        ecCharge: "",
      },
    ],
    taxRate: 0,
    discount: 0,
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
      items: [
        ...formData.items,
        { description: "", quantity: "", unitPrice: "" },
      ],
    });
  };

  const removeItem = (index) => {
    const updatedItems = formData.items.filter((_, i) => i !== index);
    setFormData({ ...formData, items: updatedItems });
  };

  const calculateSubtotal = () => {
    return formData.items.reduce(
      (total, item) =>
        total +
        (parseFloat(item.quantity) || 0) * (parseFloat(item.unitPrice) || 0),
      0
    );
  };

  const calculateTax = (subtotal) => (subtotal * formData.taxRate) / 100;

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const tax = calculateTax(subtotal);
    return subtotal + tax - (formData.discount || 0);
  };
  const generatePDF = () => {
    const doc = new jsPDF();

    // Add logo
    const logoWidth = 200; // Adjust logo width
    const logoHeight = 30; // Adjust logo height
    doc.addImage(logoBase64, "PNG", 10, 10, logoWidth, logoHeight);
    const companyStartY = 10 + logoHeight + 5;
    const margin = 10;
    const maxWidth = doc.internal.pageSize.getWidth() - margin * 2;

    // Company Information
    doc.setFontSize(10);
    doc.text("M/S Sri Tex Hitech Machines", margin, companyStartY);
    doc.setFont("helvetica", "normal");
    doc.text(
      "#4/96(4), Lakshmi Nagar, Kollupalayam, Kaniyur Post, Coimbatore 641 659.",
      margin,
      companyStartY + 5,
      { maxWidth }
    );
    doc.text(
      "Phone: 0422-2270540 | Email: info@sritexhitechmachines.com",
      margin,
      companyStartY + 10,
      { maxWidth }
    );
    doc.text(
      "Website: www.sritexhitechmachines.com",
      margin,
      companyStartY + 15
    );
    doc.text("GSTIN: 33ABIFS9750L1ZL", margin, companyStartY + 20);

    // Quotation Details
    const detailsStartY = companyStartY + 30;
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("Quotation Details", margin, detailsStartY);
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(
      `Business Name: ${formData.businessName}`,
      margin,
      detailsStartY + 5
    );
    doc.text(
      `Customer Name: ${formData.customerName}`,
      margin,
      detailsStartY + 10
    );
    doc.text(
      `Quotation Date: ${formData.quotationDate}`,
      margin,
      detailsStartY + 15
    );
    doc.text(
      `Quotation Number: ${formData.quotationNumber}`,
      margin,
      detailsStartY + 20
    );
    doc.text(`Validity: ${formData.validity}`, margin, detailsStartY + 25);
    doc.text(
      `Payment Terms: ${formData.paymentTerms}`,
      margin,
      detailsStartY + 30
    );

    // Table Headers
    const tableStartY = detailsStartY + 50;
    const columnWidths = [20, 100, 30, 30, 30];
    const rowHeight = 10;
    let currentX = margin;
    doc.setFont("helvetica", "bold");
    doc.text("Sl. No", currentX + 5, tableStartY - 5);
    doc.text("Description", currentX + columnWidths[0] + 5, tableStartY - 5);
    doc.text(
      "Quantity",
      currentX + columnWidths[0] + columnWidths[1] + 5,
      tableStartY - 5
    );
    doc.text(
      "Unit Price",
      currentX + columnWidths[0] + columnWidths[1] + columnWidths[2] + 5,
      tableStartY - 5
    );
    doc.text(
      "Total",
      currentX +
        columnWidths[0] +
        columnWidths[1] +
        columnWidths[2] +
        columnWidths[3] +
        5,
      tableStartY - 5
    );

    // Draw table headers
    columnWidths.forEach((width) => {
      doc.rect(currentX, tableStartY - rowHeight, width, rowHeight);
      currentX += width;
    });

    // Table Rows
    doc.setFont("helvetica", "normal");
    formData.items.forEach((item, index) => {
      const currentY = tableStartY + index * rowHeight;
      let currentX = margin;
      const itemTotal =
        (parseFloat(item.quantity) || 0) * (parseFloat(item.unitPrice) || 0);
      doc.rect(currentX, currentY, columnWidths[0], rowHeight);
      doc.text(String(index + 1), currentX + 5, currentY + 7);
      currentX += columnWidths[0];
      doc.rect(currentX, currentY, columnWidths[1], rowHeight);
      doc.text(item.description, currentX + 5, currentY + 7);
      currentX += columnWidths[1];
      doc.rect(currentX, currentY, columnWidths[2], rowHeight);
      doc.text(item.quantity, currentX + 5, currentY + 7);
      currentX += columnWidths[2];
      doc.rect(currentX, currentY, columnWidths[3], rowHeight);
      doc.text(item.unitPrice, currentX + 5, currentY + 7);
      currentX += columnWidths[3];
      doc.rect(currentX, currentY, columnWidths[4], rowHeight);
      doc.text(itemTotal.toFixed(2), currentX + 5, currentY + 7);
    });

    // Summary Section
    const summaryStartY = tableStartY + formData.items.length * rowHeight + 10;
    const subtotal = calculateSubtotal();
    const tax = calculateTax(subtotal);
    const total = calculateTotal();
    const unitTotal = calculateTotal();
    doc.setFont("helvetica", "bold");
    doc.text(`Subtotal: ${subtotal.toFixed(2)}`, 150, summaryStartY);
    doc.text(
      `Tax (${formData.taxRate}%): ${tax.toFixed(2)}`,
      150,
      summaryStartY + 5
    );
    doc.text(
      `Discount: ${formData.discount.toFixed(2)}`,
      150,
      summaryStartY + 10
    );
    doc.text(`Total: ${total.toFixed(2)}`, 150, summaryStartY + 15);
    doc.text(`unitTotal: ${unitTotal.toFixed(2)}`, 150, summaryStartY + 25);

    // Footer
    const footerY = summaryStartY + 30;
    doc.setFont("helvetica", "normal");
    doc.text("Received the goods in good condition", margin, footerY);
    doc.text("Customer's Signature", margin, footerY + 10);
    doc.text("Authorized Signatory", 150, footerY + 10);

    // Save the PDF
    doc.save("Quotation.pdf");
  };

  return (
    <div className="flex ">
      <SidebarDemo />
      <div className="max-w-4xl mx-auto p-6 bg-customBgColor-bg rounded-lg shadow-md w-full">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Quotation Generator
        </h1>
        <form className="space-y-4 ">
          <input
            name="businessName"
            placeholder="Business Name"
            value={formData.businessName}
            onChange={handleChange}
            className="w-full border p-2 rounded border-customBorderColor focus:ring-2 focus:outline-none focus:ring-customBgColor"
          />
          <input
            name="customerName"
            placeholder="Customer Name"
            value={formData.customerName}
            onChange={handleChange}
            className="w-full border p-2 rounded  border-customBorderColor focus:ring-2 focus:outline-none focus:ring-customBgColor"
          />
          <div className="grid grid-cols-2 gap-4">
            <input
              name="quotationDate"
              type="date"
              value={formData.quotationDate}
              onChange={handleChange}
              className="w-full border p-2 rounded border-customBorderColor focus:ring-2 focus:outline-none focus:ring-customBgColor"
            />
            <input
              name="quotationNumber"
              placeholder="Quotation Number"
              value={formData.quotationNumber}
              onChange={handleChange}
              className="w-full border p-2 rounded  border-customBorderColor focus:ring-2 focus:outline-none focus:ring-customBgColor"
            />
          </div>
          <input
            name="validity"
            placeholder="Validity (e.g., 30 days)"
            value={formData.validity}
            onChange={handleChange}
            className="w-full border p-2 rounded border-customBorderColor focus:ring-2 focus:outline-none focus:ring-customBgColor"
          />
          <input
            name="paymentTerms"
            placeholder="Payment Terms"
            value={formData.paymentTerms}
            onChange={handleChange}
            className="w-full border p-2 rounded border-customBorderColor focus:ring-2 focus:outline-none focus:ring-customBgColor"
          />

          <h2 className="text-lg font-semibold mt-4">Items</h2>
          <div className="flex flex-col space-y-6">
            {formData.items.map((item, index) => (
              <div
                key={index}
                className={`grid grid-cols-3 gap-6 items-center justify-between p-4 border-2 rounded-lg shadow-md 
                  border-customBorderColor bg-white even:bg-gray-100`}
              >
                <input
                  name="description"
                  placeholder="Description"
                  value={item.description}
                  onChange={(e) => handleChange(e, index)}
                  className="border p-2 rounded-md border-customBorderColor focus:ring-2 focus:outline-none focus:ring-customBgColor bg-customBgColor-bg"
                />
                <input
                  name="quantity"
                  type="number"
                  placeholder="Quantity"
                  value={item.quantity}
                  onChange={(e) => handleChange(e, index)}
                  className="border p-2 rounded-md border-customBorderColor focus:ring-2 focus:outline-none focus:ring-customBgColor bg-customBgColor-bg"
                />
                <input
                  name="unitPrice"
                  type="number"
                  placeholder="Unit Price"
                  value={item.unitPrice}
                  onChange={(e) => handleChange(e, index)}
                  className="border p-2 rounded-md border-customBorderColor focus:ring-2 focus:outline-none focus:ring-customBgColor bg-customBgColor-bg"
                />
                <input
                  name="amount"
                  type="number"
                  placeholder="Amount(Rs.)"
                  value={item.amount}
                  onChange={(e) => handleChange(e, index)}
                  className="border p-2 rounded-md border-customBorderColor focus:ring-2 focus:outline-none focus:ring-customBgColor bg-customBgColor-bg"
                />
                <input
                  name="ecCharge"
                  type="number"
                  placeholder="e&c Charge"
                  value={item.ecCharge}
                  onChange={(e) => handleChange(e, index)}
                  className="border p-2 rounded-md border-customBorderColor focus:ring-2 focus:outline-none focus:ring-customBgColor bg-customBgColor-bg"
                />
                <button
                  type="button"
                  onClick={() => removeItem(index)}
                  className="bg-red-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-red-600 transition-all duration-200"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={addItem}
            className="bg-customBgColor text-white px-4 py-2 rounded border-customBorderColor focus:ring-2 focus:outline-none focus:ring-customBgColor mt-2"
          >
            Add Item
          </button>

          <div className="flex justify-between items-center">
            <label className="font-semibold">Tax Rate:</label>
            <input
              name="taxRate"
              type="number"
              placeholder="Tax Rate (%)"
              value={formData.taxRate}
              onChange={handleChange}
              className=" border p-2 rounded border-customBorderColor focus:ring-2 focus:outline-none focus:ring-customBgColor w-auto"
            />
            <label className="font-semibold">Discount:</label>
            <input
              name="discount"
              type="number"
              placeholder="Discount"
              value={formData.discount}
              onChange={handleChange}
              className="w-auto border p-2 rounded border-customBorderColor focus:ring-2 focus:outline-none focus:ring-customBgColor"
            />
            <label className="font-semibold">TCS:</label>
            <input
              name="tcs"
              placeholder="TCS as applicable"
              value={formData.tcs}
              onChange={handleChange}
              className="w-auto border p-2 rounded border-customBorderColor focus:ring-2 focus:outline-none focus:ring-customBgColor"
            />
          </div>

          <button
            type="button"
            onClick={generatePDF}
            className="bg-customTextColor-light font-bold text-customBgColor-bg px-6 py-2 rounded mt-6 hover:bg-customBgColor"
          >
            Export to PDF
          </button>
        </form>
      </div>
    </div>
  );
};

export default QuotationGenerator;
