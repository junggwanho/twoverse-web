import React from 'react';
import Button from '../common/Button';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const Container = styled.div`
  width: 100vh;
  height: 100vh;
`;

const StyleButton = styled(Button)`
    height: 2rem;
    & + & {
        margin-left: 0.5rem;
    }
`;

const AuthSelect = styled.div`
  display: flex;
  justify-content: center;
  width: 800px;
  /* 상하좌우 정중앙 정렬하기 */
  position: absolute;
  top: 30%;
  left: 40%;
`;

export default function AuthModeSelect({ setMode }) {
    const handleButtonClick = (mode) => {
        setMode(mode);
    };

    return (
        <Container>
            <AuthSelect>
                <h3>이용자를<br />선택해주세요</h3>
                <StyleButton cyan onClick={() => handleButtonClick("STUDENT")}>
                    <NavLink className="link" activeClassName="active" to="/student/login">
                        학생
                    </NavLink>
                </StyleButton>
                <StyleButton cyan onClick={() => handleButtonClick("TEACHER")}>
                    <NavLink className="link" activeClassName="active" to="/teacher/Login">
                        선생
                    </NavLink>
                </StyleButton>
            </AuthSelect>
        </Container>
    );
}
