import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styles from './ExplorerItem.module.css';
import RightOpenMenu from 'container/components/RightOpenMenu/RightOpenMenu';
import { requestApi } from 'services/axios';
import { setCurrentFolderDataList } from '../../../redux/slices/explorerSlice';

export default function ExplorerItem2({
  id,
  selectedItem,
  onItemClick,
  onItemNameChange,
  onItemDelete,
  name,
  type,
  checkedId,
  checkboxHandler,
  mod,
  reg,
}) {
  const [menuVisible, setMenuVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const itemMenuRef = useRef(null);
  const dispatch = useDispatch();

  const handleItemClick = () => {
    setMenuVisible(false);
    onItemClick(id);
    // handleCheckboxChange();
  };

  // checkbox 관리
  const checkedItems = useSelector((state) => state.explorer.checkedItems);
  const [isChecked, setIsChecked] = useState(checkedItems.includes(id));
  const handleCheckboxChange = () => {
    const newChecked = !isChecked;
    setIsChecked(newChecked);
    checkboxHandler(id, newChecked);
    onItemClick(id);
  };
  useEffect(() => {
    setIsChecked(checkedItems.includes(id)); // 체크된 아이템이 업데이트될 때 isChecked 상태 업데이트
  }, [checkedItems]);

  const handleItemDoubleClick = () => {
    requestApi('get', `/api/explorers/tree?treeID=${id}`, {}).then((res) => {
      dispatch(setCurrentFolderDataList(res.data.children));
    });
  };

  // 우클릭 시 노출되는 메뉴
  const OpenRightClickMenu = (e) => {
    e.preventDefault();
    e.stopPropagation(); // 이벤트 전파 중지
    const clickX = e.clientX;
    const clickY = e.clientY;
    setPosition({ x: clickX, y: clickY });
    setMenuVisible(true); // 드롭다운 메뉴 보이도록 상태 변경
    onItemClick(id);
  };

  // ExplorerItem 영역 벗어나면 메뉴 닫기
  useEffect(() => {
    const clickOutside = (e) => {
      if (itemMenuRef.current && !itemMenuRef.current.contains(e.target)) {
        setMenuVisible(false); // ExplorerItem 영역 외부를 클릭하면 메뉴 닫기
        if (activeNameInput) {
          // 이름 변경 후 외부 영역 클릭 시 onChangeName 실행
          onChangeName();
          setActiveNameInput(false);
        }
      }
    };
    document.addEventListener('mousedown', clickOutside);
    return () => {
      document.removeEventListener('mousedown', clickOutside);
    };
  }, []);

  // 이름 변경하기
  const [activeNameInput, setActiveNameInput] = useState(false);
  const [newName, setNewName] = useState(name);
  const onClickChangeName = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveNameInput(true);
    setMenuVisible(false);
  };
  const onChangeName = () => {
    setActiveNameInput(false); // input 상태 비활성화
    onItemNameChange(id, newName); // 변경된 이름 전달
  };
  const onEnterPress = (e) => {
    if (e.key === 'Enter') {
      onChangeName();
    }
  };

  // 삭제하기
  const onDelete = () => {
    onItemDelete(id);
  };

  // 보기 모드
  const viewMode = useSelector((state) => state.explorer.viewMode);

  // 클래스
  const itemClass = `${styles.ExplorerItem} ${
    isChecked ? styles['focus'] : ''
  } ${type === 'folder' ? styles['folder'] : ''} ${
    type === 'file' ? styles['file'] : ''
  } ${styles[viewMode + 'View']}`;

  const iconClass = `${styles.explorerItemImg} ${
    type === 'folder' ? 'folder_big' : ''
  } ${type === 'file' ? 'file_etc' : ''}`;

  return (
    <div
      ref={itemMenuRef}
      className={itemClass}
      onClick={handleItemClick}
      onContextMenu={OpenRightClickMenu}
      onDoubleClick={handleItemDoubleClick}
      // onMouseDown={handleMouseDown}
    >
      <div className={styles.itemWrap}>
        <div className={styles.explorerItemCheckbox}>
          <div className="checkbox small">
            <input
              type="checkbox"
              id={id}
              // checked={isChecked}
              checked={checkedItems.includes(id)}
              // onChange={handleCheckboxChange}
              onChange={handleCheckboxChange}
            />
            <label htmlFor={id}></label>
          </div>
        </div>
        <div className={styles.listItemWrap}>
          <div className={styles.imgWrap}>
            <div className={iconClass}></div>
          </div>
          <div className={styles.explorerItemName}>
            {activeNameInput ? (
              <input
                type="text"
                value={newName} // defaultValue 대신 value를 사용하여 수정된 값을 표시
                onChange={(e) => setNewName(e.target.value)}
                onBlur={onChangeName}
                onKeyDown={onEnterPress}
                autoFocus
              />
            ) : (
              <p onClick={() => setActiveNameInput(true)}>{newName}</p> // span 클릭 시 input으로 변경
            )}
          </div>
        </div>
        {viewMode === 'list' && (
          <div>
            <p className={styles.explorerItem_size}>00MB</p>
          </div>
        )}
        <div className={styles.explorerItemDate}>{mod}</div>
        {viewMode === 'list' && (
          <div className={styles.explorerItemInfo}>-</div>
        )}
      </div>

      {menuVisible && (
        <div
          style={{
            position: 'fixed',
            top: position.y,
            left: position.x,
            zIndex: 10,
          }}
        >
          <RightOpenMenu>
            <li onClick={onClickChangeName}>
              <span>이름 바꾸기</span>
            </li>
            <li>
              <span>정보</span>
            </li>
            <li onClick={onDelete}>
              <span>삭제</span>
            </li>
          </RightOpenMenu>
        </div>
      )}
    </div>
  );
}
