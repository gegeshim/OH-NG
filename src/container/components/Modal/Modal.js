import React, { useRef } from 'react';

import styles from './Modal.module.css';
import useClickOutSide from 'utils/useClickOutside';

export default function Modal({ setIsModalOpen, children }) {
  const modalRef = useRef();
  useClickOutSide(modalRef, setIsModalOpen);
  return (
    <div className={styles.modalBG}>
      <div ref={modalRef} className={styles.modal}>
        <button className={styles.close} onClick={setIsModalOpen}>
          X
        </button>
        {children}
      </div>
    </div>
  );
}
