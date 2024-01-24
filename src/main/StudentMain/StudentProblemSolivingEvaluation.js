import React, { useState, useEffect } from 'react';
import '../mainContent/ProblemSolvingEvaluation.css'
import styled from 'styled-components';

const ProblemSolvingEvaluationContainer = styled.div`
    display: flex;
    margin: 0;
    padding-left: 25vh;
    justify-content: center;
    align-items: top;
`

export default function StudentProblemSolvingEvaluation() {
    const [mainSelectedStudentId, setMainSelectedStudentId] = useState(21);
    const [listData, setListData] = useState([]);
    const [quizYN, setQuizYN] = useState([]);

    useEffect(() => {
        // 웹이 시작하자마자 mainSelectedStudentId를 이용하여 데이터를 가져오는 함수 호출
        fetchData(mainSelectedStudentId);
        getQuizYN(mainSelectedStudentId);
    }, [mainSelectedStudentId]);

    const fetchData = async (studentId) => {
        try {
            const response = await fetch(`http://localhost:3001/user/quiz/${studentId}`);
            const json = await response.json();
            setListData(json);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const getQuizYN = async (studentId) => {
        try {
            const response = await fetch(`http://localhost:3001/user/quizYN/${studentId}`);
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
                            <h6 className='answerResult'>문제 결과: {item.quizYN == 1 ? 'O' : 'X'}</h6>
                            {quizYN.length > 0 && (
                                <h6>학생 풀이 결과: {quizYN[index].quizYN == 1 ? '정답' : '오답'}</h6>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </ProblemSolvingEvaluationContainer>
    );
};
