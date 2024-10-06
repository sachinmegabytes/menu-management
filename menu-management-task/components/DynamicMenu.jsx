import { useEffect, useState } from "react";
import MenuTree from "./MenuTree";
import Dropdown from "./Dropdown";

export default function DynamicMenu() {
  const [menus, setMenus] = useState(); // State for the menu data
  const [expandAll, setExpandAll] = useState(true); // State to manage expand all/collapse all
  const [selectedMenuId, setSelectedMenuId] = useState("");
  const [newMenuTitle, setNewMenuTitle] = useState("");
  const [newMenuDepth, setNewMenuDepth] = useState(0);
  const [newMenuParent, setNewMenuParent] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [currentMenu, setCurrentMenu] = useState({});

  const [loading, setLoading] = useState(true);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  
  const fetchMenus = async () => {
    const res = await fetch(`${API_URL}/menu`);
    const data = await res.json();
    setMenus(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchMenus();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  // Expand all/collapse all logic
  const handleExpandAll = () => {
    setExpandAll(true);
  };

  const handleCollapseAll = () => {
    setExpandAll(false);
  };

  const handleAddMenu = () => {
    setLoading(true);
    const newMenu = {
      name: newMenuTitle,
      depth: newMenuDepth,
      parentId: selectedMenuId,
    };
    fetch(`${API_URL}/menu`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newMenu),
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        throw new Error(err);
      })
      .finally(() => {
        setNewMenuTitle("");
        setNewMenuDepth("");
        setNewMenuParent("");
        fetchMenus();
        setLoading(false);
      });
  };

  const selectMenu = (parent, isCreate) => {
    setSelectedMenuId(parent.id);
    setNewMenuParent(parent.title);
    setNewMenuDepth(parent.depth + 1);
    if (isCreate) {
      setIsEdit(false);
      setCurrentMenu({});
    } else {
      setCurrentMenu(parent);
      setIsEdit(true);
    }
  };

  const deleteMenu = (menu) => {
    setLoading(true);
    fetch(`${API_URL}/menu/${menu.id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        throw new Error(err);
      })
      .finally(() => {
        fetchMenus();
        setLoading(false);
      });
  };

  const updateMenu = () => {
    setLoading(true);
    fetch(`${API_URL}/menu/${currentMenu.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: newMenuTitle,
        depth: currentMenu.depth,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        setCurrentMenu({});
        setIsEdit(false);
      })
      .catch((err) => {
        setLoading(false);
        throw new Error(err);
        setCurrentMenu({});
        setIsEdit(false);
      })
      .finally(() => {
        fetchMenus(); // Refresh the menu list
        setLoading(false);
        setCurrentMenu({});
        setIsEdit(false);
        setNewMenuTitle("");
      });
  };

  return (
    <div className="flex flex-col md:flex-row px-4 md:px-10 py-6">
      {/* Left Side - Menu Tree and Buttons */}
      <div className="md:flex-1 pr-0 md:pr-10">
        <Dropdown
          options={["system management", "API List", "Users & Groups"]}
          defaultOption="system management"
        />

        <div className="flex items-center mt-4 md:mt-6 space-x-2">
          <button
            className={`${
              expandAll ? "bg-gray-700 text-white" : "text-black"
            } px-6 py-2 rounded-full border-gray-200 border-2 w-full md:w-auto`}
            onClick={handleExpandAll}
          >
            Expand All
          </button>
          <button
            className={`${
              !expandAll ? "bg-gray-700 text-white" : "text-black"
            } px-6 py-2 rounded-full border-gray-200 border-2 w-full md:w-auto`}
            onClick={handleCollapseAll}
          >
            Collapse All
          </button>
        </div>

        {/* Menu Hierarchical Tree */}
        <div className="mt-4 md:mt-6 overflow-auto h-96">
          {menus.map((menu) => (
            <MenuTree
              key={menu.id}
              menu={menu}
              expandAll={expandAll}
              selectMenu={selectMenu}
              selectedMenuId={selectedMenuId}
              deleteMenu={deleteMenu}
              updateMenu={updateMenu}
            />
          ))}
        </div>
      </div>

      {/* Right Side - Input Fields */}
      <div className="md:flex-1 mt-6 md:mt-0">
        <div className="flex flex-col items-end">
          <div className="w-full mb-4">
            <label className="block text-gray-500 text-sm mb-1">Menu ID</label>
            <input
              type="text"
              value={selectedMenuId}
              disabled
              className="rounded-xl px-2 py-1 text-gray-400 bg-gray-100 w-full md:w-64 h-10"
            />
          </div>
          <div className="w-full mb-4">
            <label className="block text-gray-500 text-sm mb-1">Depth</label>
            <input
              type="text"
              value={newMenuDepth}
              onChange={(e) => setNewMenuDepth(e.target.value)}
              className="rounded-xl px-2 py-1 text-black bg-gray-100 w-full md:w-64 h-10"
            />
          </div>
          <div className="w-full mb-4">
            <label className="block text-gray-500 text-sm mb-1">
              Parent Data
            </label>
            <input
              type="text"
              value={newMenuParent}
              disabled
              className="rounded-xl px-2 py-1 text-gray-500 bg-gray-100 w-full md:w-64 h-10"
            />
          </div>
          <div className="w-full mb-4">
            <label className="block text-gray-500 text-sm mb-1">Name</label>
            <input
              type="text"
              value={newMenuTitle}
              onChange={(e) => setNewMenuTitle(e.target.value)}
              className="rounded-xl px-2 py-1 text-black bg-gray-100 w-full md:w-64 h-10"
            />
          </div>
          <div className="w-full mb-4">
            <button
              className="bg-blue-600 w-full md:w-64 text-white font-bold py-3 rounded-full"
              onClick={() => (isEdit ? updateMenu() : handleAddMenu())}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
