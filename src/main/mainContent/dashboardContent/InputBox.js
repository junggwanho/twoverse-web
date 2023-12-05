import { useRef, useEffect, useState } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.bubble.css';
import styled from 'styled-components';
import WriteActionButtons from './WirteActionButtons';
import palette from '../../../lib/styles/palette';
import Card from 'react-bootstrap/Card';

const EditorBlock = styled.div`
    /* 페이지 위아래 여백 지정 */ 
    background-color: white;
    max-width:100%;
    max-height:100%;
    padding: 10px;
    -webkit-box-shadow: 0px 0px 12px -1px #000000;
    box-shadow: 0px 0px 2px -1px #000000;
    border-radius: 1px;
`;

const QuillWrapper = styled.div`
    border: 1px solid ${palette.gray[5]};
    border-radius: 3%;
    .ql-editor {
        height: 130px;
        padding: 5px;
        max-height: 220px;
        font-size: 1.125rem;
        line-height: 1.5;
    }
    .ql-editor.ql-blank::before {
        left: 0px;
    }
`;

export default function InputBox({ mainSelectedStudentId }) {
    const [feedback, setFeedback] = useState("");
    const quillElement = useRef(null);
    const quillInstance = useRef(null);

    // Quill 초기화 함수 정의
    const initializeQuill = () => {
        quillInstance.current = new Quill(quillElement.current, {
            theme: 'bubble',
            placeholder: '내용을 작성하세요...',
            modules: {
                toolbar: [
                    [{ header: '1' }, { header: '2' }],
                    ['bold', 'italic', 'underline', 'strike'],
                    [{ list: 'ordered' }, { list: 'bullet' }],
                    ['blockquote', 'code-block', 'link', 'image'],
                ],
            },
        });
    };

    const handlePublish = async () => {
        try {
            // Quill 에디터의 현재 내용을 가져옵니다.
            const editorContent = quillInstance.current.root.innerHTML;

            // 피드백 상태를 에디터 내용으로 업데이트합니다.
            setFeedback(editorContent);

            // 데이터베이스에 피드백 저장을 위한 API 호출을 수행합니다.
            const response = await fetch(`http://localhost:3001/user/saveFeedback`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    studentId: mainSelectedStudentId,
                    feedback: editorContent,
                }),
            });

            if (response.ok) {
                console.log('피드백이 성공적으로 저장되었습니다.');
                // 추가적으로 필요한 작업을 수행합니다.
            } else {
                console.error('피드백 저장 중 오류 발생:', response.statusText);
                // 오류 처리를 위한 추가적인 로직을 수행합니다.
            }
        } catch (error) {
            console.error('피드백 처리 중 오류 발생:', error);
        }
    };

    const fetchUserFeedback = async (studentId) => {
        try {
            // 초기화
            initializeQuill();

            const response = await fetch(`http://localhost:3001/user/studentuserFeedback/${studentId}`);
            const json = await response.json();

            if (json.feedback !== null) {
                // 값이 null이 아닌 경우에만 Quill 에디터에 내용 설정
                setFeedback(json.feedback);
                // 초기로 내용을 보여주기 위해 setContent 호출
                quillInstance.current.clipboard.dangerouslyPasteHTML(json.feedback);
            } else {
                // 값이 null인 경우에는 이전 내용을 유지하지 않고 에디터 내용을 모두 비움
                setFeedback('');
                quillInstance.current.setText('');
                console.log('피드백이 null입니다.');
            }
        } catch (error) {
            console.error('Error fetching student user list:', error);
        }
    };

    useEffect(() => {
        // fetchUserFeedback 함수에 mainSelectedStudentId 전달하여 실행
        fetchUserFeedback(mainSelectedStudentId);
    }, [mainSelectedStudentId]);

    return (
        <Card>
            <EditorBlock>
                <Card.Title>
                    <h6>피드백 입력창</h6>
                </Card.Title>
                <hr />
                <Card.Text>
                    <QuillWrapper>
                        <div ref={quillElement} />
                    </QuillWrapper>
                    <WriteActionButtons onPublish={handlePublish} />
                </Card.Text>
            </EditorBlock>
        </Card>
    );
}
