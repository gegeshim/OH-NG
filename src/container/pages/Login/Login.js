import React, { useEffect, useState, useRef, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import SelectBox from 'container/components/Selectbox/Selectbox';

import styles from '../Login/Login.module.css';

export default function LoginPage() {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();

  // 이메일 유효성 검사
  const emailRef = useRef();
  const [email, setEmail] = useState('');
  const [emailValid, setEmailValid] = useState(true);
  const emailCheck = (userEmail) => {
    const emailRegEx =
      /^[A-Za-z0-9]([-_.]?[A-Za-z0-9_-])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/;
    setEmailValid(emailRegEx.test(userEmail));
  };

  // 비밀번호 유효성 검사
  const passwordRef = useRef();
  const [password, setPassword] = useState('');
  const [passwordValid, setPasswordValid] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const passwordCheck = (userPassword) => {
    const passwordRegEx =
      /^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*#?&])[a-zA-Z\d@$!%*#?&]{8,20}$/;
    setPasswordValid(passwordRegEx.test(userPassword));
  };

  // 로그인 버튼 클릭
  const handleLogin = () => {
    if (!email.length > 0) {
      emailRef.current.focus();
      console.log('아이디를 입력하라');
      setEmailValid(false);
    } else if (!password.length > 0) {
      console.log('비번을 입력하라');
      passwordRef.current.focus();
      setPasswordValid(false);
    }
    if (emailValid && passwordValid) {
      console.log('login 요청중...');
    }
  };
  // 언어 설정
  const language = useSelector((state) => state.language);
  const selectLanguageArr = [
    { selected_text: '한국어', selected_value: 'ko-KR' },
    { selected_text: 'English', selected_value: 'en-US' },
    { selected_text: '日本語', selected_value: 'en-US' },
  ];
  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    dispatch({
      type: 'language/setLanguage',
      payload: lang,
    });
  };

  return (
    <div className={styles.loginBox}>
      <div>
        <SelectBox
          defaultText={language === 'en-US' ? 'english' : '한국어'}
          optionEvent={changeLanguage}
          dataset={selectLanguageArr}
        />
        <div className={styles.loginWrap}>
          <h1>{t('로그인')}</h1>
          <div>
            <label>{t('이메일')}</label>
            <input
              ref={emailRef}
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => emailCheck(email)}
              className={!emailValid ? 'focusInput' : ''}
            />
          </div>
          {!emailValid && email.length > 0 && (
            <p className="inputErrorMsg">{t('이메일 오류')}</p>
          )}
          <div>
            <label>{t('비밀번호')}</label>
            <input
              ref={passwordRef}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={() => passwordCheck(password)}
              className={!passwordValid ? 'focusInput' : ''}
            />
          </div>
          {!passwordValid && password.length > 0 && (
            <p className="inputErrorMsg">{t('비밀번호 오류')}</p>
          )}
          <div>
            <button
              type="button"
              className="submitButton w-100"
              onClick={handleLogin}
            >
              {t('로그인')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
