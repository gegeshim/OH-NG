import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';

import 'assets/fonts/SUIT/SUIT.css';
import Layout from 'container/layout/Layout';
import NotFound from 'container/pages/NotFound/NotFound';
import LoginPage from 'container/pages/Login/Login';

import User from 'container/layout/User';
import Test from 'container/pages/User_Test/Test';
import Explorer from 'container/pages/Explorer/Explorer';

function App() {
  // 설정한 언어 렌더링 시 반영
  const { i18n } = useTranslation();
  const language = useSelector((state) => state.language);
  useEffect(() => {
    i18n.changeLanguage(language);
  }, []);

  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme);
  return (
    <div className={`app ${theme}`}>
      <BrowserRouter>
        {/* <Navigation toggle={() => dispatch(toggleTheme())} /> */}
        <Routes>
          <Route path="/" element={<LoginPage />}></Route>
          <Route element={<Layout />}>
            <Route path="/explorer" element={<Explorer />}></Route>
            <Route path="/test" element={<Test />}></Route>
            <Route path="/user" element={<User />}></Route>
          </Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
