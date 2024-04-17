import React, { useState, useRef, useEffect, useMemo } from 'react';

import ExplorerItem from 'container/components/ExplorerItem/ExplorerItem';
import RightOpenMenu from 'container/components/RightOpenMenu/RightOpenMenu';

const testData = [
  { id: 'data-1', itemName: 'data-1', itemType: 'dir' },
  { id: 'data-2', itemName: 'data-2', itemType: 'dir' },
  { id: 'data-3', itemName: 'data-3', itemType: 'dir' },
  { id: 'data-4', itemName: 'data-4', itemType: 'file' },
];
export default function ExplorerItemList() {
  const [menuVisible, setMenuVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [menuWidth, setMenuWidth] = useState(200); // 초기값 설정, 필요에 따라 조절
  const itemMenuRef = useRef(null);
  const [itemList, setItemList] = useState(testData);

  useEffect(() => {
    const clickOutside = (e) => {
      // 왼쪽 마우스 클릭 시 RightOpenMenu 닫기
      if (itemMenuRef.current && !itemMenuRef.current.contains(e.target)) {
        setMenuVisible(false);
      }
      // 아이템 영역 외 클릭 시 하이라이트 해제
      setSelctedItemIdx(null);
    };
    document.addEventListener('mousedown', clickOutside);

    return () => {
      document.removeEventListener('mousedown', clickOutside);
    };
  }, []);

  // 오른쪽 마우스 클릭 시 RightOpenMenu 위치 설정
  const OpenRightClickMenu = (e) => {
    e.preventDefault();
    const clickX = e.clientX;
    const screenWidth = window.innerWidth;
    const positionX =
      clickX + menuWidth > screenWidth ? clickX - menuWidth : clickX;
    setPosition({ x: positionX, y: e.clientY });
    setMenuVisible(true);
  };
  useEffect(() => {
    if (itemMenuRef.current && menuVisible) {
      const menuNode = itemMenuRef.current;
      const computedStyle = window.getComputedStyle(menuNode);
      const width =
        menuNode.offsetWidth +
        parseInt(computedStyle.marginLeft) +
        parseInt(computedStyle.marginRight);
      setMenuWidth(width);
    }
  }, [menuVisible]);

  // 아이템 클릭 시 하이라이트
  const [selectedItemIdx, setSelctedItemIdx] = useState(null);
  const handleItemClick = (index) => {
    setSelctedItemIdx(index);
  };
  // itemList 메모이제이션하여 item 렌더링
  const memoizedItemList = useMemo(() => {
    return itemList.map((it) => (
      <ExplorerItem
        key={it.id}
        index={it.id}
        selected={selectedItemIdx === it.id}
        onClick={() => handleItemClick(it.id)}
        name={it.itemName}
        type={it.itemType}
      />
    ));
  }, [itemList, selectedItemIdx]);

  // 새폴더 만들기
  let newIdx = itemList.length + 1;
  const addItem = () => {
    const newItem = {
      id: `data-${newIdx}`,
      itemName: `data-${newIdx}`,
      itemType: 'dir',
    };
    setItemList((prev) => [...prev, newItem]);
    setMenuVisible(false);
    setSelctedItemIdx(`data-${newIdx}`);
  };

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        padding: '20px',
        display: 'flex',
        alignItems: 'baseline',
        flexWrap: 'wrap',
      }}
      onContextMenu={OpenRightClickMenu}
    >
      {memoizedItemList}
      {menuVisible && (
        <div
          ref={itemMenuRef}
          style={{
            position: 'fixed',
            top: position.y,
            left: position.x,
          }}
        >
          <RightOpenMenu>
            <li onClick={addItem}>새폴더</li>
            <li>다운로드</li>
            <li>업로드</li>
            <li>속성</li>
          </RightOpenMenu>
        </div>
      )}
    </div>
  );
}
