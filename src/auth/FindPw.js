import React, { useState } from 'react';


function FindPw(props) {
  const [id, setId] = useState("");
  const [nick, setNick] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

    return (
      <div>
        <div className="login-page">
          <div className="login-content login-content-signin">
            <div>
              <h2>FIND PASSWORD</h2>
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
                      props.setMode("SIGNIN");
                    }}
                  >회원가입</h2>
                  <h2 className="outer-link pull-left"
                    onClick={() => {
                      props.setMode("FINDID");
                    }}
                  >아이디 찾기</h2>
                </div>
                <button type="submit" className="btn btn-submit btn-default pull-right btn-login">Find Password</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }

export default FindPw;