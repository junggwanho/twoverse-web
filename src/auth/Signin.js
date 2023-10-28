import React, { useState } from 'react';

function Signin(props) {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");

  const handleIdInputChange = (event) => {
    // 정규 표현식을 사용하여 한글 입력을 필터링하고 필요에 따라 수정
    const value = event.target.value;
    if (/[\u3131-\uD79D]/.test(value)) {
      // 한글 입력이 포함된 경우, 입력값을 수정하지 않음
      alert('아이디는 한글을 입력 하실 수 없습니다');
      return;
    }
    setId(value);
  }

  const handlePasswordInputChange = (event) => {
    const inputValue = event.target.value;
    // 유효성 검사 룰을 정의합니다.
    if (inputValue.length >= 8 && inputValue.length <= 16) {
      setPasswordErrorMessage("");
    } else {
      setPasswordErrorMessage('비밀번호는 8글자 이상 16글자 이하로 입력해주세요.');
    }
    setPassword(inputValue); // 비밀번호 상태 업데이트
  }

  const handleSubmit = () => {
    if (password.length === 0) {
      alert('비밀번호를 입력해주세요.');
      return; // submit 동작을 막음
    }

    if (!(password.length >= 8 && password.length <= 16)) {
      alert('비밀번호는 8글자 이상 16글자 이하로 입력해야 합니다.');
      return; // submit 동작을 막음
    }
    if (password !== password2) {
      alert('비밀번호와 비밀번호 확인이 일치하지 않습니다');
      return; // submit 동작을 막음
    }

    // 비밀번호와 비밀번호 확인이 일치하는 경우 서버로 데이터 전송
    const userData = {
      userId: id,
      userPassword: password,
    };

    fetch("http://localhost:3001/auth/signin", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((res) => res.json())
      .then((json) => {
        if (!(json.isSuccess === "True")) {
          alert('회원가입이 완료되었습니다!');
          props.setMode("LOGIN");
        } else {
          alert(json.isSuccess);
        }
      });
    // 폼을 제출
    const formElement = document.getElementById('signin-form'); // 폼의 ID를 설정하세요
    formElement.submit();
  };

  return <>
    <div>
      <div className="login-page">
        <div className="login-content login-content-signin">
          <div>
            <h2>Sign in</h2>
            <form className="wrapper-box" role="form" id='signin-form'>
              <div className="input-box">
                <input type="text"
                  className="form-control form-control-email"
                  placeholder="아이디를 입력해주세요"
                  required
                  value={id}
                  onChange={handleIdInputChange}
                />
                <input type="password"
                  className="form-control form-control-password"
                  placeholder="비밀번호를 입력해주세요"
                  required
                  value={password}
                  onChange={handlePasswordInputChange}
                />
                {passwordErrorMessage && (
                  <p style={{ color: 'red' }}>{passwordErrorMessage}</p>
                )}
                <input type="password"
                  className="form-control form-control-password"
                  placeholder="비밀번호를 다시 입력해주세요"
                  required
                  onChange={event => {
                    setPassword2(event.target.value);
                  }} />
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
              <button type="button"
                className="btn btn-submit btn-default pull-right btn-login"
                onClick={handleSubmit}>
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </>
}

export default Signin;