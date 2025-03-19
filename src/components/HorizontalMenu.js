import React from "react";
import { Link } from "react-router-dom";

const categories = [
  { name: "Sheet Dashboard", path: "/sheetdashboard" },
  { name: "Machine Dashboard", path: "/machine" },
  { name: "Nut&Bolt Dashboard", path: "/" },
  { name: "Live", path: "/live" },
  { name: "Gaming", path: "/gaming" },
  { name: "Sports", path: "/sports" },
  { name: "News", path: "/news" },
];

const HorizontalMenu = () => {
  return (
    <div className="overflow-x-auto whitespace-nowrap bg-gradient-to-r from-customBgColor to-customTextColor-light shadow-md p-4 rounded-lg mb-4">
      <div className="flex space-x-4">
        {categories.map((category) => (
          <Link
            key={category.name}
            to={category.path}
            className="relative px-4 py-2 text-sm font-medium text-customBgColor-bg rounded-full bg-opacity-70 backdrop-blur-lg transition-transform duration-300 ease-in-out transform hover:scale-105 hover:bg-opacity-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
          >
            <span className="z-10">{category.name}</span>
            <div className="absolute inset-0 rounded-full bg-white opacity-10 transition-opacity duration-300 hover:opacity-20"></div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HorizontalMenu;
