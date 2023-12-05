import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import Button from '../../common/Button';
import './StudentUser.css';
import Form from 'react-bootstrap/Form';

const Container = styled.div`
    display:flex;
    flex-direction: column;
`

const StyleButton = styled(Button)`
    font-size: 14px;
    height: 1.5rem;

    ${(props) =>
        props.isSelected &&
        css`
            background-color: #36b37e; /* 선택된 색상으로 설정 */
            color: #ffffff; /* 선택된 텍스트 색상으로 설정 */
        `}
`;

export default function StudentUser({onStudentClick}) {


    const [initialStudentList, setInitialStudentList] = useState([]);
    const [studentList, setStudentList] = useState(initialStudentList);
    const [selectedStudentId, setSelectedStudentId] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchStudentUserList = async () => {
            try {
                const response = await fetch("http://localhost:3001/user/studentuserList");
                const json = await response.json();

                setInitialStudentList(json);
                setStudentList(json);
            } catch (error){
                console.error('Error fetchin student user list:', error);
            }
        };

        fetchStudentUserList();
    }, []);

    const handleStudentClick = async (id) => {
        console.log(id);
        await setSelectedStudentId(id);
        onStudentClick(id);
    };

    let searchTimer; // 타이머 변수 추가

    const handleSearch = (inputValue) => {
        const trimmedSearchTerm = inputValue.trim(); // 검색어에서 공백 제거
        const filteredStudents = initialStudentList.filter((student) =>
            student.name.toLowerCase().includes(trimmedSearchTerm.toLowerCase())
        );
        setStudentList(filteredStudents);
    };

    const handleInputChange = (e) => {
        clearTimeout(searchTimer); // 이전 타이머를 지움
        const inputValue = e.target.value;
        setSearchTerm(inputValue);

        // 입력이 변경될 때마다 지연 후 검색 실행
        searchTimer = setTimeout(() => {
            handleSearch(inputValue);
        }, 500); // 500 밀리초(0.5초) 후에 검색 실행
    };

    return (
        <Container>
            <h3>학생정보창</h3>
            <Form className="d-flex">
                <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                    value={searchTerm}
                    onChange={handleInputChange}
                />
            </Form>
            <hr />
            <ul className='studentUserList'>
                {searchTerm === '' // 검색어가 비어 있으면 전체 목록 표시
                    ? initialStudentList.map((student) => (
                        <li className="studentUserListItem" key={student.id}>
                            <div
                                className={`studentUser ${selectedStudentId === student.id ? 'selected' : ''
                                    }`}
                            >
                                <span className="userName">{student.name}</span>
                            </div>
                            <StyleButton
                                cyan
                                isSelected={selectedStudentId === student.id}
                                onClick={() => handleStudentClick(student.id)}
                            >
                                change
                            </StyleButton>
                        </li>
                    ))
                    : // 검색어가 비어 있지 않으면 필터링된 목록 표시
                    studentList.map((student) => (
                        <li className="studentUserListItem" key={student.id}>
                            <div
                                className={`studentUser ${selectedStudentId === student.id ? 'selected' : ''
                                    }`}
                            >
                                <span className="userName">{student.name}</span>
                            </div>
                            <StyleButton
                                cyan
                                isSelected={selectedStudentId === student.id}
                                onClick={() => handleStudentClick(student.id)}
                            >
                                change
                            </StyleButton>
                        </li>
                    ))}
            </ul>
        </Container>
    );
}