import styled from "styled-components";
import { Droppable } from "react-beautiful-dnd";
import React from "react";
import { useRecoilValue } from "recoil";
import { draggingAtomState } from "../models/atoms";

const Wrapper = styled.div<{ startDragging: boolean; width: number }>`
  display: flex;
  width: ${(props) => props.width - 350 + "px"};
  height: 200px;
  flex-direction: column;
  margin-left: 100px;
  border-radius: 0 0 20px 20px;
  background-color: ${(props) =>
    props.startDragging ? (props) => props.theme.trashCanColor : "none"};
`;
const Area = styled.div<{ isDraggingOver: boolean }>`
  width: 100%;
  border-radius: 0 0 20px 20px;
  background-color: ${(props) =>
    props.isDraggingOver ? (props) => props.theme.trashCanColor : "none"};
  flex-grow: 1;
`;
const Text = styled.div<{ isDraggingOver: boolean }>`
  display: ${(props) => (props.isDraggingOver ? "block" : "none")};
  font-size: 20px;
  text-align: center;
  line-height: 2;
`;

function TaskTrashCan({ width }: { width: number }) {
  const isTaskDragging = useRecoilValue(draggingAtomState);
  return (
    <Wrapper startDragging={isTaskDragging} width={width}>
      <Droppable droppableId={"trashCanCard"}>
        {(provided, snapshot) => (
          <Area
            isDraggingOver={snapshot.isDraggingOver}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {provided.placeholder}
            <Text isDraggingOver={snapshot.isDraggingOver}>REMOVE TASK</Text>
          </Area>
        )}
      </Droppable>
    </Wrapper>
  );
}

export default React.memo(TaskTrashCan);
