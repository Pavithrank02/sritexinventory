"use client";
import React, { useState } from "react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalTrigger,
} from "../components/ui/animated-modal.tsx";
import {
  IconBrandTabler,
  IconNut,
  IconPerspective,
  IconRuler2,
  IconTruckDelivery,
  IconBuildingFactory,
} from "@tabler/icons-react";

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

export function AnimatedModalButton() {
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
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="relative">
      <Modal>
        <ModalTrigger className="bg-customBgColor text-white flex justify-center group/modal-btn relative">
          <span className="group-hover/modal-btn:translate-x-40 text-center transition duration-500">
            Edit Components
          </span>
          <div className="-translate-x-40 group-hover/modal-btn:translate-x-0 flex items-center justify-center absolute inset-0 transition duration-500 text-white z-20">
            <div className="relative group">
              {/* Container to hold the scrolling icons */}
              <div className="flex gap-4 overflow-hidden w-full h-8 relative">
                <div
                  className="flex gap-4 absolute left-0 group-hover:animate-scroll-loop"
                  style={{ width: "calc(6 * 2.5rem)", whiteSpace: "nowrap" }}
                >
                  {/* Icon List */}
                  {[
                    <IconBrandTabler className="h-6 w-6 text-customBgColor-bg" />,
                    <IconNut className="h-6 w-6 text-customBgColor-bg" />,
                    <IconPerspective className="h-6 w-6 text-customBgColor-bg" />,
                    <IconRuler2 className="h-6 w-6 text-customBgColor-bg" />,
                    <IconTruckDelivery className="h-6 w-6 text-customBgColor-bg" />,
                    <IconBuildingFactory className="h-6 w-6 text-customBgColor-bg" />,
                  ].map((icon, index) => (
                    <div key={index} className="flex-shrink-0">
                      {icon}
                    </div>
                  ))}
                </div>
              </div>

              {/* Styling */}
              <style>
                {`
      @keyframes scroll-loop {
        0% {
          transform: translateX(0);
        }
        100% {
          transform: translateX(-50%);
        }
      }
      .group-hover\\:animate-scroll-loop {
        animation: scroll-loop 3s linear infinite;
      }
    `}
              </style>
            </div>
          </div>
        </ModalTrigger>
        <ModalBody>
          <ModalContent className="max-w-lg mx-auto p-6 bg-white dark:bg-neutral-800 rounded-lg shadow-lg">
            <h4 className="text-lg md:text-2xl text-neutral-600 dark:text-neutral-100 font-bold text-center mb-6">
              Supplies Been Used
            </h4>
            <form
              className="h-[50vh] overflow-y-auto space-y-6"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              <style>
                {`
                form::-webkit-scrollbar {
                  display: none;
                }
              `}
              </style>

              {/* Bolts */}
              <div className="flex flex-col items-start space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-neutral-300">
                  Bolt Size
                </label>
                <select
                  className="border border-customBorderColor rounded-lg p-2 w-full"
                  value={formData.boltSize}
                  onChange={handleInputChange}
                  name="boltSize"
                  placeholder="Bolt Size"
                >
                  {boltSize.map((size, i) => (
                    <option key={i} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
                <label
                  htmlFor="bolts"
                  className="text-sm font-medium text-neutral-700 dark:text-neutral-300"
                >
                  Number of Bolts
                </label>
                <input
                  type="number"
                  id="bolts"
                  name="bolts"
                  min="0"
                  className="w-full p-2 border rounded-md shadow-sm border-customBorderColor focus:ring-2 focus:ring-blue-400 focus:outline-none dark:bg-neutral-800 dark:border-neutral-600 dark:text-neutral-200"
                  placeholder="Enter number of bolts"
                />
              </div>

              {/* Nuts */}
              <div className="flex flex-col items-start space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-neutral-300">
                  Nut Size
                </label>
                <select
                  className="border border-customBorderColor rounded-lg p-2 w-full"
                  value={formData.nutSize}
                  onChange={handleInputChange}
                  name="nutSize"
                  placeholder="Nut Size"
                >
                  {nutSize.map((size, i) => (
                    <option key={i} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
                <label
                  htmlFor="nuts"
                  className="text-sm font-medium text-neutral-700 dark:text-neutral-300"
                >
                  Number of Nuts
                </label>
                <input
                  type="number"
                  id="nuts"
                  name="nuts"
                  min="0"
                  className="w-full p-2 border rounded-md shadow-sm border-customBorderColor focus:ring-2 focus:ring-blue-400 focus:outline-none dark:bg-neutral-800 dark:border-neutral-600 dark:text-neutral-200"
                  placeholder="Enter number of nuts"
                />
              </div>

              {/* Washers */}
              <div className="flex flex-col items-start space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-neutral-300">
                  Washer Size
                </label>
                <select
                  className="border border-customBorderColor rounded-lg p-2 w-full"
                  value={formData.washerSize}
                  onChange={handleInputChange}
                  name="washerSize"
                  placeholder="Washer Size"
                >
                  {washerSize.map((size, i) => (
                    <option key={i} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
                <label
                  htmlFor="washers"
                  className="text-sm font-medium text-neutral-700 dark:text-neutral-300"
                >
                  Number of Washers
                </label>
                <input
                  type="number"
                  id="washers"
                  name="washers"
                  min="0"
                  className="w-full p-2 border rounded-md shadow-sm border-customBorderColor focus:ring-2 focus:ring-blue-400 focus:outline-none dark:bg-neutral-800 dark:border-neutral-600 dark:text-neutral-200"
                  placeholder="Enter number of washers"
                />
              </div>
            </form>
          </ModalContent>

          <ModalFooter className="flex justify-between px-6 mt-4">
            <button className="px-4 py-2 bg-gray-200 text-black dark:bg-neutral-700 dark:text-white border border-gray-300 rounded-md text-sm w-28">
              Cancel
            </button>
            <button className="bg-black text-white dark:bg-white dark:text-black text-sm px-4 py-2 rounded-md border border-black w-28">
              Submit
            </button>
          </ModalFooter>
        </ModalBody>
      </Modal>
    </div>
  );
}
