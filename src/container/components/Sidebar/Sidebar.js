import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import styles from './Sidebar.module.css';
import { requestApi } from 'services/axios';
import CustomTreeView from '../TreeViewUI/CustomTreeView';
import CustomTreeView2 from '../TreeViewUI/CustomTreeView2';
import { setCurrentFolderDataList } from '../../../redux/slices/explorerSlice';

export default function Sidebar({ sidebarToggle, toggleTheme }) {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const [isLanguageMenuOpen, setLanguageMenuOpen] = useState(false);

  // 언어 설정
  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    dispatch({
      type: 'language/setLanguage',
      payload: lang,
    });
    setLanguageMenuOpen(false);
  };

  // 탐색기 tree 불러오기
  const [folderId, setFolderId] = useState('44'); // 선택한 폴더의 아이디
  const [treeData, setTreeData] = useState([]); // 불러온 트리의 전체 데이터
  const [_treeData, set_treeData] = useState([]);
  const [treeItemChildren, setTreeItemChildren] = useState([]);

  // 첫번째
  const getExplorerTree = (id) => {
    requestApi('get', `/api/explorers/tree?treeID=${id}`, {})
      .then((res) => {
        setTreeData([res.data]);
        setTreeItemChildren(res.data.children);

        // 현재 선택된 노드 아이디
        const currentNode = res.data;
        const currentNodeId = res.data.id;

        // 현재 node의 하위 node
        const childrenNodes = res.data.children;
        // addChildrenNode(id);
      })
      .catch((error) => {
        console.log(`/api/explorers/tree?treeID=${id}`, error);
      });
  };
  // 하위에 노드 추가하기
  const addChildrenNode = (itemId) => {
    setTreeData((prevTreeData) => {
      return {
        ...prevTreeData,
        children: prevTreeData.children.map((item) => {
          if (item.id === itemId) {
            return {
              ...item,
              children: [{ id: '333333', name: '33333333' }],
            };
          }
          return item;
        }),
      };
    });
  };

  // 폴더로 이동

  const moveSelectedFolder = (id) => {
    console.log(`${id}로 이동합니다.`);
    setFolderId(id);
    requestApi('get', `/api/explorers/tree?treeID=${folderId}`, {}).then(
      (res) => {
        dispatch(setCurrentFolderDataList(res.data.children));
      }
    );
  };

  useEffect(() => {
    // getExplorerTree();
    console.log('folderId ::: ', folderId);
    getExplorerTree(folderId);
  }, []);

  useEffect(() => {}, [folderId]);

  useEffect(() => {
    console.log('_treeData :: ', _treeData);
  }, [_treeData]);

  // 선택한 아이템의 하위 폴더 추가하기
  const [childrenItems, setChildrenItems] = useState([]);
  const getChildrenItems = () => {};

  return (
    <div className="sidebar">
      <div className="sidebarWrap">
        <div className="sidebarHeader">
          <h1>LOGO</h1>
        </div>
        <div className="sidebarContents">
          {/* <CustomTreeView
            list={treeData}
            clickHandler={moveSelectedFolder}
          ></CustomTreeView> */}
          <CustomTreeView2 data={treeData} getNodeId={getExplorerTree} />
        </div>
        {/* <div>
          <button onClick={toggleTheme}>{t('모드')}</button>
        </div> */}
        {/* <div>
          <button
            className={styles.language}
            onClick={() => setLanguageMenuOpen(!isLanguageMenuOpen)}
          >
            {t('언어')}
          </button> 
          {isLanguageMenuOpen && (
            <ul>
              <li key="ko-KR" onClick={() => changeLanguage('ko-KR')}>
                {t('한국어')}
              </li>
              <li key="en-US" onClick={() => changeLanguage('en-US')}>
                {t('영어')}
              </li>
            </ul>
          )}
        </div>*/}
        <ul className="navigation">
          <li key="link-1" className="activity selected">
            활동내역
          </li>
          <li key="link-2" className="board">
            게시판
          </li>
          <li key="link-3" className="settings">
            환경설정
          </li>
          <li key="link1">
            <Link to="/">{t('로그인')}</Link>
          </li>
          <li key="link2">
            <Link to="/explorer">{t('탐색기')}</Link>
          </li>
          <li key="link3">
            <Link to="/test">{t('테스트')}</Link>
          </li>
        </ul>
      </div>
      <button
        type="button"
        className="sidebarToggleBtn"
        onClick={sidebarToggle}
      ></button>
    </div>
  );
}
