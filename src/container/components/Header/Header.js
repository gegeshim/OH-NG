import React, { useState, useEffect, useRef } from 'react';

import styles from './Header.module.css';

export default function Header() {
  const handleAlert = () => {
    console.log('clicked Alert');
  };

  // 내 정보 상세보기
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef(null);
  const handleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };
  useEffect(() => {
    const clickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', clickOutside);
    return () => {
      document.removeEventListener('mousedown', clickOutside);
    };
  }, []);
  return (
    <div className={styles.Header}>
      <div className={styles.alert}>
        <button type="button" onClick={handleAlert}>
          alert
        </button>
        <span className={styles.alertTotal}>999+</span>
      </div>
      <div ref={profileRef}>
        <div className={styles.profile}>
          <button type="button" onClick={handleProfile}>
            profile
          </button>
        </div>
        {isProfileOpen && (
          <div className={styles.profileDetail}>
            <ul className={styles.profileInfo}>
              <li>김지란</li>
              <li>jirani@jiran.com</li>
              <li>2024.03.05 14:04:41</li>
            </ul>
            <ul className={styles.profileMode}></ul>
            <ul>
              <li className={styles.logout}>
                <button type="button">로그아웃</button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
