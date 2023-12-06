import React, { useState, useEffect } from 'react';
import ProgressBar from './ProgressBar'
import Card from 'react-bootstrap/Card';
import { CardBody } from 'react-bootstrap';

export default function ProgressBarList({ mainSelectedStudentId }) {
    const [nowStepOne, setNowStepOne] = useState(1);
    const [nowStepTwo, setNowStepTwo] = useState(1);
    const [nowStepThree, setNowStepThree] = useState(1);
    const [nowStepFour, setNowStepFour] = useState(1);
    const [loading, setLoading] = useState(true);  // 로딩 상태 추가
    const totalStep = 100;

    useEffect(() => {
        fetchData(mainSelectedStudentId);
    }, [mainSelectedStudentId]);

    const fetchData = async (studentId) => {
        try {
            const response = await fetch(`http://localhost:3001/user/progress/${studentId}`);
            const json = await response.json();
            console.log(json);
            setNowStepOne(json.stepOne);
            setNowStepTwo(json.stepTwo);
            setNowStepThree(json.stepThree);
            setNowStepFour(json.stepFour);
            setLoading(false);  // 데이터가 성공적으로 로드되면 로딩 상태를 false로 변경
        } catch (error) {
            console.error('데이터를 불러오는 중 에러 발생:', error);
        }
    };

    if (loading) {
        return <p>데이터를 불러오는 중...</p>;  // 데이터가 로드 중이면 로딩 메시지 표시
    }

    return (
        <Card>
            <CardBody>
                <Card.Title>
                    <h6>학생 공정별 진행도</h6>
                </Card.Title>
                <hr />
                <ProgressBar ProgressName={'믹싱'} totalStep={totalStep} nowStep={nowStepOne} />
                <ProgressBar ProgressName={'코팅'} totalStep={totalStep} nowStep={nowStepTwo} />
                <ProgressBar ProgressName={'압연'} totalStep={totalStep} nowStep={nowStepThree} />
                <ProgressBar ProgressName={'슬리팅'} totalStep={totalStep} nowStep={nowStepFour} />
            </CardBody>
        </Card>
    )
}
