import React, { useState, useRef, useEffect } from 'react';

import styles from './ExplorerItem.module.css';
import RightOpenMenu from 'container/components/RightOpenMenu/RightOpenMenu';

export default function ExplorerItem({ index, selected, onClick, name, type }) {
  const [menuVisible, setMenuVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [menuWidth, setMenuWidth] = useState(200); // 초기값 설정, 필요에 따라 조절
  const itemMenuRef = useRef(null);
  const [selectedItemIdx, setSelctedItemIdx] = useState(null); // 아이템 하이라이트
  // 아이템 영역 외 클릭 시 하이라이트 해제
  useEffect(() => {
    const clickOutside = (e) => {
      setSelctedItemIdx(false);
    };
    document.addEventListener('mousedown', clickOutside);
    return () => {
      document.removeEventListener('mousedown', clickOutside);
    };
  }, []);

  // 아이템 클릭 시 하이라이트
  const clickHighlight = (index) => {
    setSelctedItemIdx(index);
  };

  const handleRightClick = (e) => {
    e.preventDefault();
    onClick(index);
  };

  const itemClass = `${styles.ExplorerItem} ${
    selected ? styles['focus'] : ''
  } ${type === 'dir' ? styles['dir'] : ''} ${
    type === 'file' ? styles['file'] : ''
  }`;
  return (
    <div className={itemClass} onClick={handleRightClick}>
      <div className={styles.ExplorerItem_img}></div>
      <p className={styles.ExplorerItem_name}>{name}</p>
      {menuVisible && (
        <RightOpenMenu>
          <li>이름 바꾸기</li>
          <li>정보</li>
          <li>삭제</li>
        </RightOpenMenu>
      )}
    </div>
  );
}
