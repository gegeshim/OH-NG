import React, { useState } from 'react';

import styles from './UploadModal.module.css';

export default function UploadModal({ children, uploadHandler }) {
  const [minimalize, setMinimalize] = useState(false);

  return (
    <div
      className={`${styles.UploadModal} ${minimalize ? styles.minimalize : ''}`}
    >
      <h2>파일 목록</h2>
      <button
        className={styles.close}
        onClick={() => setMinimalize(!minimalize)}
      >
        {minimalize ? '확대' : '축소'}
      </button>
      {children}
      <button type="button" className={styles.upload} onClick={uploadHandler}>
        업로드
      </button>
    </div>
  );
}
