import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import styles from './Sidebar.module.css';
import { requestApi } from 'services/axios';
import CustomTreeView from '../TreeViewUI/CustomTreeView';
import CustomTreeView2 from '../TreeViewUI/CustomTreeView2';
import CustomTreeView3 from '../TreeViewUI/CustomTreeView3'
import {Tree9999, TreeChildren} from '../TreeViewUI/CustomTree9999'
import { setCurrentFolderDataList } from '../../../redux/slices/explorerSlice';

const fakeData = [{
  "id": 44,
  "name": "내폴더",
  "children": [
      {
          "id": 197,
          "name": "제품",
          "type": "folder",
          "owner": "jiran(jiran@jiran.com)",
          "mod_date": "2024-04-11 11:44:11",
          "reg_date": "2024-04-11 11:44:11",
          "lower_file": 0,
          "lower_folder": 7,
          "children": [

          {"id": 333,
          "name": "제품-1",
          "type": "folder",
          "owner": "jiran(jiran@jiran.com)",
          "mod_date": "2024-04-12 10:13:44",
          "reg_date": "2024-04-12 10:13:44",
          "lower_file": 0,
          "lower_folder": 0
      },
      {
          "id": 334,
          "name": "제품-2",
          "type": "folder",
          "owner": "jiran(jiran@jiran.com)",
          "mod_date": "2024-04-12 10:59:29",
          "reg_date": "2024-04-12 10:59:29",
          "lower_file": 0,
          "lower_folder": 0
      },
          ]
      },
      {
          "id": 201,
          "name": "마케팅",
          "type": "folder",
          "owner": "jiran(jiran@jiran.com)",
          "mod_date": "2024-04-11 11:44:54",
          "reg_date": "2024-04-11 11:44:54",
          "lower_file": 0,
          "lower_folder": 0
      },
      {
          "id": 202,
          "name": "인쇄물",
          "type": "folder",
          "owner": "jiran(jiran@jiran.com)",
          "mod_date": "2024-04-11 11:44:58",
          "reg_date": "2024-04-11 11:44:58",
          "lower_file": 0,
          "lower_folder": 0
      },
      {
          "id": 203,
          "name": "홈페이지",
          "type": "folder",
          "owner": "jiran(jiran@jiran.com)",
          "mod_date": "2024-04-11 11:45:01",
          "reg_date": "2024-04-11 11:45:01",
          "lower_file": 0,
          "lower_folder": 0
      },
      {
          "id": 208,
          "name": "test",
          "type": "folder",
          "owner": "jiran(jiran@jiran.com)",
          "mod_date": "2024-04-12 09:59:58",
          "reg_date": "2024-04-12 09:59:58",
          "lower_file": 0,
          "lower_folder": 0
      },
      {
          "id": 209,
          "name": "test1",
          "type": "folder",
          "owner": "jiran(jiran@jiran.com)",
          "mod_date": "2024-04-12 10:01:29",
          "reg_date": "2024-04-12 10:01:29",
          "lower_file": 0,
          "lower_folder": 0
      },
      {
          "id": 210,
          "name": "test2",
          "type": "folder",
          "owner": "jiran(jiran@jiran.com)",
          "mod_date": "2024-04-12 10:04:14",
          "reg_date": "2024-04-12 10:04:14",
          "lower_file": 0,
          "lower_folder": 0
      },
      {
          "id": 211,
          "name": "test3",
          "type": "folder",
          "owner": "jiran(jiran@jiran.com)",
          "mod_date": "2024-04-12 10:13:44",
          "reg_date": "2024-04-12 10:13:44",
          "lower_file": 0,
          "lower_folder": 0
      },
      {
          "id": 212,
          "name": "test4",
          "type": "folder",
          "owner": "jiran(jiran@jiran.com)",
          "mod_date": "2024-04-12 10:59:29",
          "reg_date": "2024-04-12 10:59:29",
          "lower_file": 0,
          "lower_folder": 0
      },
      {
          "id": 213,
          "name": "test5",
          "type": "folder",
          "owner": "jiran(jiran@jiran.com)",
          "mod_date": "2024-04-12 14:31:43",
          "reg_date": "2024-04-12 14:31:43",
          "lower_file": 0,
          "lower_folder": 0
      }
  ]
}]
const addFakeChildren = { "id": 201,
"name": "마케팅",
"type": "folder",
"owner": "jiran(jiran@jiran.com)",
"mod_date": "2024-04-11 11:44:54",
"reg_date": "2024-04-11 11:44:54",
"lower_file": 0,
"lower_folder": 0, 
"children":[
  {
    "id": 333,
    "name": "추가1",
    "type": "folder",
    "owner": "jiran(jiran@jiran.com)",
    "mod_date": "2024-04-11 11:44:54",
    "reg_date": "2024-04-11 11:44:54",
    "lower_file": 0,
    "lower_folder": 0
},
{
    "id": 334,
    "name": "추가2",
    "type": "folder",
    "owner": "jiran(jiran@jiran.com)",
    "mod_date": "2024-04-11 11:44:58",
    "reg_date": "2024-04-11 11:44:58",
    "lower_file": 0,
    "lower_folder": 0
},
{
    "id": 335,
    "name": "추가3",
    "type": "folder",
    "owner": "jiran(jiran@jiran.com)",
    "mod_date": "2024-04-11 11:45:01",
    "reg_date": "2024-04-11 11:45:01",
    "lower_file": 0,
    "lower_folder": 0
},
]}

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
  const [expanedNodes, setExpandedNodes] = useState([]);
  

  const getExplorerTree = (id) => {
    console.log('getExplorerTree id :: ' , id)
    // setTreeData([fakeData])
    requestApi('get', `/api/explorers/tree?treeID=${id}`, {})
      .then((res) => {
        setTreeData([res.data]);
      })
      .catch((error) => {
        console.log(`/api/explorers/tree?treeID=${id}`, error);
      });
  };

  const fetchChildren = (nodeId) => {
    console.log(`/api/explorers/tree?treeID=${nodeId}`)
    requestApi('get', `/api/explorers/tree?treeID=${nodeId}`, {})
    .then((res) => {
      // const fetchedChildren = [res.data.children];
      //  // 기존 treeData를 순회하면서 선택된 노드와 일치하는 경우에만 children 업데이트
      // // 기존 treeData를 업데이트하면서 선택된 노드와 일치하는 경우에만 children 업데이트
      // const updateTreeDataRecursive = (nodes) => {
      //   return nodes.map((node) => {
      //     if (node.id === nodeId) {
      //       // 선택된 노드와 일치하는 경우에만 children을 업데이트하고 재귀적으로 업데이트된 자식 노드를 처리
      //       return {
      //         ...node,
      //         children: fetchedChildren.map((child) => updateTreeDataRecursive([child])[0])
      //       };
      //     } else if (node.children) {
      //       // 자식 노드가 있는 경우 재귀적으로 업데이트된 자식 노드를 처리
      //       return {
      //         ...node,
      //         children: updateTreeDataRecursive(node.children)
      //       };
      //     }
      //     return node; // 일치하지 않는 경우 기존 노드 그대로 반환
      //   });
      // };
      // setTreeData(updateTreeDataRecursive);
    })
    .catch((error) => {
      console.log(`/api/explorers/tree?treeID=${nodeId}`, error);
    });
  }

  const handleNodeClick = (nodeId) => {
    console.log('nodeId: ' ,nodeId)
    setExpandedNodes((prevExpandedNodes) => [...prevExpandedNodes, nodeId])
    fetchChildren(nodeId)
  }
  useEffect(() => {
    // getExplorerTree(folderId);
  }, []);
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

  // TEST
  const [testTreeData, setTestTreeData] = useState(fakeData)
  const [updatedTreeData, setUpdatedTreeData] = useState(testTreeData);
