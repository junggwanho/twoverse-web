import React, { useState } from 'react';


function Login(props) {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  return <>
    <div>
      <div className="login-page">
        <div className="login-content login-content-signin">
          <div>
            <h2>Log in</h2>
            <form className="wrapper-box" role="form">
              <div className="input-box">
                <input type="text"
                  className="form-control form-control-email"
                  placeholder="아이디를 입력해주세요"
                  onChange={event => {
                    setId(event.target.value);
                  }}
                  required />
                <input type="password"
                  className="form-control form-control-password"
                  placeholder="비밀번호를 입력해주세요"
                  onChange={event => {
                    setPassword(event.target.value);
                  }}
                  required />
              </div>
              <div className='find-join-group'>
                <h2 className="outer-link pull-left"
                  onClick={() => {
                    props.setMode("FINDID");
                  }}>아이디 찾기</h2>
                <h2 className="outer-link pull-left"
                  onClick={() => {
                    props.setMode("FINDPW");
                  }}
                >비밀번호 찾기</h2>
                <h2 className="outer-link pull-left"
                  onClick={() => {
                    props.setMode("SIGNIN");
                  }}
                >회원가입</h2>
              </div>
              <button type="submit"
                className="btn btn-submit btn-default pull-right btn-login"
                onClick={() => {
                  const userData = {
                    userId: id,
                    userPassword: password,
                  };
                  fetch("http://localhost:3001/auth/login", {
                    method: "post",
                    headers: {
                      "content-type": "application/json",
                    },
                    body: JSON.stringify(userData),
                  })
                    .then((res) => res.json())
                    .then((json) => {
                      if (json.isLogin === "True") {
                        props.setMode("WELCOME");
                      }
                      else {
                        alert(json.isLogin)
                      }
                    });
                }}>
                Log in
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </>
}

export default Login;