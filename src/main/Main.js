import React, { useState, useEffect } from 'react';

import Dashbord from './mainContent/Dashboard';
import StudentDashbord from './StudentMain/StudentDashboard';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SideOpenbar from './mainContent/SideOpenbar';
import ProblemSolvingEvaluation from './mainContent/ProblemSolivingEvaluation';
import StudentProblemSolvingEvaluation from './StudentMain/StudentProblemSolivingEvaluation';
import styled from "styled-components";
import { Button, Navbar, Container, Nav, NavDropdown, Carousel, Offcanvas, Form } from 'react-bootstrap';

const MainCotainer = styled.div`
    max-height: 98%;
`

function Main() {
    const [name, setName] = useState("");
    const [userType, setUserType] = useState("");

    useEffect(() => {
        // 서버에서 사용자 데이터 가져오기
        fetch("http://localhost:3001/user/findUserName")  // 실제 API 엔드포인트로 '/api/user'를 대체하세요
            .then(response => response.json())
            .then(data => {
                // 서버가 'nickname'이라는 속성으로 사용자 닉네임을 반환한다고 가정합니다.
                setName(data.username);
                setUserType(data.userType);
            })
            .catch(error => {
                console.error('사용자 데이터를 가져오는 중 오류 발생:', error);
            });
    }, []);

    return (
        <MainCotainer>
            <BrowserRouter>
                {[false].map((expand) => (
                    <Navbar key={expand} expand={expand} className="bg-body-tertiary mb-3" bg="dark" data-bs-theme="dark" sticky="top">
                        <Container fluid>
                            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
                            <Navbar.Brand href="#">이차버스</Navbar.Brand>
                            <Navbar.Brand href="#"></Navbar.Brand>
                            <Navbar.Brand href="#"></Navbar.Brand>
                            <Navbar.Brand href="#"></Navbar.Brand>
                            <Navbar.Brand href="#"></Navbar.Brand>
                            <Navbar.Brand href="#"></Navbar.Brand>
                            <Navbar.Brand href="#"></Navbar.Brand>
                            <Navbar.Brand href="#"></Navbar.Brand>
                            <Navbar.Brand href="#"></Navbar.Brand>
                            <Navbar.Brand href="#"></Navbar.Brand>
                            <Navbar.Brand href="#"></Navbar.Brand>
                            <Navbar.Brand href="#">{name}님</Navbar.Brand>
                            <Navbar.Brand href="/auth/logout">로그아웃</Navbar.Brand>
                            <Navbar.Offcanvas
                                // className="custom-offcanvas"
                                id={`offcanvasNavbar-expand-${expand}`}
                                aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                                style={{ width: '30px' }}
                            >
                                <SideOpenbar />
                            </Navbar.Offcanvas>
                        </Container>
                    </Navbar>))}
                <Routes>
                    {userType === 'student' ? (
                        <Route path="/" element={<StudentDashbord />} />
                    ) : (
                        <Route path="/" element={<Dashbord />} />
                    )}
                    {userType === 'student' ? (
                        <Route path="/Main" element={<StudentProblemSolvingEvaluation />} />
                    ) : (
                        <Route path="/Main" element={<ProblemSolvingEvaluation />} />
                    )}
                </Routes>
            </BrowserRouter>
        </MainCotainer>
    );
}

export default Main;