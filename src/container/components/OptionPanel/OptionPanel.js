import React from 'react';

import styles from './OptionPanel.module.css';

const dataset = [{ 종류: 'pptx' }, { 위치: '내 디스크' }, { 크기: '1012.5KB' }];
export default function OptionPanel({ handleClose }) {
  return (
    <div className={styles.optionPanelWrap}>
      <div className={styles.optionPanelHeader}>
        <div className={styles.iconWrap}>
          <div className={styles.fileIcon}></div>
          <button
            type="button"
            className={styles.closeButton}
            onClick={handleClose}
          >
            x
          </button>
        </div>
        <h3>화면설계_20240328_길면 줄바꿈으로 늘어나요.pptx</h3>
      </div>
      <div className={styles.optionPanelContent}>
        <ul>
          {dataset.map((it, id) =>
            Object.entries(it).map(([key, value]) => (
              <li key={`${key}_${id}`}>
                <div>{key}</div>
                <div>{value}</div>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}
