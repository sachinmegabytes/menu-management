"use client";
import { useState } from "react";
import MenuTree from "./MenuTree";
import Dropdown from "./Dropdown";

const menuData = [
  {
    id: "1",
    title: "System Management",
    depth: 1,
    children: [
      {
        id: "1.1",
        title: "System Code",
        depth: 2,
        children: [
          { id: "1.1.1", title: "Code Registration", depth: 3 },
          { id: "1.1.2", title: "Code Registration - 2", depth: 3 },
        ],
      },
      { id: "1.2", title: "Properties", depth: 2 },
    ],
  },
  { id: "2", title: "API List", depth: 1 },
  { id: "3", title: "Users & Groups", depth: 1 },
];

export default function DynamicMenu() {
  const [menus, setMenus] = useState(menuData); // State for the menu data
  const [newMenu, setNewMenu] = useState(""); // State for new menu input
  const [expandAll, setExpandAll] = useState(false); // State to manage expand all/collapse all

  const menuOptions = ["system management", "API List", "Users & Groups"];

  // Expand all/collapse all logic
  const handleExpandAll = () => {
    setExpandAll(true);
  };

  const handleCollapseAll = () => {
    setExpandAll(false);
  };

  const handleAddMenu = () => {
    if (newMenu.trim()) {
      const newMenuItem = {
        id: `${menus.length + 1}`,
        title: newMenu,
        depth: 1, // New items start at depth 1, you can adjust this logic as needed
        children: [],
      };

      setMenus([...menus, newMenuItem]);
      setNewMenu("");
    }
  };

  return (
    <div>
      <Dropdown options={menuOptions} defaultOption="system management" />

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Menus</h1>

        {/* New Menu Input */}
        <div className="flex items-center">
          <input
            type="text"
            value={newMenu}
            onChange={(e) => setNewMenu(e.target.value)}
            placeholder="New Menu Title"
            className="border px-2 py-1 mr-2 text-black"
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={handleAddMenu}
          >
            + Add New Item
          </button>
        </div>
      </div>

      <div className="mt-4 bg-gray-50 p-6 rounded shadow-lg">
        {/* Menu Hierarchical Tree */}
        <div>
          {menus.map((menu) => (
            <MenuTree key={menu.id} menu={menu} expandAll={expandAll} />
          ))}
        </div>

        {/* Expand All / Collapse All buttons */}
        <div className="flex items-center">
          <button
            className="bg-gray-700 text-white px-4 py-2 rounded mr-2"
            onClick={handleExpandAll} // Connect handleExpandAll to button
          >
            Expand All
          </button>
          <button
            className="bg-gray-700 text-white px-4 py-2 rounded mr-2"
            onClick={handleCollapseAll}
          >
            Collapse All
          </button>
        </div>
      </div>
    </div>
  );
}
