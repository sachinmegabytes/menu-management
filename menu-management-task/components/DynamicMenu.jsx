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
  const [selectedMenuId, setSelectedMenuId] = useState(null);

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

  const selectMenu = (parentId) => {
    setSelectedMenuId(parentId);
  }

  return (
    <div className="flex">
      {/* Left Side - Menu Tree and Buttons */}
      <div className="flex-1 pr-10">
        <Dropdown options={menuOptions} defaultOption="system management" />

        <div className="flex items-center mt-6">
          <button
            className={`${
              expandAll ? "bg-gray-700 text-white" : "text-black"
            } px-8 py-2 rounded-3xl mr-2 border-gray-200 border-2`}
            onClick={handleExpandAll}
          >
            Expand All
          </button>
          <button
            className={`${
              !expandAll ? "bg-gray-700 text-white" : "text-black"
            } px-8 py-2 rounded-3xl border-gray-200 border-2`}
            onClick={handleCollapseAll}
          >
            Collapse All
          </button>
        </div>

        {/* Menu Hierarchical Tree */}
        <div className="mt-6">
          {menus.map((menu) => (
            <MenuTree key={menu.id} menu={menu} expandAll={expandAll} selectMenu={selectMenu}/>
          ))}
        </div>
      </div>

      {/* Right Side - Input Fields */}
      <div className="flex-1">
        <div className="flex flex-col items-end">
          <div className="w-full mb-4">
            <label className="block text-gray-500 text-sm mb-1">Menu ID</label>
            <input
              type="text"
              value={selectedMenuId}
              disabled
              placeholder="New Menu Title"
              className="rounded-xl px-2 py-1 mr-2 text-black bg-gray-100 w-64 h-10"
            />
          </div>
          <div className="w-full mb-4">
            <label className="block text-gray-500 text-sm mb-1">Depth</label>
            <input
              type="text"
              value={newMenu}
              onChange={(e) => setNewMenu(e.target.value)}
              placeholder="New Menu Title"
              className="rounded-xl px-2 py-1 mr-2 text-black bg-gray-100 w-64 h-10"
            />
          </div>
          <div className="w-full mb-4">
            <label className="block text-gray-500 text-sm mb-1">
              Parent Data
            </label>
            <input
              type="text"
              value={newMenu}
              onChange={(e) => setNewMenu(e.target.value)}
              placeholder="New Menu Title"
              className="rounded-xl px-2 py-1 mr-2 text-black bg-gray-100 w-64 h-10"
            />
          </div>
          <div className="w-full mb-4">
            <label className="block text-gray-500 text-sm mb-1">Name</label>
            <input
              type="text"
              value={newMenu}
              onChange={(e) => setNewMenu(e.target.value)}
              placeholder="New Menu Title"
              className="rounded-xl px-2 py-1 mr-2 text-black bg-gray-100 w-64 h-10"
            />
          </div>
          <div className="w-full mb-4">
            <button className="bg-blue-600 w-64 text-white font-bold py-3 px-10 rounded-full text-xl relative" onClick={()=>handleAddMenu()}>
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
