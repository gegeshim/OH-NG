// import * as React from 'react';
import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { RichTreeView } from '@mui/x-tree-view/RichTreeView';
import { useTreeItem2Utils } from '@mui/x-tree-view/hooks';
import { TreeItem2 } from '@mui/x-tree-view/TreeItem2';

const CustomTreeItem = React.forwardRef(function MyTreeItem(props, ref) {
  const { id, itemId, label, data, children, onClick } = props;

  const { interactions } = useTreeItem2Utils({
    id: itemId || id,
    label: label,
    children: children,
  });

  // click label
  const handleContentClick = (event) => {
    event.defaultMuiPrevented = true;
    interactions.handleSelection(event);

    console.log('props : ', props);
  };

  // click icon
  const handleIconClick = (event) => {
    interactions.handleExpansion(event);
  };

  return (
    <TreeItem2
      {...props}
      ref={ref}
      slotProps={{
        content: { onClick: handleContentClick },
        iconContainer: { onClick: handleIconClick },
      }}
    />
  );
});

export default function IconExpansionTreeView({
  currentTreeData,
  clickHandler,
  childrenData,
}) {
  // currentTreeData 가공
  const ITEMS = currentTreeData.map((item) => ({
    id: String(item.seq || item.id),
    label: item.folder_name || item.name,
    children: [],
  }));
  const [itemData, setItemData] = useState(ITEMS);

  useEffect(() => {
    setItemData(ITEMS);
  }, [currentTreeData]);

  const handleItemClick = (id) => {
    clickHandler(id);
    console.log('ITEMS :::: ', ITEMS);
    const clickedItemData = childrenData.id.toString() === id;
    console.log(clickedItemData);
  };
  return (
    <Box
      sx={{
        minHeight: 180,
        flexGrow: 1,
        maxWidth: 300,
      }}
    >
      <RichTreeView
        aria-label="icon expansion"
        items={itemData}
        // getItemId={(item) => getId(item.id)}
        // slots={{ item: CustomTreeItem }}
        slots={{
          item: (props) => (
            <CustomTreeItem
              {...props}
              onClick={() => handleItemClick(props.itemId)}
            />
          ),
        }}
      />
    </Box>
  );
}
