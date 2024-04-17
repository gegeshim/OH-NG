import React, { useState, useEffect } from 'react';

import CustomTreeItem2 from './CustomTreeItem2';
import styles from './TreeViewUI.module.css';

export default function CustomTreeView2({
  data,
  getNodeId,
  getSelectedNodeChildren,
}) {
  const handleNodeClick = (nodeId) => {
    getNodeId(nodeId);
  };

  return (
    <div className={styles.customTreeView}>
      {data.map((parent) => (
        <CustomTreeItem2
          key={`customTreeParent-${parent.id}`}
          node={parent}
          getNodeId={handleNodeClick}
        />
      ))}
    </div>
  );
}
