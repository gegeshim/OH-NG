import React, { useState, useEffect, useRef } from 'react';
import styles from './Selectbox.module.css';
export default function SelectBox({ defaultText, optionEvent, dataset }) {
  /**dataset format 
  const selectLanguageArr = [
    { selected_text: '한국어', selected_value: 'ko-KR' },
    { selected_text: '영어', selected_value: 'en-US' },
  ];
  */
  const [selectedOption, setSelectedOption] = useState(defaultText);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const selectRef = useRef(null);
  useEffect(() => {
    // 외부 클릭시 창 닫기
    const clickOutside = (e) => {
      if (selectRef.current && !selectRef.current.contains(e.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', clickOutside);
    return () => {
      document.removeEventListener('mousedown', clickOutside);
    };
  }, []);
  const handleClick = (selected_text, selected_value) => {
    optionEvent(selected_value); // onClick 이벤트, selected_value를 파라미터로 받음.
    setSelectedOption(selected_text); // 선택한 옵션의 text로 button 텍스트 교체
    setIsMenuOpen(false); // 옵션 선택 후 메뉴 닫기
  };
  return (
    <div className={styles.Selectbox} ref={selectRef}>
      <button type="button" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        {selectedOption}
      </button>
      {isMenuOpen && (
        <ul>
          {dataset.map((it, id) => (
            <li
              key={`${it.selected_text}_id`}
              onClick={() => handleClick(it.selected_text, it.selected_value)}
            >
              {it.selected_text}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
