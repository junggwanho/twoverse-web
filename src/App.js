import { useEffect, useState } from 'react';


import AuthMode from './auth/AuthMode';
import Main from './main/Main';


// ... (이전 코드)

function App() {
  const [mode, setMode] = useState("AuthMode");

  useEffect(() => {
    fetch("http://localhost:3001/authcheck")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((json) => {
        if (json.isLogin === "True") {
          setMode("WELCOME");
        } else {
          setMode("AuthMode");
        }
      })
      .catch((error) => {
        console.error("Network request failed:", error);
        setMode("AuthMode");
      });
  }, []);

  return (
    <>
      {mode === "AuthMode" && <AuthMode setMode={setMode} />}
      {mode === "WELCOME" && <Main setMode={setMode} />}
    </>
  );
}

export default App;