import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import '../Auth.css';

function Login() {
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    const userData = {
      userId: id,
      userPassword: password,
    };
    try {
      const response = await fetch("http://localhost:3001/auth/student/login", {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        const json = await response.json();
        if (json.isLogin === "True") {
          navigate("/"); // 로그인 성공 후 홈 화면으로 이동
          window.location.reload();
        } else {
          alert(json.isLogin);
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

  return (
    <div>
      <div className="login-page">
        <div className="login-content login-content-signin">
          <div>
            <h2 className='auth-font'>Log in</h2>
            <form className="wrapper-box" role="form">
              <div className="input-box">
                <input
                  type="text"
                  className="form-control form-control-email"
                  placeholder="아이디를 입력해주세요"
                  onChange={(event) => {
                    setId(event.target.value);
                  }}
                  required
                />
                <input
                  type="password"
                  className="form-control form-control-password"
                  placeholder="비밀번호를 입력해주세요"
                  onChange={(event) => {
                    setPassword(event.target.value);
                  }}
                  required
                />
              </div>
              <div className='find-join-group'>
                <NavLink className="link" activeClassName="active" to="/student/Signin">
                  <h2 className="auth-font outer-link pull-left">회원가입</h2>
                </NavLink>
              </div>
              <button
                type="button"
                className="btn btn-submit btn-default pull-right btn-login"
                onClick={handleSubmit}
              >
                Log in
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
