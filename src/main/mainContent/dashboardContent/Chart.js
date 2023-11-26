import React from 'react';
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

export default function Chart() {

    const data = [
        {
            name: '1공정',
            'User Score': 80,
            'Average Score': 88,
        },
        {
            name: '2공정',
            'User Score': 20,
            'Average Score': 88,
        },
        {
            name: '3공정',
            'User Score': 40,
            'Average Score': 88,
        },
        {
            name: '4공정',
            'User Score': 90,
            'Average Score': 88,
        },
        {
            name: '5공정',
            'User Score': 90,
            'Average Score': 88,
        },
    ]

    return (
        <Card style={{marginBottom: '0px', width: '100%', height: "100%"}}>
            <div className="chart">
                {/* <h3 className='chartTitle'>공정 평가 대시보드</h3> */}
                <Card.Body>
                    <Card.Title>
                        <h6>공정 평가 대시보드</h6>
                    </Card.Title>
                    <hr/>
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

