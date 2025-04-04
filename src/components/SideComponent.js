"use client";
import React, { useEffect, useState } from "react";
import {
  IconBrandTabler,
  IconReportMoney,
  IconPerspective,
  IconRuler2,
  IconTruckDelivery,
  IconBuildingFactory,
  IconLayoutSidebarRightCollapseFilled,
  IconLayoutSidebarRightExpandFilled,
} from "@tabler/icons-react";
import { NavLink, Outlet } from "react-router-dom";
import { motion } from "framer-motion";
import img from "../assets/images/sritex.jpg";

export function SidebarDemo() {
  const [open, setOpen] = useState(false); // Sidebar open state
  const [dropdownOpen, setDropdownOpen] = useState(null); // Dropdown open state
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const links = [
    {
      label: "Dashboard",
      href: "/",
      icon: (
        <IconBrandTabler className="h-6 w-6 flex-shrink-0 text-customTextColor" />
      ),
      subLinks: [
        { label: "Sheet Dashboard", href: "/sheetdashboard" },
        { label: "Machine Dashboard", href: "/machine" },
        { label: "Nut and Bolt Dashboard", href: "/" },
      ],
    },
    {
      label: "Forms",
      href: "/sheets",
      icon: (
        <IconPerspective className="h-6 w-6 flex-shrink-0 text-customTextColor" />
      ),
      subLinks: [
        { label: "Sheet Form", href: "/sheets" },
        { label: "Channel Patta Form", href: "/channel" },
        { label: "Nut and Bolt Form", href: "/nuts" },
        { label: "SprocketForm", href: "/sprocket" },
      ],
    },
    {
      label: "Channel & Patta Form",
      href: "/channel",
      icon: (
        <IconRuler2 className="h-6 w-6 flex-shrink-0 text-customTextColor" />
      ),
    },
    {
      label: "Delivery Challan",
      href: "/dc",
      icon: (
        <IconTruckDelivery className="h-6 w-6 flex-shrink-0 text-customTextColor" />
      ),
    },
    {
      label: "Quotation",
      href: "/quote",
      icon: <IconReportMoney className="h-6 w-6 flex-shrink-0 text-customTextColor" />,
    },
    {
      label: "Machine",
      href: "/machine",
      icon: (
        <IconBuildingFactory className="h-6 w-6 flex-shrink-0 text-customTextColor" />
      ),
      subLinks: [
        { label: "Nuts, Bolt and Washers", href: "/machine" },
        { label: "Sheet Types", href: "" },
        { label: "Shafts and Gears", href: "" },
        { label: "Dummy", href: "" },
      ],
    },
  ];
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Adjust breakpoint if needed
    };

    handleResize(); // Initialize
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="relative flex bg-customBgColor-bg ">
      {/* Sidebar for larger screens */}
      {!isMobile && (
        <motion.div
          animate={{ width: isSidebarOpen ? 240 : 96 }} // Adjust width smoothly
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          className="fixed h-full bg-customBgColor-bg shadow-md"
          onMouseEnter={() => setIsSidebarOpen(true)} // Open on hover
          onMouseLeave={() => setIsSidebarOpen(false)} // Close on hover out
        >
          <div className="flex flex-col h-full scrollbar-hide">
            {/* Logo Section */}
            <div className="flex items-center justify-center p-2">
              <img
                src={img}
                alt="Logo"
                className={`transition-all ${
                  isSidebarOpen ? "h-8 w-auto" : "h-8 w-auto"
                }`}
              />
              {isSidebarOpen && (
                <p className="ml-2 text-black  text-lg font-semibold transition-opacity duration-300">
                  Sritext Inventory
                </p>
              )}
            </div>

            {/* Links Section */}
            <div className="flex-1 overflow-y-auto p-4 scrollbar-hide">
              {links.map((link, idx) => (
                
                <div key={idx} className="">
                  {/* Main Link (No SubLinks) */}
                  {!link.subLinks ? (
                    <NavLink
                      to={link.href}
                      className={({ isActive }) =>
                        `flex items-center gap-3 p-3 rounded-lg transition-all duration-300 shadow-sm hover:shadow-md ${
                          isActive
                            ? " bg-gradient-to-r from-customBgColor-bg to-customTextColor-light  "
                            : "bg-customBgColor-bg  hover:bg-customTextColor-light "
                        }`
                      }
                    >
                      {link.icon && (
                        <span
                          className={`p-2 rounded-lg ${
                            isSidebarOpen
                              ? "bg-white text-customTextColor-light"
                              : "bg-gray-200 "
                          }`}
                        >
                          {link.icon}
                        </span>
                      )}
                      {isSidebarOpen && (
                        <span className="text-lg font-medium">
                          {link.label}
                        </span>
                      )}
                    </NavLink>
                  ) : (
                    <div>
                      {/* Main Link with SubLinks */}
                      <div
                        className="flex items-center justify-between p-3 rounded-lg cursor-pointer shadow-sm bg-customBgColor-bg   hover:bg-customTextColor-lighttransition-all duration-300"
                        onClick={() =>
                          setDropdownOpen(dropdownOpen === idx ? null : idx)
                        }
                      >
                        <div className="flex items-center gap-3">
                          {link.icon && (
                            <span className="p-2 rounded-lg bg-customBgColor-bg">
                              {link.icon}
                            </span>
                          )}
                          {isSidebarOpen && (
                            <span className="text-lg font-medium text-black">
                              {link.label}
                            </span>
                          )}
                        </div>
                        {isSidebarOpen && (
                          <span
                            className={`transition-transform duration-300 ${
                              dropdownOpen === idx ? "rotate-180" : "rotate-0"
                            }`}
                          >
                            ▼
                          </span>
                        )}
                      </div>

                      {/* SubLinks */}
                      {link.subLinks &&
                        dropdownOpen === idx &&
                        isSidebarOpen && (
                          <div className="ml-6 mt-2 space-y-1 pl-4 border-l border-customBorderColor ">
                            {link.subLinks.map((subLink, subIdx) => (
                              <NavLink
                                key={subIdx}
                                to={subLink.href}
                                className="flex items-center gap-3 p-2 rounded-md text-sm text-gray-600 hover:text-customTextColor-white  hover:bg-customTextColor-light transition-all duration-300"
                              >
                                <span className="text-customTextColor-light">
                                  •
                                </span>
                                {subLink.label}
                              </NavLink>
                            ))}
                          </div>
                        )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Sidebar for mobile devices */}
      {isMobile && (
        <>
          {/* Drawer Sidebar */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: isSidebarOpen ? 0 : "-100%" }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="fixed top-0 left-0 z-50 h-full w-64 bg-customBgColor-bg shadow-lg"
          >
            <div className="flex flex-col h-full">
              {/* Logo Section */}
              <div className="flex items-center justify-between p-4 bg-gray-100 ">
                <img src={img} alt="Logo" className="h-8 w-auto" />
                <button
                  onClick={() => setIsSidebarOpen(false)}
                  className="text-customTextColor  hover:text-red-600"
                >
                  <IconLayoutSidebarRightExpandFilled />
                </button>
              </div>

              {/* Links Section */}
              <div className="flex-1 overflow-y-auto p-4 ">
                {links.map((link, idx) => (
                  <div key={idx} className="mb-3">
                    {/* Main Link (No SubLinks) */}
                    {!link.subLinks ? (
                      <NavLink
                        to={link.href}
                        className={({ isActive }) =>
                          `flex items-center gap-3 p-3 rounded-lg transition-all duration-300 shadow-sm hover:shadow-md ${
                            isActive
                              ? "bg-gradient-to-r from-customBgColor-bg to-customTextColor-light text-white "
                              : "bg-customBgColor-bg  text-gray-800  hover:bg-customTextColor-light "
                          }`
                        }
                      >
                        {link.icon && (
                          <span
                            className={`p-2 rounded-lg ${
                              open
                                ? "bg-white text-customTextColor-light"
                                : "bg-gray-200  text-gray-700"
                            }`}
                          >
                            {link.icon}
                          </span>
                        )}
                        <span className="text-lg font-medium">
                          {link.label}
                        </span>
                      </NavLink>
                    ) : (
                      <div>
                        {/* Main Link with SubLinks */}
                        <div
                          className="flex items-center justify-between p-3 rounded-lg cursor-pointer shadow-sm bg-gray-100  text-gray-800  hover:bg-customTextColor-light  transition-all duration-300"
                          onClick={() =>
                            setDropdownOpen(dropdownOpen === idx ? null : idx)
                          }
                        >
                          <div className="flex items-center gap-3">
                            {link.icon && (
                              <span className="p-2 rounded-lg bg-gray-200  text-gray-700 ">
                                {link.icon}
                              </span>
                            )}
                            <span className="text-lg font-medium">
                              {link.label}
                            </span>
                          </div>
                          <span
                            className={`transition-transform duration-300 ${
                              dropdownOpen === idx ? "rotate-180" : "rotate-0"
                            }`}
                          >
                            ▼
                          </span>
                        </div>

                        {/* SubLinks */}
                        {link.subLinks && dropdownOpen === idx && (
                          <div className="ml-6 mt-2 space-y-1 pl-4 border-l border-gray-300 ">
                            {link.subLinks.map((subLink, subIdx) => (
                              <NavLink
                                key={subIdx}
                                to={subLink.href}
                                className="flex items-center gap-3 p-2 rounded-md text-sm text-black  hover:bg-customTextColor-light  transition-all duration-300"
                              >
                                <span className="text-customTextColor-light">
                                  •
                                </span>
                                {subLink.label}
                              </NavLink>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Overlay */}
          {isSidebarOpen && (
            <div
              className="fixed inset-0 bg-black bg-opacity-30 z-40"
              onClick={() => setIsSidebarOpen(false)}
            ></div>
          )}

          {/* Mobile Menu Button */}
          <div className="absolute left-1 top-4 lg:hidden md:hidden">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="flex items-center gap-2 p-3 rounded-full bg-gradient-to-r from-customBgColor-light to-customTextColor-light text-white shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
              aria-label="Open Menu"
            >
              {/* Icon */}
              <IconLayoutSidebarRightCollapseFilled className="text-customTextColor" />
              {/* Label */}
              <span className="text-lg font-medium text-customTextColor">
                Menu
              </span>
            </button>
          </div>
        </>
      )}

      {/* Main Content */}
      <motion.div
        animate={{
          marginLeft: isMobile ? 0 : isSidebarOpen ? 240 : 96,
          marginBottom: isMobile ? 50 : 0,
        }}
        className="flex-1 transition-all duration-300 bg-customBgColor-bg"
      >
        <Outlet />
      </motion.div>
    </div>
  );
}