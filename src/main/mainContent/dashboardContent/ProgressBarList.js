import React, { useState } from 'react';
import ProgressBar from './ProgressBar'
import Card from 'react-bootstrap/Card';
import { CardBody } from 'react-bootstrap';


export default function ProgressBarList() {
    const [nowStep, setNowStep] = useState(60);
    const totalStep = 100;

    return (
        <Card>
            <CardBody>
                    <Card.Title>
                        <h6>학생 공정별 진행도</h6>
                    </Card.Title>
                    <hr />
                    <ProgressBar totalStep={totalStep} nowStep={nowStep} />
                    <ProgressBar totalStep={totalStep} nowStep={nowStep} />
                    <ProgressBar totalStep={totalStep} nowStep={nowStep} />
                    <ProgressBar totalStep={totalStep} nowStep={nowStep} />
            </CardBody>
        </Card>
    )
}