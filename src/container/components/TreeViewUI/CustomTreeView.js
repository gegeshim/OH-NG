import React, { useState, useEffect } from 'react';
import { TreeView } from '@mui/x-tree-view';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import { styled } from '@mui/material/styles';
// import { useTreeViewApiRef } from '@mui/x-tree-view/hooks';

import tree_chevron_open from 'assets/images/tree_chevron_open.png';
import tree_chevron_close from 'assets/images/tree_chevron_close.png';
import tree_folder from 'assets/images/tree_folder.png';
import tree_folder_active from 'assets/images/tree_folder_active.png';

// 사용자 지정 TreeItem 컴포넌트 정의
const CustomTreeItem = styled(TreeItem)(({ theme }) => ({
  '& .MuiTreeItem-label': {
    // fontFamily: 'SUIT, sans-serif',
  },
  '& .MuiTreeItem-expanded .MuiTreeItem-iconContainer': {
    backgroundImage: `url(${tree_chevron_open})`, // 펼쳐진 폴더 아이콘 이미지
    backgroundSize: 'contain',
  },
  '& .Mui-selected': {
    backgroundColor: 'transparent',
  },
  '& .Mui-selected.Mui-focused': {
    backgroundColor: 'transparent',
  },
  // '& .MuiTreeItem-collapsed .MuiTreeItem-iconContainer': {
  //   width: '16px',
  //   height: '16px',
  //   backgroundImage: `url(${tree_chevron_close})`, // 닫힌 폴더 아이콘 이미지
  //   backgroundSize: 'contain',
  // },
  // '& .Mui-selected .MuiTreeItem-iconContainer': {
  //   backgroundImage: `url(${tree_folder_active})`, // 활성화된 폴더 아이콘 이미지
  //   backgroundSize: 'contain',
  // },
}));

export default function TreeViewUI({ list, clickHandler }) {
  const handleClickItem = (id) => {
    clickHandler(id);
  };

  return (
    <div>
      <TreeView
        className="customTreeView"
        aria-label="file system navigator"
        defaultCollapseIcon={<img src={tree_chevron_open} />} // 노드가 축소된 상태일 때의 아이콘
        defaultExpandIcon={<img src={tree_chevron_close} />} // 노드가 확장된 상태일 때의 아이콘
        // expanded={['44']}
      >
        {list &&
          list.map((item) => {
            return (
              <CustomTreeItem
                key={item.id}
                nodeId={`'${item.id}'`}
                label={item.name}
                // label=''
                className="treeViewParent"
                sx={{
                  '& .MuiTreeItem-label': {
                    // fontSize: '16px',
                    // lineHeight: '24px',
                    // fontFamily: 'SUIT, sans-serif',
                    // fontWeight: '600',
                    // color: '#27282E',
                  },
                }}
                onClick={() => handleClickItem(item.id)}
              >
                {item.children &&
                  item.children.map((child) => {
                    return (
                      <CustomTreeItem
                        key={child.id}
                        nodeId={`'${child.id}'`}
                        label={child.name}
                        labelicon={tree_folder}
                        className="treeViewChildren"
                        sx={{
                          // '& .Mui-selected.Mui-focused': {
                          //   backgroundColor: 'transparent',
                          // },
                          '& .MuiTreeItem-label': {
                            paddingLeft: '6px',
                          },
                          '& .Mui-selected .MuiTreeItem-label': {
                            color: '#1C7EE8',
                            fontWeight: '600',
                          },
                          '& .MuiTreeItem-iconContainer': {
                            width: '15px',
                            height: '15px',
                            marginRight: 0,
                            backgroundImage: `url(${tree_folder})`, // 기본 폴더 아이콘 이미지
                            backgroundSize: 'contain',
                          },
                          '& .Mui-selected .MuiTreeItem-iconContainer': {
                            backgroundImage: `url(${tree_folder_active})`, // 활성화된 폴더 아이콘 이미지
                            backgroundSize: 'contain',
                          },
                        }}
                        onClick={() => handleClickItem(child.id)}
                      />
                    );
                  })}
              </CustomTreeItem>
            );
          })}
      </TreeView>
    </div>
  );
}
