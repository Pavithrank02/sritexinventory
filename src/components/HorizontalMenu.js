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
    <div className="overflow-x-auto whitespace-nowrap bg-white shadow-md p-2">
      <div className="flex space-x-4">
        {categories.map((category) => (
          <Link
            key={category.name}
            to={category.path}
            className="px-4 py-2 rounded-full text-sm font-medium bg-gray-200 text-gray-700 hover:bg-gray-300"
          >
            {category.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HorizontalMenu;
