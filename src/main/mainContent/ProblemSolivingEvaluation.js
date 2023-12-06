import React, { useState, useEffect } from 'react';
import './ProblemSolvingEvaluation.css'
import styled from 'styled-components';
import StudentUser from './StudentUser';

const ProblemSolvingEvaluationContainer = styled.div`
    display: flex;
    margin: 0;
    padding-left: 25vh;
    justify-content: center;
    align-items: top;
`

export default function ProblemSolvingEvaluation() {
    const [mainSelectedStudentId, setMainSelectedStudentId] = useState(21);
    const [listData, setListData] = useState([]);
    const [quizYN, setQuizYN] = useState([]);

    const handleMainStudentClick = async (selectedStudentId) => {
        await setMainSelectedStudentId(selectedStudentId);
    };

    useEffect(() => {
        // 웹이 시작하자마자 mainSelectedStudentId를 이용하여 데이터를 가져오는 함수 호출
        fetchData(mainSelectedStudentId);
        // getQuizYN(mainSelectedStudentId);
    }, [mainSelectedStudentId]);

    const fetchData = async (studentId) => {
        try {
            const response = await fetch(`http://kitcomputer.kr:5200/user/quiz/${studentId}`);
            const json = await response.json();
            setListData(json);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const getQuizYN = async (studentId) => {
        try {
            const response = await fetch(`http://kitcomputer.kr:5200/user/quizYN/${studentId}`);
            const json = await response.json();
            setQuizYN(json);
        } catch (error) {
            console.log('Error fetching data:', error);
            // QuizYN 값이 없을 경우에 대한 처리
            setQuizYN([]); // 또는 다른 기본값 설정
        }
    }

    return (
        <ProblemSolvingEvaluationContainer>
            <div className="problemSolving-container">
                <ul className='Evaluation'>
                    {listData.map((item, index) => (
                        <li key={item.id} className='EvaluationList'>
                            <div className='Evaluation'>
                                <h4>{item.process}</h4>
                                <hr />
                            </div>
                            <h6>문제: {item.quiz}</h6>
                            <h6 className='answerResult'>정답: {item.quizYN === 1 ? 'O' : 'X'}</h6>
                            {quizYN.length > 0 && (
                                <h6>학생 풀이: {quizYN[index].quizYN === 1 ? 'O' : 'X'}</h6>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
            <div className='Student-userlistPro'>
                <StudentUser onStudentClick={handleMainStudentClick}/>
            </div>
        </ProblemSolvingEvaluationContainer>
    );
};
