import {Droppable} from "react-beautiful-dnd";
import React from "react";
import styled from "styled-components";

const TrashCanCardTemp = styled.div<{ isDraggingOver: boolean }>`
  width: 200px;
  background-color: ${props => props.isDraggingOver ? props => props.theme.trashCanColor : 'none'};;
`

function TrashCanBoard() {
    return (
        <>
            <Droppable droppableId={"trashCanBoard"} type={"boards"}>
                {(provided, snapshot) => (
                    <TrashCanCardTemp isDraggingOver={snapshot.isDraggingOver}
                                      ref={provided.innerRef} {...provided.droppableProps}>
                        {provided.placeholder}
                    </TrashCanCardTemp>
                )}
            </Droppable>
        </>
    )
}

export default TrashCanBoard

