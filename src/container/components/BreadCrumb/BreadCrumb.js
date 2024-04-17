import React from 'react';
import styles from './BreadCrumb.module.css';

const dataset = ['내 디스크', '오피스 하드', '테스트'];
export default function BreadCrumb() {
  return (
    <ul className={styles.breadCrumb}>
      {dataset.map((it, id) => (
        <li key={`${it}_${id}`}>{it}</li>
      ))}
    </ul>
  );
}
