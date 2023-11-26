import { useEffect, useState } from 'react';


import Login from './auth/Login';
import Signin from './auth/Signin';
import FindId from './auth/FindId';
import FindPw from './auth/FindPw';
import Main from './main/Main';


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
    content = <Main setMode={setMode} />
  }

  return (
    <>
      {content}
    </>
  );
}

export default App;