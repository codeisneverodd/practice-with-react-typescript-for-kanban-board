import {Draggable} from "react-beautiful-dnd";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100px;
  background-color: coral;
`

function Task({id, index, text}: { id: number, index: number, text: string }) {
    return (
        <Draggable draggableId={id + ""} index={index}>
            {(provided) => (
                <Wrapper ref={provided.innerRef}{...provided.draggableProps}{...provided.dragHandleProps}>
                    {text}
                </Wrapper>
            )}
        </Draggable>
    )
}

export default Task