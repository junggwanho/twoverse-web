import React, { useState } from 'react';


function FindId(props) {
  const [nick, setNick] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  return (
    <div>
      <div className="login-page">
        <div className="login-content login-content-signin">
          <div>
            <h2>Find Id</h2>
            <form className="wrapper-box" role="form">
              <div className="input-box">
                <input type="text"
                  className="form-control form-control-password"
                  placeholder="이름을 입력해주세요"
                  required 
                  onChange={event => {
                    setNick(event.target.value);
                  }}/>
                <input type="text"
                  className="form-control form-control-password"
                  placeholder="이메일을 입력해주세요"
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
                    props.setMode("SIGNIN");
                  }}
                >회원가입</h2>
                <h2 className="outer-link pull-left"
                  onClick={() => {
                    props.setMode("FINDPW");
                  }}
                >비밀번호 찾기</h2>
              </div>
              <button type="submit" className="btn btn-submit btn-default pull-right btn-login">Find Id</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FindId;