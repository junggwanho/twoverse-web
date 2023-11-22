import { useEffect, useState } from 'react';
import './App.css';

import Login from './auth/Login';
import Signin from './auth/Signin';
import FindId from './auth/FindId';
import FindPw from './auth/FindPw';


function App() {
  const [mode, setMode] = useState("LOGIN");

  useEffect(() => {
    fetch("http://localhost:3001/authcheck")
      .then((res) => res.json())
      .then((json) => {
        if (json.isLogin === "True") {
          setMode("WELCOME");
        }
        else {
          setMode("LOGIN");
        }
      });
  }, []);

  let content = null;

  if (mode === "LOGIN") {
    content = <Login setMode={setMode}></Login>
  }
  else if (mode === 'SIGNIN') {
    content = <Signin setMode={setMode}></Signin>
  }
  else if (mode === 'FINDID') {
    content = <FindId setMode={setMode}></FindId>
  }
  else if (mode === 'FINDPW') {
    content = <FindPw setMode={setMode}></FindPw>
  }
  else if (mode === 'WELCOME') {
    content = <>
      <h2>메인 페이지에 오신 것을 환영합니다</h2>
      <p>로그인에 성공하셨습니다.</p>
      <a href="auth/logout">로그아웃</a>
    </>
  }

  return (
    <>
      {content}
    </>
  );
}

export default App;