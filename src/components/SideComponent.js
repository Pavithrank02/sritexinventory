"use client";
import React, { useState } from "react";
import { Sidebar, SidebarBody } from "../components/ui/sidebar.tsx";
import {
  IconBrandTabler,
  IconNut,
  IconPerspective,
  IconRuler2,
  IconTruckDelivery,
} from "@tabler/icons-react";
import { NavLink, Outlet } from "react-router-dom";
import { motion } from "framer-motion";
import { cn } from "../lib/utils.ts";

export function SidebarDemo() {
  const links = [
    { label: "Dashboard", href: "/", icon: <IconBrandTabler /> },
    { label: "Sheets Form", href: "/sheets", icon: <IconPerspective /> },
    { label: "Channel & Plats Form", href: "/channel", icon: <IconRuler2 /> },
    { label: "Delivery Challan", href: "/dc", icon: <IconTruckDelivery /> },
    { label: "Nuts and Bolts", href: "/nuts", icon: <IconNut /> },
  ];

  const [open, setOpen] = useState(false);

  return (
    <div
      className={cn(
        "rounded-md flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full flex-1 max-w-7xl mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden",
        "h-screen w-screen overflow-auto"
      )}
    >
      {/* Sidebar */}
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="fixed flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <NavLink
                  key={idx}
                  to={link.href}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center gap-4 p-2 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-neutral-700 rounded-md",
                      isActive && "bg-gray-400 dark:bg-neutral-600"
                    )
                  }
                >
                  {link.icon}
                  <span>{link.label}</span>
                </NavLink>
              ))}
            </div>
          </div>
        </SidebarBody>
      </Sidebar>

      {/* Main Content */}
      <div className="flex-1 p-4">
        <Outlet />
      </div>
    </div>
  );
}

export const Logo = () => (
  <NavLink
    to="/"
    className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
  >
    <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="font-medium text-black dark:text-white whitespace-pre"
    >
      Sritex Inventory
    </motion.span>
  </NavLink>
);

export const LogoIcon = () => (
  <NavLink
    to="/"
    className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
  >
    <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
  </NavLink>
);
