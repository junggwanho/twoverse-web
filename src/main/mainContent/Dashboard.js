import './Dashboard.css';
import React, { useState, useEffect } from 'react';
// import button from "./img/button.png"
import Chart from './dashboardContent/Chart';
import InputBox from './dashboardContent/InputBox';
import StudentUser from './StudentUser';
import ProgressBarList from './dashboardContent/ProgressBarList';
import styled from 'styled-components';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const DashboardContainer = styled.div`
    display: flex;
    magin: 0;
    padding-left:25vh;
    justify-content: center;
    align-items: center;
`


export default function Dashbord() {
    const [mainSelectedStudentId, setMainSelectedStudentId] = useState(1);

    const handleMainStudentClick = async (selectedStudentId) => {
        await setMainSelectedStudentId(selectedStudentId);
    };
    return (
        <DashboardContainer>
            <div className="body-container">
                <Container style={{position:"relative", right:"80px" ,width:"90%", height:"70%"}}>
                    <Row>
                        <Col style={{position:"relative", bottom: "30px"}}>
                            <Chart mainSelectedStudentId={mainSelectedStudentId}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col style={{position:"relative", bottom: "20px"}}
                        md="4">
                            <ProgressBarList mainSelectedStudentId={mainSelectedStudentId}/>
                        </Col>
                        <Col style={{position:"relative", bottom: "20px"}}
                        md="8">
                            <InputBox mainSelectedStudentId={mainSelectedStudentId}/>
                        </Col>
                    </Row>
                </Container>
            </div>
            <div className='Student-userlist'>
                    <StudentUser onStudentClick={handleMainStudentClick} />
            </div>
        </DashboardContainer>
    );
}