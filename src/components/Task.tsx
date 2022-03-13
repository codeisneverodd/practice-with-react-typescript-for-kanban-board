import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { draggingAtomState } from "../models/atoms";

interface IIndexedTask {
  id: number;
  index: number;
  text: string;
}

const Wrapper = styled.div<{ isDragging: boolean }>`
  width: 274px;
  padding: 10px 22px 10px 22px;
  background-color: ${(props) =>
    props.isDragging
      ? (props) => props.theme.taskDraggingColor
      : (props) => props.theme.taskColor};
  border-radius: 5px;
  align-items: center;

  &:hover {
    background-color: ${(props) => props.theme.taskDraggingColor};
  }
`;
const Text = styled.span`
  word-break: break-all;
  font-size: 14px;
  line-height: 2;
  text-align: left;
`;

function Task({ id, index, text }: IIndexedTask) {
  const [isDragging, setIsDragging] = useState(false);
  const [draggingState, setDraggingAtomState] =
    useRecoilState(draggingAtomState);
  useEffect(() => {
    // prevent unlimited re-rendering
    setDraggingAtomState(isDragging);
  }, [isDragging, draggingState]);
  return (
    <Draggable draggableId={id + ""} index={index}>
      {({ innerRef, draggableProps, dragHandleProps }, { isDragging }) => {
        setIsDragging(isDragging);
        return (
          <Wrapper
            isDragging={isDragging}
            ref={innerRef}
            {...draggableProps}
            {...dragHandleProps}
          >
            <Text>{text}</Text>
          </Wrapper>
        );
      }}
    </Draggable>
  );
}

export default React.memo(Task);
