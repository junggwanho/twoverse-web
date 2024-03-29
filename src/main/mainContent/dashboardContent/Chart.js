import React, { useState, useEffect } from 'react';
import './Chart.css'
import {
    BarChart, Bar,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts'
import Card from 'react-bootstrap/Card';

export default function Chart({ mainSelectedStudentId }) {
    const [data, setUserData] = useState([]);

    useEffect(() => {
        setUserData([]);
        fetchData(mainSelectedStudentId);
    }, [mainSelectedStudentId]);

    const fetchData = async (studentId) => {
        try {
            const response = await fetch(`http://localhost:3001/user/chart/${studentId}`);
            const json = await response.json();
            setUserData(json);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <Card style={{ marginBottom: '0px', width: '100%', height: "100%" }}>
            <div className="chart">
                <Card.Body>
                    <Card.Title>
                        <h6>공정 평가 대시보드</h6>
                    </Card.Title>
                    <hr />
                    <ResponsiveContainer className="BarChartContainer" width="100%" aspect={5 / 1}>
                        <BarChart
                            width={500}
                            height={100}
                            data={data}
                            margin={{
                                right: 30,
                                left: 20,
                                bottom: 5,
                            }}>

                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Legend />
                            <Bar dataKey="User Score" barSize={20} fill='#8884d8' />
                            <Bar dataKey="Average Score" barSize={20} fill="#82ca9d" />
                        </BarChart>
                    </ResponsiveContainer>
                </Card.Body>
            </div>
        </Card>
    )
}


