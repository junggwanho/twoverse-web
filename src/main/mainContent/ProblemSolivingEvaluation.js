import React, { useState } from 'react';
import './ProblemSolvingEvaluation.css'
import styled from 'styled-components';
import StudentUser from './StudentUser';

const ProblemSolvingEvaluationContainer = styled.div`
    display: flex;
    magin: 0;
    padding-left:25vh;
    justify-content: center;
    align-items: top;
`


export default function ProblemSolvingEvaluation() {
    const data = [
        { id: 1, processNumber: '001', evaluationContent: '내용1', correct: true },
        { id: 2, processNumber: '002', evaluationContent: '내용2', correct: false },
        { id: 2, processNumber: '002', evaluationContent: '내용2', correct: false },
        { id: 2, processNumber: '002', evaluationContent: '내용2', correct: false },
        { id: 2, processNumber: '002', evaluationContent: '내용2', correct: false },
        { id: 2, processNumber: '002', evaluationContent: '내용2', correct: false },
        // ... 더 많은 데이터
    ];

    // 상태로 데이터 배열을 관리
    const [listData, setListData] = useState(data);

    return (
        <ProblemSolvingEvaluationContainer>
            <div className="body-container">
                <ul className='Evaluation'>
                    {listData.map(item => (
                        <li key={item.id} className='EvaluationList'>
                            <div>
                                <h4>공정 번호: {item.processNumber}</h4>
                                <hr />
                            </div>
                            <h6>공정 평가 내용: {item.evaluationContent}</h6>
                            <h6 className='answerResult'>정오답: {item.correct ? '정답' : '오답'}</h6>
                        </li>
                    ))}
                </ul>
            </div>
            <div className='Student-userlistPro'>
                <StudentUser />
            </div>
        </ProblemSolvingEvaluationContainer>
    );
};
