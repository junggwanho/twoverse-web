import React, { useState } from 'react';

function Signin(props) {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [idErrorMessage, setIdErrorMessage] = useState("아이디를 입력해 주세요.");
  const [idValidMessage, setIdValidMessage] = useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("비밀번호를 입력해주세요.");
  const [passwordValidMessage, setPasswordValidMessage] = useState("");
  const [password2ErrorMessage, setPassword2ErrorMessage] = useState("비밀번호 확인을 입력해주세요.");
  const [password2ValidMessage, setPassword2ValidMessage] = useState("");
  const [email, setEmail] = useState("");
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [emailCheckNum, setemailCheckNum] = useState("");
  const [userCheckNum, setUserCheckNum] = useState("");


  const idValid = (id) => {
    return id.length >= 6 && id.length <= 16 && !/[\u3131-\uD79D]/.test(id) && id !== "";
  };

  const passwordValid = (password) => {
    return password.length >= 8 && password.length <= 16 && password !== "";
  };

  const password2Valid = (password2) => {
    return password === password2 && password2 !== "";
  };

  const handleIdInputChange = (event) => {
    // 정규 표현식을 사용하여 한글 입력을 필터링하고 필요에 따라 수정
    const value = event.target.value;
    if (/[\u3131-\uD79D]/.test(value)) {
      // 한글 입력이 포함된 경우, 입력값을 수정하지 않음
      alert('아이디는 한글을 입력 하실 수 없습니다');
      return;
    }
    setId(value); // 아이디 상태 업데이트


    // 값이 변경되었을 때만 에러 메시지 업데이트
    if (value === "") {
      setIdErrorMessage("아이디를 입력해 주세요.");
      setIdValidMessage("");
    } else if (idValid(value)) {
      setIdErrorMessage("");
      setIdValidMessage("아이디가 올바릅니다.");
    } else {
      setIdErrorMessage("아이디 형식이 올바르지 않습니다.");
      setIdValidMessage("");
    }
  };

  const handlePasswordInputChange = (event) => {
    const value = event.target.value;
    setPassword(value); // 비밀번호 상태 업데이트
    // 유효성 검사 룰을 정의합니다.
    if (value === "") {
      setPasswordErrorMessage("비밀번호를 입력해주세요.");
      setPasswordValidMessage("");
    } else if (passwordValid(value)) {
      setPasswordValidMessage("안전한 비밀번호입니다.");
      setPasswordErrorMessage("")
    } else {
      setPasswordErrorMessage('비밀번호는 8글자 이상 16글자 이하로 입력해주세요.');
      setPasswordValidMessage("");
    }

    if (value === password2) {
      setPassword2ValidMessage("비밀번호가 일치합니다.");
      setPassword2ErrorMessage("")
    } else if (password2 !== "") {
      setPassword2ErrorMessage('비밀번호가 일치하지 않습니다.');
      setPassword2ValidMessage("");
    }
  }

  const handlePassword2InputChange = (event) => {
    const value = event.target.value;
    setPassword2(value); // 비밀번호 상태 업데이트
    // 유효성 검사 룰을 정의합니다.
    if (value === "") {
      setPassword2ErrorMessage("비밀번호 확인을 입력해주세요.");
      setPassword2ValidMessage("");
    } else if (password2Valid(value)) {
      setPassword2ValidMessage("비밀번호가 일치합니다.");
      setPassword2ErrorMessage("")
    } else {
      setPassword2ErrorMessage('비밀번호가 일치하지 않습니다.');
      setPassword2ValidMessage("");
    }
  }


  const handleEmailInputChange = (event) => {
    const value = event.target.value;
    // 유효성 검사 룰을 정의합니다.
    if (/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i.test(value)) {
      setEmailErrorMessage("");
    } else {
      setEmailErrorMessage('이메일 형식으로 작성해 주세요');
    }
    setEmail(value); // 이메일 상태 업데이트
  }

  const emailCheck = async () => {
    if (email.length === 0) {
      alert('이메일을 입력해주세요.');
      return; // submit 동작을 막음
    }
    const userData = {
      userEmail: email
    };
    try {
      const response = await fetch("http://localhost:3001/auth/email", {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        const json = await response.json();
        if (json.emailCheck === "True") {
          alert('인증코드 전송이 완료되었습니다!');
          setemailCheckNum(json.emailCheckNum);
          return; // submit 동작을 막음
        } else {
          alert('인증코드를 정상적으로 발송하지 못하였습니다');
          return; // submit 동작을 막음
        }
      } else {
        alert('서버 요청에 문제가 있습니다.');
        return; // submit 동작을 막음
      }
    } catch (error) {
      console.error('오류 발생:', error);
      alert('서버 요청 중 오류가 발생했습니다.');
      return; // submit 동작을 막음
    }
  }

  const handleSubmit = async () => {
    if (id.length === 0) {
      alert('아이디를 입력해주세요.');
      return; // submit 동작을 막음
    }

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

    if (userCheckNum !== emailCheckNum) {
      alert('인증번호가 틀렸습니다');
      return; // submit 동작을 막음
    }

    // 비밀번호와 비밀번호 확인이 일치하는 경우 서버로 데이터 전송
    const userData = {
      userId: id,
      userPassword: password,
    };

    try {
      const response = await fetch("http://localhost:3001/auth/signin", {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        const json = await response.json();
        if (json.isSuccess === "True") {
          alert('회원가입이 완료되었습니다!');
          props.setMode("LOGIN");
        } else {
          alert(json.isSuccess);
          return; // submit 동작을 막음
        }
      } else {
        alert('서버 요청에 문제가 있습니다.');
        return; // submit 동작을 막음
      }
    } catch (error) {
      console.error('오류 발생:', error);
      alert('서버 요청 중 오류가 발생했습니다.');
      return; // submit 동작을 막음
    }

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
                  value={id}
                  onChange={handleIdInputChange}
                />
                <div>
                  {idErrorMessage && (
                    <p style={{ color: 'red', fontSize: '11px' }}>{idErrorMessage}</p>
                  )}
                  {idValidMessage && (
                    <p style={{ color: 'green', fontSize: '11px' }}>{idValidMessage}</p>
                  )}
                </div>
                <input type="password"
                  className="form-control form-control-password"
                  placeholder="비밀번호를 입력해주세요"
                  value={password}
                  onChange={handlePasswordInputChange}
                />
                {passwordErrorMessage && (
                  <p style={{ color: 'red', fontSize: '11px' }}>{passwordErrorMessage}</p>
                )}
                {passwordValidMessage && (
                  <p style={{ color: 'green', fontSize: '11px' }}>{passwordValidMessage}</p>
                )}
                <input type="password"
                  className="form-control form-control-password"
                  placeholder="비밀번호를 다시 입력해주세요"
                  value={password2}
                  onChange={handlePassword2InputChange} />
                {password2ErrorMessage && (
                  <p style={{ color: 'red', fontSize: '11px' }}>{password2ErrorMessage}</p>
                )}
                {password2ValidMessage && (
                  <p style={{ color: 'green', fontSize: '11px' }}>{password2ValidMessage}</p>
                )}
                <div>
                  <input type="email"
                    className="form-control form-control-email"
                    placeholder="email을 입력해주세요"
                    required
                    value={email}
                    onChange={handleEmailInputChange}
                  />
                  <button type='button'
                    onClick={emailCheck}>
                    인증번호 발송
                  </button>
                  {emailErrorMessage && (
                    <p style={{
                      color: 'red',
                      fontSize: '13px'
                    }}>{emailErrorMessage}</p>
                  )}
                </div>
                <input type="text"
                  className="form-control form-control-password"
                  placeholder="인증번호를 입력하세요"
                  onChange={event => {
                    setUserCheckNum(event.target.value);
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