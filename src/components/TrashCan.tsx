import styled from "styled-components";
import {Droppable} from "react-beautiful-dnd";
import React from "react";

const Wrapper = styled.div`
  display: flex;
  height: 200px;
  flex-direction: column;
  margin: 40px;
`
const TrashCanCard = styled.div`
  width: 100%;
  background-color: ${props => props.theme.trashCanColor};
  flex-grow: 3;
`
const TrashCanBoard = styled.div`
  width: 100%;
  background-color: ${props => props.theme.trashCanColor};
  flex-grow: 1;
`
const Text = styled.div`
  text-align: center;
  line-height: 2;
`


function TrashCan() {
    return (
        <Wrapper>
            <Droppable droppableId={"trashCanBoard"} type={"boards"}>
                {(provided) => (
                    <TrashCanBoard ref={provided.innerRef} {...provided.droppableProps}>
                        {provided.placeholder}
                        <Text>REMOVE BOARD</Text>
                    </TrashCanBoard>
                )}
            </Droppable>
            <Droppable droppableId={"trashCanCard"}>
                {(provided) => (
                    <TrashCanCard ref={provided.innerRef} {...provided.droppableProps}>
                        {provided.placeholder}
                        <Text>REMOVE TASK</Text>
                    </TrashCanCard>
                )}
            </Droppable>
        </Wrapper>
    )
}

export default React.memo(TrashCan)