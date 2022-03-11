import styled from "styled-components";
import {Droppable} from "react-beautiful-dnd";

const Wrapper = styled.div`
  display: flex;
  height: 400px;
  flex-direction: row;
  background-color: antiquewhite;
  margin: 40px;
`
const Area = styled.div`
  flex-grow: 1;
`

function TrashCan() {
    return (
        <Wrapper>
            <div>TrashCan</div>
            <Droppable droppableId={"trashCan"}>
                {(provided) => (
                    <Area ref={provided.innerRef} {...provided.droppableProps}>
                        {provided.placeholder}
                    </Area>
                )}
            </Droppable>
        </Wrapper>
    )
}

export default TrashCan