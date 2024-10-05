import { useState, useEffect } from "react";

const MenuTree = ({ menu, expandAll, selectMenu, selectedMenuId, deleteMenu, updateMenu }) => {
  const [expanded, setExpanded] = useState(true);
  const [hovered, setHovered] = useState();

  useEffect(() => {
    setExpanded(expandAll);
  }, [expandAll]);

  return (
    <div className="pl-4 w-auto border-l border-gray-300">
      <div
        className="py-2"
        onClick={() => setExpanded(!expanded)}
        onMouseEnter={() => setHovered(menu.id)}
        onMouseLeave={() => setHovered(null)}
      >
        <span className="cursor-pointer">{expanded ? "-" : "+"}</span>{" "}
        {menu.title}
        {hovered === menu.id && (
          <>
            <button
              className="w-6 h-6 mt-2 ml-2 rounded-full bg-blue-600 text-white"
              onClick={(e) => {
                e.stopPropagation();
                selectMenu(menu, true);
              }}
            >
              +
            </button>

            <button
              className="w-6 h-6 mt-2 ml-2 rounded-full bg-red-600 text-white"
              onClick={(e) => {
                e.stopPropagation();
                deleteMenu(menu);
              }}
            >
              -
            </button>
             <button
              className="w-6 h-6 mt-2 ml-2 rounded-full bg-yellow-600 text-white"
              onClick={(e) => {
                e.stopPropagation();
                selectMenu(menu, false);
              }}
            >
              ✎
            </button>
          </>
        )}
      </div>

      {expanded && menu.children && menu.children.length > 0 && (
        <div className="pl-4">
          {menu.children.map((subMenu) => (
            <div className="flex" key={subMenu.id}>
              <MenuTree
                menu={subMenu}
                expandAll={expandAll}
                selectMenu={selectMenu}
                selectedMenuId={selectedMenuId}
                deleteMenu={deleteMenu}
                updateMenu={updateMenu}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MenuTree;
