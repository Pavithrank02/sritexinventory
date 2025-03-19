"use client";
import React, { useState } from "react";
import {
  IconBrandTabler,
  IconNut,
  IconPerspective,
  IconRuler2,
  IconTruckDelivery,
  IconBuildingFactory,
} from "@tabler/icons-react";
import { NavLink, Outlet } from "react-router-dom";
import { motion } from "framer-motion";
import img from "../assets/images/sritex.jpg";

export function SidebarDemo() {
  const [open, setOpen] = useState(false); // Sidebar open state
  const [dropdownOpen, setDropdownOpen] = useState(null); // Dropdown open state

  const links = [
    {
      label: "Dashboard",
      href: "/",
      icon: <IconBrandTabler className="h-6 w-6 flex-shrink-0 text-customTextColor" />,
      subLinks: [
        { label: "Sheet Dashboard", href: "/sheetdashboard" },
        { label: "Machine Dashboard", href: "/machine" },
        { label: "Nut and Bolt Dashboard", href: "/" },
      ],
    },
    {
      label: "Sheets Form",
      href: "/sheets",
      icon: <IconPerspective className="h-6 w-6 flex-shrink-0 text-customTextColor" />,
      subLinks: [
        { label: "Sheet Form", href: "/sheets" },
        { label: "Channel Patta Form", href: "/channel" },
        { label: "Nut and Bolt Form", href: "/nuts" },
      ],
    },
    {
      label: "Channel & Plats Form",
      href: "/channel",
      icon: <IconRuler2 className="h-6 w-6 flex-shrink-0 text-customTextColor" />,
    },
    {
      label: "Delivery Challan",
      href: "/dc",
      icon: <IconTruckDelivery className="h-6 w-6 flex-shrink-0 text-customTextColor" />,
    },
    {
      label: "Nuts and Bolts",
      href: "/nuts",
      icon: <IconNut className="h-6 w-6 flex-shrink-0 text-customTextColor" />,
    },
    {
      label: "Machine",
      href: "/machine",
      icon: <IconBuildingFactory className="h-6 w-6 flex-shrink-0 text-customTextColor" />,
    },
  ];

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <motion.div
        animate={{ width: open ? 240 : 64 }} // Adjust width smoothly
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        className="fixed h-full bg-customBgColor-bg dark:bg-gray-800 shadow-md"
        onMouseEnter={() => setOpen(true)} // Open on hover
        onMouseLeave={() => setOpen(false)} // Close on hover out
      >
        <div className="flex flex-col h-full">
          {/* Logo Section */}
          <div className="flex items-center justify-center p-4">
            <img
              src={img}
              alt="Logo"
              className={`transition-all ${open ? "h-8 w-auto" : "h-8 w-8"}`}
            />
            {open && (
              <p className="ml-2 text-black dark:text-gray-200  font-semibold transition-opacity duration-300">
                Sritext Inventory
              </p>
            )}
          </div>

          {/* Links Section */}
          <div className="flex-1 overflow-y-auto">
            {links.map((link, idx) => (
              <div key={idx}>
                {/* Parent Link */}
                {!link.subLinks ? (
                  <NavLink
                    to={link.href}
                    className={({ isActive }) =>
                      `flex items-center gap-4 p-3 text-gray-800 dark:text-gray-200 hover:bg-customTextColor-light dark:hover:bg-customBgColor rounded-md ${
                        isActive ? "bg-customBgColor-bg dark:bg-gray-700" : ""
                      } ${open ? "justify-start" : "justify-center"}`
                    }
                  >
                    {link.icon}
                    {open && <span>{link.label}</span>}
                  </NavLink>
                ) : (
                  <div
                    className={`flex items-center gap-4 p-3 text-gray-800 dark:text-gray-200 hover:bg-customTextColor-light dark:hover:bg-customBgColor rounded-md ${
                      open ? "justify-start" : "justify-center"
                    }`}
                    onClick={() =>
                      setDropdownOpen(dropdownOpen === idx ? null : idx)
                    }
                  >
                    {link.icon}
                    {open && <span>{link.label}</span>}
                    {open && (
                      <span className="ml-auto text-customTextColor">
                        {dropdownOpen === idx ? "▲" : "▼"}
                      </span>
                    )}
                  </div>
                )}

                {/* Dropdown Links */}
                {link.subLinks && dropdownOpen === idx && open && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: "auto" }}
                    className="ml-14 mt-4 space-y-1 overflow-hidden justify-center"
                  >
                    {link.subLinks.map((subLink, subIdx) => (
                      <NavLink
                        key={subIdx}
                        to={subLink.href}
                        className="block text-base text-gray-600 dark:text-gray-400 hover:text-customTextColor-light dark:hover:text-customTextColor-light"
                      >
                        {subLink.label}
                      </NavLink>
                    ))}
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <motion.div
        animate={{ marginLeft: open ? 240 : 64 }}
        className="flex-1 transition-all duration-300 bg-white"
      >
        <div className="p-4">
          <Outlet />
        </div>
      </motion.div>
    </div>
  );
}
