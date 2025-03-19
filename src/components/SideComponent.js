"use client";
import React, { useState } from "react";
import { Sidebar, SidebarBody } from "../components/ui/sidebar.tsx";
import {
  IconBrandTabler,
  IconNut,
  IconPerspective,
  IconRuler2,
  IconTruckDelivery,
  IconBuildingFactory,
} from "@tabler/icons-react";
import { NavLink, Outlet } from "react-router-dom";
import { cn } from "../lib/utils.ts";
import img from "../assets/images/sritex.jpg";
import HorizontalMenu from "./HorizontalMenu.js";

export function SidebarDemo() {
  const [open, setOpen] = useState(false);
  const links = [
    {
      label: "Dashboard",
      href: "/",
      icon: <IconBrandTabler className="h-6 w-6 flex-shrink-0" />,
    },
    {
      label: "Sheets Form",
      href: "/sheets",
      icon: <IconPerspective className="h-6 w-6 flex-shrink-0" />,
    },
    {
      label: "Channel & Plats Form",
      href: "/channel",
      icon: <IconRuler2 className="h-6 w-6 flex-shrink-0" />,
    },
    {
      label: "Delivery Challan",
      href: "/dc",
      icon: <IconTruckDelivery className="h-6 w-6 flex-shrink-0" />,
    },
    {
      label: "Nuts and Bolts",
      href: "/nuts",
      icon: <IconNut className="h-6 w-6 flex-shrink-0" />,
    },
    {
      label: "Machine",
      href: "/machine",
      icon: <IconBuildingFactory className="h-6 w-6 flex-shrink-0" />,
    },
  ];

  return (
    <div className="flex h-screen ">
      {/* Sidebar */}
      <div
        className={cn(
          "flex justify-center items-center fixed h-full bg-customBgColor-bg dark:bg-customBgColor-bg shadow-lg transition-all duration-300",
          open ? "w-64" : "w-24"
        )}
      >
        <Sidebar open={open} setOpen={setOpen}>
          <SidebarBody className="flex flex-col bg-customBgColor-bg">
            {/* Logo Section */}
            <div
              className={cn(
                "flex items-center justify-center px-4 py-4 border-b border-neutral-300 dark:border-neutral-700",
                open ? "justify-center" : "justify-center"
              )}
            >
              {open ? (
                <div className="flex items-center gap-2">
                  <img src={img} alt="Sritex Logo" className="h-8 w-auto" />
                  <span className="text-lg font-bold text-customTextColor dark:text-white">
                    Sritex Inventory
                  </span>
                </div>
              ) : (
                <img
                  src={img}
                  alt="Sritex Logo"
                  className="h-8 w-8 rounded-full"
                />
              )}
            </div>
            {/* Links Section */}
            <div className="mt-4 flex flex-col gap-2 overflow-y-auto">
              {links.map((link, idx) => (
                <NavLink
                  key={idx}
                  to={link.href}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center gap-4 p-2 text-customTextColor dark:text-customTextColor-light hover:bg-customTextColor-light dark:hover:bg-customTextColor-white rounded-md",
                      isActive &&
                        "bg-customBgColor-bg dark:bg-customBgColor-bg",
                      open ? "justify-start" : "justify-center"
                    )
                  }
                >
                  {link.icon}
                  {open && (
                    <span className="text-sm font-extrabold">{link.label}</span>
                  )}
                </NavLink>
              ))}
            </div>
          </SidebarBody>
        </Sidebar>
      </div>

      {/* Main Content */}
          <div
        className={cn(
          "ml-24 flex-1 transition-all duration-300",
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
