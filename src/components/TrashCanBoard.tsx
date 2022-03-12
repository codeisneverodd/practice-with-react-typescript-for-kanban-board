import {Droppable} from "react-beautiful-dnd";
import React from "react";
import styled from "styled-components";


const Wrapper = styled.div`
  display: flex;
  width: 200px;
  flex-direction: column;
  margin: 40px;
  background-color: tomato;
`
const Area = styled.div<{ isDraggingOver: boolean }>`
  width: 100%;
  background-color: ${props => props.isDraggingOver ? props => props.theme.trashCanColor : 'none'};
  flex-grow: 1;
`
const Text = styled.div<{ isDraggingOver: boolean }>`
  display: ${props => props.isDraggingOver ? 'block' : 'none'};
  text-align: center;
  line-height: 2;
`

function TrashCanBoard() {
    return (
        <Wrapper>
            <Droppable droppableId={"trashCanBoard"} type={"boards"}>
                {(provided, snapshot) => (
                    <Area isDraggingOver={snapshot.isDraggingOver}
                          ref={provided.innerRef} {...provided.droppableProps}>
                        {provided.placeholder}
                        <Text isDraggingOver={snapshot.isDraggingOver}>REMOVE BOARD</Text>
                    </Area>
                )}
            </Droppable>
        </Wrapper>
    )
}

export default TrashCanBoard

