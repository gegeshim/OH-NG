import React, { useEffect, useState } from 'react';

import styles from './Checkbox.module.css';

export default function Checkbox({ id, size, onChecked, checkboxHandler }) {
  const [isChecked, setIsChecked] = useState(onChecked);
  useEffect(() => {
    setIsChecked(onChecked);
  }, [onChecked]);

  const handleCheckboxChange = (e) => {
    const newValue = e.target.checked;
    console.log('newValue :  ', newValue);
    setIsChecked(newValue);
    checkboxHandler(newValue);
  };

  const checkboxClass = `${styles.checkbox} ${
    size === 'small' ? styles['small'] : ''
  } ${size === 'large' ? styles['large'] : ''}`;
  return (
    <div className={checkboxClass}>
      <input
        type="checkbox"
        id={id}
        checked={isChecked}
        onChange={handleCheckboxChange}
      />
      <label htmlFor={id}></label>
    </div>
  );
}
