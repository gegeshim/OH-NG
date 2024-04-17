import { useState } from 'react';
export default function Toggle() {
  const [toggle, setToggle] = useState(false);

  const clickToggle = () => {
    setToggle((toggle) => !toggle);
  };
  return (
    <>
      <input type="checkbox" id="toggle" hidden />
      <label
        htmlFor="toggle"
        className={toggle ? 'toggleSwitch on' : 'toggleSwitch off'}
        onClick={clickToggle}
      >
        <span className="toggleButton"></span>
      </label>
    </>
  );
}
