import { useRef, useEffect } from 'react';
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
    .ql-editor{
        height: 130px;
        padding: 5px;
        max-height: 220px;
        font-size: 1.125rem
        line-height: 1.5;
    }
    .ql-editor.ql-blank::before{
        left: 0px;
    }
    
`;

export default function InputBox() {
    const quillElement = useRef(null);
    const quillInstance = useRef(null);
    useEffect(() => {
        quillInstance.current = new Quill(quillElement.current, {
            theme: 'bubble',
            placeholder: '내용을 작성하세요...',
            modules: {
                toolbar: [
                    [{ herder: '1' }, { herder: '2' }],
                    ['bold', 'italic', 'underline', 'strike'],
                    [{ list: 'ordered' }, { list: 'bullet' }],
                    ['blockqoute', 'code-block', 'link', 'image'],
                ],
            },
        });
    }, []);

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
                    {/* <hr/> */}
                    <WriteActionButtons />
                </Card.Text>
            </EditorBlock>
        </Card>
    );
}

