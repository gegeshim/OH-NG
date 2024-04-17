import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
} from 'react';
import { UseDispatch, useSelector } from 'react-redux';

import styles from './ExplorerItemList.module.css';
import ExplorerItem2 from 'container/components/ExplorerItem/ExplorerItem2';
import RightOpenMenu from 'container/components/RightOpenMenu/RightOpenMenu';
import {
  setViewMode,
  setCurrentFolderDataList,
  setAddNewForder,
  setAddCheckedItem,
  setRemoveItem,
  setRemoveCheckedItem,
  setCheckedAllItems,
} from '../../../redux/slices/explorerSlice';
import { formattedDate } from 'utils/formattedDate';
import { useDispatch } from 'react-redux';
import { requestApi } from 'services/axios';

export default function ExplorerItemList2() {
  const dispatch = useDispatch();
  const [menuVisible, setMenuVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [menuWidth, setMenuWidth] = useState(200); // 초기값 설정, 필요에 따라 조절
  const itemMenuRef = useRef(null);
  // const [itemList, setItemList] = useState(testData); //아이템(폴더,파일) 목록

  const [itemList, setItemList] = useState([]); //아이템(폴더,파일) 목록
  useEffect(() => {
    // 변경 필요
    requestApi('get', '/api/explorers/contents?treeID=202', {}).then((res) => {
      console.log(res.data);
      dispatch(setCurrentFolderDataList(res.data.children));
    });
    // setItemList(testData);
  }, [dispatch]);

  const getDataList = useSelector(
    (state) => state.explorer.currentFolderDataList
  );

  useEffect(() => {
    console.log('getDataList: ', getDataList);
  }, [getDataList]);

  const getFolderData = () => {};

  // 탐색기 보기 모드 (현재 상태)
  const viewMode = useSelector((state) => state.explorer.viewMode);
  useEffect(() => {
    const clickOutside = (e) => {
      // 왼쪽 마우스 클릭 시 RightOpenMenu 닫기
      if (itemMenuRef.current && !itemMenuRef.current.contains(e.target)) {
        setMenuVisible(false);
      }
      setSelctedItemIdx(null);
      // console.log('selectedItemIdx', selectedItemIdx);
    };
    document.addEventListener('mousedown', clickOutside);

    return () => {
      document.removeEventListener('mousedown', clickOutside);
    };
  }, []);

  // 오른쪽 마우스 클릭 시 RightOpenMenu 위치 설정
  const OpenRightClickMenu = (e) => {
    e.preventDefault();
    e.stopPropagation();
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
  const [selectedItemIdx, setSelctedItemIdx] = useState(null); // 선택한 아이템 index
  const handleItemClick = (id) => {
    setSelctedItemIdx(id);
  };

  // item checkbox 클릭
  const handleCheckboxChange = (id, isChecked) => {
    console.log('isChecked:: ', isChecked);
    if (isChecked) {
      dispatch(setAddCheckedItem(id));
    } else {
      dispatch(setRemoveCheckedItem(id));
    }
  };

  const currentFolderDataList = useSelector(
    (state) => state.explorer.currentFolderDataList
  );
  // 새폴더 생성하기
  let newIdx = getDataList.length + 1;
  const handleAddNewItem = () => {
    // newIdx = newIdx + 1;
    const newItem = {
      id: `data-${newIdx}`,
      itemName: `data-${newIdx}`,
      itemType: 'dir',
      createDate: formattedDate(),
    };
    // setItemList((prev) => [...prev, newItem]);
    dispatch(setAddNewForder(newItem));
    setMenuVisible(false);
    setSelctedItemIdx(`data-${newIdx}`);
  };
  // item 삭제하기
  const handleDeleteItem = (id) => {
    // setItemList((prevItemList) => {
    //   const removeItem = prevItemList.findIndex((item) => item.id === id);
    //   if (removeItem !== -1) {
    //     const updatedItemList = [...prevItemList];
    //     updatedItemList.splice(removeItem, 1);
    //     return updatedItemList;
    //   }
    //   return prevItemList;
    // });
    dispatch(setRemoveItem(id));
    setSelctedItemIdx(null);
  };

  // item 이름 변경하기
  /** 변경 필요!!! */
  const handleOnChangeName = (itemId, newName) => {
    setItemList((prevItemList) =>
      prevItemList.map((it) =>
        it.id === itemId ? { ...it, itemName: newName } : it
      )
    );
  };

  // itemList 메모이제이션하여 item 렌더링
  const memoizedItemList = useMemo(() => {
    return getDataList.map((it) => (
      <ExplorerItem2
        key={it.id}
        id={it.id}
        selectedItem={selectedItemIdx}
        onItemClick={handleItemClick}
        onItemNameChange={handleOnChangeName}
        onItemDelete={handleDeleteItem}
        name={it.name}
        type={it.type}
        checkboxHandler={handleCheckboxChange}
        mod={it.mod_date}
        reg={it.reg_date}
      />
    ));
  }, [getDataList, selectedItemIdx]);

  return (
    <>
      {viewMode === 'list' && (
        <ul className={styles.explorerSorting}>
          <li></li>
          <li>이름</li>
          <li>크기</li>
          <li>수정일</li>
          <li>부가정보</li>
        </ul>
      )}

      <div
        className={`${styles.explorerItemList} ${styles[viewMode + 'View']}`}
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
              zIndex: 10,
            }}
          >
            <RightOpenMenu>
              <li onClick={handleAddNewItem}>
                <span>새폴더</span>
              </li>
              <li>
                <span>다운로드</span>
              </li>
              <li>
                <span>업로드</span>
              </li>
              <li>
                <span>속성</span>
              </li>
            </RightOpenMenu>
          </div>
        )}
      </div>
    </>
  );
}