const addChildrenItems = (parentId, newItem, data) => {
  console.log('부모 노드 찾기에서의 데이터',data)
  const findParent = (node) => {
    for (const _node of node) {
      if (_node.id === parentId) {
        return _node;
      }
      if (!_node.children) {
        _node.children = []; // children 필드가 없는 경우 새로운 빈 배열 추가
      }
      const parent = findParent(_node.children); // 재귀적으로 자식 노드에서 부모 노드를 찾음
      if (parent) {
        return parent;
      }
    }
    return null;
  };

  // 부모 노드 찾기
  const parentNode = findParent(data);

  // 부모 노드가 없으면 에러 출력
  if (!parentNode) {
    console.error(`Parent node with id ${parentId} not found.`);
    return;
  }

  // 부모 노드에 children이 없으면 추가
  if (!parentNode.children) {
    parentNode.children = [];
  }

  // 이전에 추가됐던 자식 노드 삭제
  parentNode.children = [];

  // newItem을 부모 노드의 children으로 추가
  parentNode.children.push(...newItem.children);
};


const [selectedID, setSelectedId] = useState('44')
const getSelectedId = (id) => {
  setSelectedId(id)
  // addChildrenItemsToParent(id)
}
const addChildrenItemsToParent = (id) => {
  addChildrenItems(id, addFakeChildren, testTreeData)
  // setUpdatedTreeData([...updatedTreeData])
  setUpdatedTreeData((prevData) => [...prevData])
}

useEffect(() => {
  console.log('updatedTreeData :: ' , updatedTreeData)
}, [updatedTreeData])

useEffect(() => {
  console.log('folderId :: ' , folderId)
} ,[folderId])
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
          {/* <CustomTreeView2 data={treeData} getNodeId={getExplorerTree} /> */}
          {/* <CustomTreeView3 data={treeData} expandedNodes={expanedNodes} onNodeClick={handleNodeClick}/> */}
          <Tree9999 getNodeId={getSelectedId}children={addFakeChildren}data={fakeData} addChildrenItemsToParent={addChildrenItemsToParent} />
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
