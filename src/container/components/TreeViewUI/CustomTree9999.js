import React, { useState,useEffect } from 'react';

const TreeContext = React.createContext();

let nextId = 0;

export function Tree9999({ getNodeId,children, data, addChildrenItemsToParent, tag }) {
  const [folders, setFolders] = useState(data || []);

  const handleToggle = (id) => {
      console.log(id)
      getNodeId(id)
    setFolders((prevFolders) =>
      prevFolders.map((folder) =>
        folder.id === id ? { ...folder, hideChildren: !folder.hideChildren } : folder
      )
    );
    addChildrenItemsToParent(id)
  };



  const renderFolder = (folder) => {
    return (
      <li key={folder.id}>
        <div>{folder.name}</div>
        <button onClick={() => handleToggle(folder.id)}>+/-</button>
        {!folder.hideChildren && (
          <ul>
            {folder.children && folder.children.map((child) => renderFolder(child))}
          </ul>
        )}
      </li>
    );
  };

  return (
    <ul>
      {folders.map((folder) => (
        <TreeContext.Provider key={nextId++} value={{ handleToggle }}>
          {renderFolder(folder)}
        </TreeContext.Provider>
      ))}
    </ul>
  );
}

export function TreeChildren({ data }) {
  return (
    <ul>
      {data.map((folder) => (
        <li key={folder.id}>
          <div>{folder.name}</div>
          {folder.children && <TreeChildren data={folder.children} />}
        </li>
      ))}
    </ul>
  );
}
