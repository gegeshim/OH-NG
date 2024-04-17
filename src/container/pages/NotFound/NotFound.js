import React from 'react';
import styles from '../NotFound/NotFound.module.css';
export default function NotFound() {
  return (
    <div className={styles.notfound}>
      <div className={styles.wrap}>
        <h1>404</h1>
        <p>Page Not Found...</p>
        <button type="button" className="button">
          홈으로
        </button>
      </div>
    </div>
  );
}
