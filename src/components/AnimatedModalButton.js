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
    <div className=" ">
      <Modal>
        <ModalTrigger className="bg-customBgColor dark:bg-white dark:text-black text-white flex justify-center group/modal-btn">
          <span className="group-hover/modal-btn:translate-x-40 text-center transition duration-500">
            Edit Components
          </span>
          <div className="-translate-x-40 group-hover/modal-btn:translate-x-0 flex items-center justify-center absolute inset-0 transition duration-500 text-white z-20">
            {/** Dynamic Icon Logic */}
            {(() => {
              const iconType = "user"; // Replace with dynamic type (e.g., "user", "settings", "bell")
              switch (iconType) {
                case "IconBrandTabler":
                  return (
                    <IconBrandTabler className="h-6 w-6 flex-shrink-0 text-customTextColor" />
                  ); // Lucide User Icon
                case "IconNut":
                  return (
                    <IconNut className="h-6 w-6 flex-shrink-0 text-customTextColor" />
                  ); // Lucide Settings Icon
                case "IconPerspective":
                  return (
                    <IconPerspective className="h-6 w-6 flex-shrink-0 text-customTextColor" />
                  ); // Lucide Bell Icon
                case "IconRuler2":
                  return (
                    <IconRuler2 className="h-6 w-6 flex-shrink-0 text-customTextColor" />
                  ); // Lucide Bell Icon
                case "IconTruckDelivery":
                  return (
                    <IconTruckDelivery className="h-6 w-6 flex-shrink-0 text-customTextColor" />
                  ); // Lucide Bell Icon
                case "IconBuildingFactory":
                  return (
                    <IconBuildingFactory className="h-6 w-6 flex-shrink-0 text-customTextColor" />
                  ); // Lucide Bell Icon
                default:
                  return <span>🚀</span>; // Default Emoji Icon
              }
            })()}
          </div>
        </ModalTrigger>
        <ModalBody>
          <ModalContent>
            <h4 className="text-lg md:text-2xl text-neutral-600 dark:text-neutral-100 font-bold text-center mb-8 bg-customBgColor-bg">
              Supplies Been Used
            </h4>
            <form
              className="h-[60vh] overflow-y-scroll pr-4"
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
              <div className="flex flex-col items-start mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">
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
                  className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mt-4"
                >
                  Number of Bolts
                </label>
                <input
                  type="number"
                  id="bolts"
                  name="bolts"
                  min="0"
                  className="w-full p-2 mt-2 border rounded-md shadow-sm border-customBorderColor focus:ring-2 focus:ring-blue-400 focus:outline-none dark:bg-neutral-800 dark:border-neutral-600 dark:text-neutral-200"
                  placeholder="Enter number of bolts"
                />
              </div>

              {/* Nuts */}
              <div className="flex flex-col items-start mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">
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
                  className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mt-4"
                >
                  Number of Nuts
                </label>
                <input
                  type="number"
                  id="nuts"
                  name="nuts"
                  min="0"
                  className="w-full p-2 mt-2 border rounded-md shadow-sm border-customBorderColor focus:ring-2 focus:ring-blue-400 focus:outline-none dark:bg-neutral-800 dark:border-neutral-600 dark:text-neutral-200"
                  placeholder="Enter number of nuts"
                />
              </div>

              {/* Washers */}
              <div className="flex flex-col items-start mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">
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
                  className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mt-4"
                >
                  Number of Washers
                </label>
                <input
                  type="number"
                  id="washers"
                  name="washers"
                  min="0"
                  className="w-full p-2 mt-2 border rounded-md shadow-sm border-customBorderColor focus:ring-2 focus:ring-customBgColor focus:outline-none dark:bg-neutral-800 dark:border-neutral-600 dark:text-neutral-200"
                  placeholder="Enter number of washers"
                />
              </div>
            </form>
          </ModalContent>

          <ModalFooter className="gap-8 mb-4 -mt-3">
            {/* Cancel Button */}
            <button className="px-4 py-2 bg-gray-200 text-black dark:bg-black dark:border-black dark:text-white border border-gray-300 rounded-md text-sm w-28">
              Cancel
            </button>
            {/* Submit Button */}
            <button className="bg-black text-white dark:bg-white dark:text-black text-sm px-4 py-2 rounded-md border border-black w-28">
              Submit
            </button>
          </ModalFooter>
        </ModalBody>
      </Modal>
    </div>
  );
}

const PlaneIcon = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M16 10h4a2 2 0 0 1 0 4h-4l-4 7h-3l2 -7h-4l-2 2h-3l2 -4l-2 -4h3l2 2h4l-2 -7h3z" />
    </svg>
  );
};

const VacationIcon = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M17.553 16.75a7.5 7.5 0 0 0 -10.606 0" />
      <path d="M18 3.804a6 6 0 0 0 -8.196 2.196l10.392 6a6 6 0 0 0 -2.196 -8.196z" />
      <path d="M16.732 10c1.658 -2.87 2.225 -5.644 1.268 -6.196c-.957 -.552 -3.075 1.326 -4.732 4.196" />
      <path d="M15 9l-3 5.196" />
      <path d="M3 19.25a2.4 2.4 0 0 1 1 -.25a2.4 2.4 0 0 1 2 1a2.4 2.4 0 0 0 2 1a2.4 2.4 0 0 0 2 -1a2.4 2.4 0 0 1 2 -1a2.4 2.4 0 0 1 2 1a2.4 2.4 0 0 0 2 1a2.4 2.4 0 0 0 2 -1a2.4 2.4 0 0 1 2 -1a2.4 2.4 0 0 1 1 .25" />
    </svg>
  );
};

const ElevatorIcon = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M5 4m0 1a1 1 0 0 1 1 -1h12a1 1 0 0 1 1 1v14a1 1 0 0 1 -1 1h-12a1 1 0 0 1 -1 -1z" />
      <path d="M10 10l2 -2l2 2" />
      <path d="M10 14l2 2l2 -2" />
    </svg>
  );
};

const FoodIcon = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M20 20c0 -3.952 -.966 -16 -4.038 -16s-3.962 9.087 -3.962 14.756c0 -5.669 -.896 -14.756 -3.962 -14.756c-3.065 0 -4.038 12.048 -4.038 16" />
    </svg>
  );
};

const MicIcon = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M15 12.9a5 5 0 1 0 -3.902 -3.9" />
      <path d="M15 12.9l-3.902 -3.899l-7.513 8.584a2 2 0 1 0 2.827 2.83l8.588 -7.515z" />
    </svg>
  );
};

const ParachuteIcon = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M22 12a10 10 0 1 0 -20 0" />
      <path d="M22 12c0 -1.66 -1.46 -3 -3.25 -3c-1.8 0 -3.25 1.34 -3.25 3c0 -1.66 -1.57 -3 -3.5 -3s-3.5 1.34 -3.5 3c0 -1.66 -1.46 -3 -3.25 -3c-1.8 0 -3.25 1.34 -3.25 3" />
      <path d="M2 12l10 10l-3.5 -10" />
      <path d="M15.5 12l-3.5 10l10 -10" />
    </svg>
  );
};
