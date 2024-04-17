import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Sidebar from 'container/components/Sidebar/Sidebar';
import Header from 'container/components/Header/Header';
import { toggleTheme } from '../../redux/slices/themeSlice';
import { sidebarToggle } from '../../redux/slices/sidebarSlice';

export default function Layout() {
  const dispatch = useDispatch();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    dispatch(sidebarToggle());
    setSidebarOpen((prev) => !prev);
    document.querySelector('.sidebar').classList.toggle('closed');
    document.querySelector('.sidebarToggleBtn').classList.toggle('closed');
  };

  return (
    <div className={`Layout ${sidebarOpen ? 'sidebarOpen' : 'sidebarClosed'}`}>
      <Header />
      <Sidebar
        sidebarToggle={toggleSidebar}
        toggleTheme={() => dispatch(toggleTheme())}
      />
      <div className="contentsWrap">
        {/* <div> */}
        <Outlet />
        {/* </div> */}
      </div>
    </div>
  );
}
