import { useState, useEffect } from 'react';

const MenuTree = ({ menu, expandAll }) => {
  const [expanded, setExpanded] = useState(true);

  useEffect(() => {
    setExpanded(expandAll);
  }, [expandAll]);

  return (
    <div className="pl-4 border-l border-gray-300">
      <div className="cursor-pointer py-2" onClick={() => setExpanded(!expanded)}>
        <span>{expanded ? '-' : '+'}</span> {menu.title}
      </div>

      {expanded && menu.children && menu.children.length > 0 && (
        <div className="pl-4">
          {menu.children.map((subMenu) => (
            <MenuTree key={subMenu.id} menu={subMenu} expandAll={expandAll} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MenuTree;
