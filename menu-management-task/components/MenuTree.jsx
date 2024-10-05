import { useState, useEffect } from "react";

const MenuTree = ({ menu, expandAll, selectMenu }) => {
  const [expanded, setExpanded] = useState(true);
  const [isParentHovered, setIsParentHovered] = useState(false);
  const [isChildHovered, setIsChildHovered] = useState(false);


  useEffect(() => {
    setExpanded(expandAll);
  }, [expandAll]);

  return (
    <div className="pl-4 w-auto border-l border-gray-300">
      <div
        className="py-2"
        onClick={() => setExpanded(!expanded)}
        onMouseEnter={() => setIsParentHovered(true)}
        onMouseLeave={() => setIsParentHovered(false)}
      >
        <span className="cursor-pointer">{expanded ? "-" : "+"}</span>{" "}
        {menu.title}
        {isParentHovered && (
          <button className="w-6 h-6 mt-2 ml-2 rounded-full bg-blue-600 text-white" onClick={()=>selectMenu(menu.id)}>
            +
          </button>
        )}
      </div>

      {expanded && menu.children && menu.children.length > 0 && (
        <div className="pl-4">
          {menu.children.map((subMenu) => (
            <div className="flex" key={subMenu.id} 
            onClick={() => setExpanded(!expanded)}
            onMouseEnter={() => setIsChildHovered(true)}
            onMouseLeave={() => setIsChildHovered(false)}>
              <MenuTree menu={subMenu} expandAll={expandAll} />
              {isChildHovered && (
          <button className="w-6 h-6 mt-2 ml-2 rounded-full bg-blue-600 text-white" onClick={()=>selectMenu(subMenu.id)}>
            +
          </button>
        )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MenuTree;
