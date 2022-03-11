import {Draggable} from "react-beautiful-dnd";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 274px;
  padding: 10px 22px 10px 22px;
  background-color: ${props => props.theme.taskColor};
  border-radius: 5px;
  align-items: center;
`
const Text = styled.span`
  font-size: 14px;
  line-height: 2;
  text-align: left;
`

function Task({id, index, text}: { id: number, index: number, text: string }) {
    return (
        <Draggable draggableId={id + ""} index={index}>
            {(provided) => (
                <Wrapper ref={provided.innerRef}{...provided.draggableProps}{...provided.dragHandleProps}>
                    <Text>{text}</Text>
                </Wrapper>
            )}
        </Draggable>
    )
}

export default Task