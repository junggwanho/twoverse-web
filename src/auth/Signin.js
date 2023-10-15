import React, { useState } from 'react';

function Signin(props) {
  const [id, setId] = useState("");
  const [nick, setNick] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  
  return <>
    <div>
      <div className="login-page">
        <div className="login-content login-content-signin">
          <div>
            <h2>Sign in</h2>
            <form className="wrapper-box" role="form">
              <div className="input-box">
                <input type="text"
                  className="form-control form-control-email"
                  placeholder="아이디를 입력해주세요"
                  required 
                  onChange={event => {
                    setId(event.target.value);
                  }}/>
                <input type="text"
                  className="form-control form-control-password"
                  placeholder="닉네임을 입력해주세요"
                  required 
                  onChange={event => {
                    setNick(event.target.value);
                  }}/>
                <input type="password"
                  className="form-control form-control-password"
                  placeholder="비밀번호를 입력해주세요"
                  required 
                  onChange={event => {
                    setPassword(event.target.value);
                  }}/>
                <input type="password"
                  className="form-control form-control-password"
                  placeholder="비밀번호를 다시 입력해주세요"
                  required 
                  onChange={event => {
                    setPassword2(event.target.value);
                  }}/>
                <input type="text"
                  className="form-control form-control-password"
                  placeholder="전화번호를 입력해주세요"
                  maxLength="11"
                  required 
                  onChange={event => {
                    setPhoneNumber(event.target.value);
                  }}/>
              </div>

              <div className='find-join-group'>
                <h2 className="outer-link pull-left"
                  onClick={() => {
                    props.setMode("LOGIN");
                  }}
                >로그인</h2>
                <h2 className="outer-link pull-left"
                  onClick={() => {
                    props.setMode("FINDID");
                  }}
                >아이디 찾기</h2>
                <h2 className="outer-link pull-left"
                  onClick={() => {
                    props.setMode("FINDPW");
                  }}
                >비밀번호 찾기</h2>
              </div>
              <button type="submit" 
              className="btn btn-submit btn-default pull-right btn-login"
              onClick={() => {
                const userData = {
                  userId: id,
                  userNick: nick,
                  userPassword: password,
                  userPassword2: password2,
                  userPhoneNumber: phoneNumber,
                };
                fetch("http://localhost:3001/signin", { //signin 주소에서 받을 예정
                  method: "post", // method :통신방법
                  headers: {      // headers: API 응답에 대한 정보를 담음
                    "content-type": "application/json",
                  },
                  body: JSON.stringify(userData), //userData라는 객체를 보냄
                })
                  .then((res) => res.json())
                  .then((json) => {
                    if (json.isSuccess === "True") {
                      alert('회원가입이 완료되었습니다!')
                      props.setMode("LOGIN");
                    }
                    else {
                      alert(json.isSuccess)
                    }
                  });
              }}>Sign in</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </>
}

export default Signin;