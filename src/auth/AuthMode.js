import React from 'react';
import AuthModeSelect from './AuthModeSelect';
import TeacherLogin from './teacher/Login';
import TeacherSignin from './teacher/Signin';
import StudentLogin from './student/Login';
import StudentSignin from './student/Signin';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import styled from "styled-components";

const MainCotainer = styled.div`
    max-height: 100vh;
`

export default function AuthMode() {
    return (
        <MainCotainer>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<AuthModeSelect />} />
                    <Route path="/teacher/login" element={<TeacherLogin />} />
                    <Route path="/teacher/signin" element={<TeacherSignin />} />
                    <Route path="/student/login" element={<StudentLogin />} />
                    <Route path="/student/signin" element={<StudentSignin />} />
                    {/* <Route path="/Main" element={<ProblemSolvingEvaluation />} /> */}
                </Routes>
            </BrowserRouter>
        </MainCotainer>
    );
}
