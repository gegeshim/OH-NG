import React, { useState, useEffect } from 'react';

import styles from './TreeViewUI.module.css';
import tree_chevron_open from 'assets/images/tree_chevron_open.png';
import tree_chevron_close from 'assets/images/tree_chevron_close.png';

export default function CustomTreeItem3({
  node,expandedNodes, onNodeClick
}) {
//   const [isOpen, setIsOpen] = useState(false);
const isOpen = expandedNodes.includes(node.id);
  const handleIconClick = (e) => {
    e.preventDefault();
    // setIsOpen(!isOpen);
    onNodeClick(node.id)
  };



  return (
    <div className={styles.customTreeItem}>
      <div className={styles.itemWrap}>
        <div className={styles.chevronIcon}>
          <button type="button" onClick={(e) => handleIconClick(e, node.id)}>
            {node.children && isOpen ? (
              <img src={tree_chevron_open} />
            ) : (
              <img src={tree_chevron_close} />
            )}
          </button>
        </div>
        <div className={styles.itemName}>{node.name}</div>
      </div>
      {isOpen && node.children && (
        <div>
          {node.children.map((child) => (
            <CustomTreeItem3
              key={`customTreeItemChildren-${child.id}`}
              node={child}
              expandedNodes={expandedNodes} onNodeClick={onNodeClick}
            />
          ))}
        </div>
      )}
    </div>
  );
}
