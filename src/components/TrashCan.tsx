import styled from "styled-components";
import {Droppable} from "react-beautiful-dnd";
import React from "react";

const Wrapper = styled.div`
  display: flex;
  height: 200px;
  flex-direction: column;
  background-color: tomato;
  margin: 40px;
`
const TrashCanCard = styled.div`
  width: 1000px;
  background-color: aqua;
  flex-grow: 3;
`
const TrashCanBoard = styled.div`
  width: 1000px;
  background-color: blueviolet;
  flex-grow: 1;
`


function TrashCan() {
    return (
        <Wrapper>
            <Droppable droppableId={"trashCanBoard"} type={"boards"}>
                {(provided) => (
                    <TrashCanBoard ref={provided.innerRef} {...provided.droppableProps}>
                        {provided.placeholder}
                    </TrashCanBoard>
                )}
            </Droppable>
            <Droppable droppableId={"trashCanCard"}>
                {(provided) => (
                    <TrashCanCard ref={provided.innerRef} {...provided.droppableProps}>
                        {provided.placeholder}
                    </TrashCanCard>
                )}
            </Droppable>
        </Wrapper>
    )
}

export default React.memo(TrashCan)