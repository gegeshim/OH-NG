import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import styles from '../Navigation/Navigation.module.css';

export default function Navigation({ toggle }) {
  const { t, i18n } = useTranslation();
  const language = useSelector((state) => state.language);
  // 초기 설정은 language 전역 상태로
  useEffect(() => {
    i18n.changeLanguage(language);
  }, []);
  return (
    <div className="Navigation">
      <button onClick={toggle}>Toggle Theme </button>
      <ul className={styles.nav}>
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
  );
}
