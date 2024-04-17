import React, { useState } from 'react';

import Calendar from 'react-calendar';
import '../../../../node_modules/react-calendar/dist/Calendar.css';
import moment from 'moment';
import styles from '../DateRange/DateRange.module.css';

export default function DateRange() {
  const [date, setDate] = useState('날짜를 선택하세요.');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const [dateRange, setDateRange] = useState([new Date(), new Date()]);

  const [isOpen, setIsOpen] = useState(false);

  const handleDateChange = (selectedDate) => {
    const start = moment(selectedDate[0]).format('YYYY년 MM월 DD일');
    const end = moment(selectedDate[1]).format('YYYY년 MM월 DD일');
    setStartDate(start);
    setEndDate(end);
    setDate(`${start} ~ ${end}`);
    setDateRange(selectedDate);
    setIsOpen(false); // 완료되면 닫기
  };

  return (
    <div className={styles.DateRange}>
      <div onClick={() => setIsOpen(!isOpen)}>{date}</div>
      <div
        className={
          isOpen ? `${styles.calendarWrapOpen}` : `${styles.calendarWrapClose}`
        }
      >
        <Calendar
          onChange={handleDateChange}
          value={dateRange}
          selectRange={true}
          formatDay={(locale, date) => moment(date).format('DD')}
        ></Calendar>
      </div>
    </div>
  );
}
