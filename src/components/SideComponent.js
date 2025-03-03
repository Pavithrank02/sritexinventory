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
    {
      label: "Dashboard",
      href: "/",
      icon: <IconBrandTabler className="h-5 w-5 flex-shrink-0" />,
    },
    {
      label: "Sheets Form",
      href: "/sheets",
      icon: <IconPerspective className="h-5 w-5 flex-shrink-0" />,
    },
    {
      label: "Channel & Plats Form",
      href: "/channel",
      icon: <IconRuler2 className="h-5 w-5 flex-shrink-0" />,
    },
    {
      label: "Delivery Challan",
      href: "/dc",
      icon: <IconTruckDelivery className="h-5 w-5 flex-shrink-0" />,
    },
    {
      label: "Nuts and Bolts",
      href: "/nuts",
      icon: <IconNut className="h-5 w-5 flex-shrink-0" />,
    },
  ];

  const [open, setOpen] = useState(false);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        className={cn(
          "fixed top-0 left-0 h-full bg-white dark:bg-neutral-900 shadow-lg transition-all duration-300",
          open ? "w-64" : "w-16"
        )}
      >
        <Sidebar open={open} setOpen={setOpen}>
          <SidebarBody className="flex flex-col h-full">
            <div
              className={cn(
                "flex items-center justify-between px-4 py-2",
                open ? "space-x-2" : "justify-center"
              )}
            >
              {open ? <Logo /> : <LogoIcon />}
             
            </div>
            <div className="mt-8 flex flex-col gap-2 overflow-y-auto">
              {links.map((link, idx) => (
                <NavLink
                  key={idx}
                  to={link.href}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center gap-4 p-2 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-neutral-700 rounded-md",
                      isActive && "bg-gray-400 dark:bg-neutral-600",
                      open ? "justify-start" : "justify-center"
                    )
                  }
                >
                  {link.icon}
                  {open && <span className="text-sm">{link.label}</span>}
                </NavLink>
              ))}
            </div>
          </SidebarBody>
        </Sidebar>
      </div>

      {/* Main Content */}
      <div
        className={cn(
          "ml-16 flex-1 transition-all duration-300",
          open && "ml-64"
        )}
      >
        <div className="p-4 md:p-10 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-2 h-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export const Logo = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="flex items-center space-x-2"
  >
    <div className="h-5 w-6 bg-black dark:bg-white rounded-lg flex-shrink-0" />
    <span className="font-medium text-black dark:text-white">Sritex Inventory</span>
  </motion.div>
);

export const LogoIcon = () => (
  <div className="h-5 w-6 bg-black dark:bg-white rounded-lg flex-shrink-0" />
);
