import React from 'react';

import styles from './RightOpenMenu.module.css';

export default function RightOpenMenu({ children }) {
  return <ul className={styles.rightOpenMenu}>{children}</ul>;
}
