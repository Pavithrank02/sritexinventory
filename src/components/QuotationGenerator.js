import React, { useState } from "react";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import logoBase64 from "../assets/images/logobase.js";
import { SidebarDemo } from "./SideComponent.js";

const QuotationGenerator = () => {
  const [formData, setFormData] = useState({
    businessName: "",
    customerAddress: "",
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
    const logoWidth = 220; // Adjust logo width
    const logoHeight = 30; // Adjust logo height
    doc.addImage(logoBase64, "PNG", 0, 0, logoWidth, logoHeight);
    const companyStartY = 10 + logoHeight;
    const margin = 10;
    const maxWidth = doc.internal.pageSize.getWidth() - margin * 2;
    const columnWidth = doc.internal.pageSize.getWidth() / 2 - margin * 2;
    const column1X = margin; // Left column
    const column2X = doc.internal.pageSize.getWidth() / 2 + 10; // Right column
    const rowSpacing = 7; // Space between rows

    // Company Information
    doc.setFontSize(10);

    // Company Information - Two Columns
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.setFont("helvetica", "normal");

    // Left Column
    doc.setFont("helvetica", "bold");
    doc.text(
      "Phone: 09443391712, 09487991712,",
      column1X,
      companyStartY + rowSpacing
    );
    doc.text(
      "GSTIN: 33ABIFS9750L1ZL",
      column1X,
      companyStartY + rowSpacing * 2
    );

    // Right Column
    const wrappedAddress2 = doc.splitTextToSize(
      "#4/96(4), Lakshmi Nagar, Kollupalayam, Kaniyur Post, Coimbatore 641 659.",
      maxWidth
    );
    doc.setFont("helvetica", "bold");
    doc.text(
      wrappedAddress2,
      column2X - 80,
      companyStartY - 25 + rowSpacing * 3
    );
    doc.setFont("helvetica", "normal");
    doc.text(
      "Email: info@sritexhitechmachines.com",
      column2X,
      companyStartY + rowSpacing
    );
    doc.text(
      "Website: www.sritexhitechmachines.com",
      column2X,
      companyStartY + rowSpacing * 2
    );

    // Full Width Address (Wrap if needed)

    // Initial position for Quotation Details
    const detailsStartY = companyStartY + 30;
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("Quotation Details", margin, detailsStartY);

    // Prepare for fields
    doc.setFontSize(10);
    const labelSpacingX = 35;
    const rowGap = 5;
    let rowY = detailsStartY + 10; // Reduced spacing after title

    // Row 1: Business Name & Quotation Date
    doc.setFont("helvetica", "bold");
    doc.text("Business Name:", column1X, rowY);
    doc.setFont("helvetica", "normal");
    doc.text(formData.businessName, column1X + labelSpacingX, rowY);

    doc.setFont("helvetica", "bold");
    doc.text("Quotation Date:", column2X, rowY);
    doc.setFont("helvetica", "normal");
    doc.text(formData.quotationDate, column2X + labelSpacingX, rowY);

    // Row 2: Customer Address & Quotation Number
    rowY += rowGap + 5;

    doc.setFont("helvetica", "bold");
    doc.text("Customer Address:", column1X, rowY);
    const wrappedAddress = doc.splitTextToSize(
      formData.customerAddress,
      columnWidth
    );
    doc.setFont("helvetica", "normal");
    doc.text(wrappedAddress, column1X + labelSpacingX, rowY);

    // Calculate dynamic height for address
    const addressHeight = wrappedAddress.length * rowGap;

    // Quotation Number
    doc.setFont("helvetica", "bold");
    doc.text("Quotation Number:", column2X, rowY);
    const wrappedQuotationNumber = doc.splitTextToSize(
      formData.quotationNumber,
      columnWidth
    );
    doc.setFont("helvetica", "normal");
    doc.text(wrappedQuotationNumber, column2X + labelSpacingX, rowY);
    const quotationNumberHeight = wrappedQuotationNumber.length * rowGap;

    // Find max height between two columns
    const maxBlockHeight = Math.max(addressHeight, quotationNumberHeight);
    rowY += maxBlockHeight + rowGap; // Tighter space between blocks

    // Row 3: Kind Attention, Mobile, Email (fewer gaps)
    doc.setFont("helvetica", "bold");
    doc.text("Kind Attention:", column1X, rowY);
    doc.setFont("helvetica", "normal");
    doc.text(formData.validity, column1X + labelSpacingX, rowY);

    doc.setFont("helvetica", "bold");
    doc.text("Mobile:", column2X, rowY);
    doc.setFont("helvetica", "normal");
    doc.text(formData.paymentTerms, column2X + labelSpacingX, rowY);

    rowY += rowGap + 5;
    doc.setFont("helvetica", "bold");
    doc.text("Email:", column2X, rowY);
    doc.setFont("helvetica", "normal");
    doc.text(formData.paymentTerms, column2X + labelSpacingX, rowY);

    // Final Y for next section
    const adjustedNextRowY = rowY + rowGap;
    // Dynamically set the table position below all content
    const tableStartY = adjustedNextRowY + rowSpacing * 3;

    const columnWidths = [12, 90, 20, 20, 20, 25];
    const rowHeight = 10;
    let currentX = margin;
    doc.setFont("helvetica", "bold");
    doc.text("Sl. No", currentX + 1, tableStartY - 5);
    doc.text("Description", currentX + columnWidths[0] + 5, tableStartY - 5);
    doc.text(
      "Quantity",
      currentX + columnWidths[0] + columnWidths[1] + 2,
      tableStartY - 5
    );
    doc.text(
      "Unit Price",
      currentX + columnWidths[0] + columnWidths[1] + columnWidths[2] + 1,
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
    doc.text(
      "E & C Charge",
      currentX +
        columnWidths[0] +
        columnWidths[1] +
        columnWidths[2] +
        columnWidths[3] +
        columnWidths[4] +
        1,
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
      const ecChargeTotal = parseFloat(item.ecCharge) || 0;

      // Wrap description text within the column width
      const wrappedText = doc.splitTextToSize(
        item.description,
        columnWidths[1] - 5
      );
      const lineCount = wrappedText.length; // Count lines for height adjustment
      const adjustedRowHeight = rowHeight * lineCount; // Increase row height for wrapped text

      // Draw the table row with adjusted height
      doc.rect(currentX, currentY, columnWidths[0], adjustedRowHeight);
      doc.text(String(index + 1), currentX + 5, currentY + 7);
      currentX += columnWidths[0];

      doc.rect(currentX, currentY, columnWidths[1], adjustedRowHeight);
      doc.text(wrappedText, currentX + 5, currentY + 7);
      currentX += columnWidths[1];

      doc.rect(currentX, currentY, columnWidths[2], adjustedRowHeight);
      doc.text(item.quantity, currentX + 5, currentY + 7);
      currentX += columnWidths[2];

      doc.rect(currentX, currentY, columnWidths[3], adjustedRowHeight);
      doc.text(item.unitPrice, currentX + 5, currentY + 7);
      currentX += columnWidths[3];

      doc.rect(currentX, currentY, columnWidths[4], adjustedRowHeight);
      doc.text(itemTotal.toFixed(2), currentX + 5, currentY + 7);
      currentX += columnWidths[4];

      doc.rect(currentX, currentY, columnWidths[5], adjustedRowHeight);
      doc.text(ecChargeTotal.toFixed(2), currentX + 5, currentY + 7);
    });

    // Summary Section
    // Calculate total table height dynamically
    const totalTableHeight = formData.items.reduce((totalHeight, item) => {
      const wrappedText = doc.splitTextToSize(
        item.description,
        columnWidths[1] - 5
      );
      const lineCount = wrappedText.length;
      return totalHeight + rowHeight * lineCount; // Adjust row height for text wrapping
    }, 0);

    // Set summary section below the table dynamically
    const summaryStartY = tableStartY + totalTableHeight + 10;

    // Summary Section
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

    // Footer Section (Moves down with summary)
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
          <textarea
            name="customerAddress"
            placeholder="Customer Address"
            value={formData.customerAddress}
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
