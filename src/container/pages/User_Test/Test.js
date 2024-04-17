import React, { useState } from 'react';

import styles from './Test.module.css';
import TreeViewUI from 'container/components/TreeViewUI/CustomTreeView';
import DateRange from 'container/components/DateRange/DateRange';
import OrderDnd from 'container/components/OrderDnd/OrderDnd';
import MoveDnd from 'container/components/MoveDnd/MoveDnd';
import Modal from 'container/components/Modal/Modal';
import ConfirmButtons from 'container/components/Buttons/ConfirmButtons';
import Toggle from 'container/components/Buttons/Toggle';
import Table from 'container/components/Table/Table';
import UploadImagePreview from 'container/components/UploadImagePreview/UploadImagePreview';

const treeList = [
  {
    id: '1',
    name: '테스트1',
    children: [
      { id: '1-2', name: '1-2' },
      { id: '1-3', name: '1-3' },
    ],
  },
];
export default function Test() {
  const moveData = {
    something1: [
      { id: 'task-1', content: 'Task 1' },
      { id: 'task-2', content: 'Task 2' },
      { id: 'task-3', content: 'Task 3' },
      { id: 'task-4', content: 'Task 4' },
      { id: 'task-5', content: 'Task 5' },
    ],
    something2: [],
  };

  const [isModalOpen, setIsModalOpen] = useState(false); // 알림 모달 open 여부
  const [isConfirmOpen, setIsConfirmOpen] = useState(false); // 확인 모달 open 여부
  const [isTestOpen, setIsTestOpen] = useState(false);
  return (
    <div className={styles.testBox}>
      <h1 className="pageTitle">테스트</h1>
      <DateRange />
      <Toggle />
      <TreeViewUI list={treeList} />
      <OrderDnd />
      <MoveDnd data={moveData} />
      <button
        type="button"
        onClick={() => setIsModalOpen(true)}
        style={{
          backgroundColor: 'green',
          border: '1px solid #000',
          padding: '4px',
          color: '#fff',
        }}
      >
        알림 모달 테스트
      </button>
      {isModalOpen && (
        <Modal setIsModalOpen={() => setIsModalOpen(false)}>
          <h2>알림 모달</h2>
        </Modal>
      )}
      <button
        type="button"
        onClick={() => setIsConfirmOpen(true)}
        style={{
          marginLeft: '20px',
          backgroundColor: 'red',
          border: '1px solid #000',
          padding: '4px',
          color: '#fff',
        }}
      >
        확인 모달 테스트
      </button>
      {isConfirmOpen && (
        <Modal setIsModalOpen={() => setIsConfirmOpen(false)}>
          <h2>확인 모달</h2>
          <ConfirmButtons
            setClose={() => setIsConfirmOpen(false)}
            setConfirm={() => {
              return false;
            }}
          ></ConfirmButtons>
        </Modal>
      )}
      <div style={{ marginTop: '30px' }}>
        <h2>데이터 그리드 테스트</h2>
        <Table></Table>
      </div>
      <div style={{ marginTop: '30px' }}>
        <UploadImagePreview />
      </div>
    </div>
  );
}
