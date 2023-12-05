import styled from "styled-components";
import Button from "../../../common/Button";

const WriteActionButtonsBlock = styled.div`
    margin-top: 1rem;
    margin-bottom: 3rem;
    button + button {
        margin-left: 0.5rem;
    }
`;

const StyleButton = styled(Button)`
    height: 2rem;
    & + & {
        margin-left: 0.5rem;
    }
`;

const WriteActionButtons = ({onPublish}) =>{
    return (
        <WriteActionButtonsBlock>
            <StyleButton cyan onClick={onPublish}>
                피드백 저장
            </StyleButton>
        </WriteActionButtonsBlock>
    )
};

export default WriteActionButtons;