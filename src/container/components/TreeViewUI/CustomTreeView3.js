import React, { useState, useEffect } from 'react';

import CustomTreeItem3 from './CustomTreeItem3';
import styles from './TreeViewUI.module.css';

export default function CustomTreeView3({
  data, expandedNodes, onNodeClick
}) {

  const handleNodeClick = (nodeId) => {
    // getNodeId(nodeId);
  };

  return (
    <div className={styles.customTreeView}>
      {data.map((parent) => (
        <CustomTreeItem3
          key={`customTreeParent-${parent.id}`}
          node={parent} expandedNodes={expandedNodes} onNodeClick={onNodeClick}
        />
      ))}
    </div>
  );
}
