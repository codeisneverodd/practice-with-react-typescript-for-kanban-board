import styled from "styled-components";
import {Droppable} from "react-beautiful-dnd";
import React from "react";
import {useRecoilValue} from "recoil";
import {draggingState} from "../models/atoms";

const Wrapper = styled.div<{ startDragging: boolean, width: number }>`
  display: flex;
  width: ${props => props.width + "px"};
  height: 200px;
  flex-direction: column;
  margin: 40px;
  background-color: ${props => props.startDragging ? 'tomato' : 'none'};
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


function TrashCanTask({width}: { width: number }) {
    const dragging = useRecoilValue(draggingState)
    console.log(width)
    return (
        <Wrapper startDragging={dragging} width={width}>
            <Droppable droppableId={"trashCanCard"}>
                {(provided, snapshot) => (
                    <Area isDraggingOver={snapshot.isDraggingOver}
                          ref={provided.innerRef} {...provided.droppableProps}>
                        {provided.placeholder}
                        <Text isDraggingOver={snapshot.isDraggingOver}>REMOVE TASK</Text>
                    </Area>
                )}
            </Droppable>
        </Wrapper>
    )
}

export default React.memo(TrashCanTask)