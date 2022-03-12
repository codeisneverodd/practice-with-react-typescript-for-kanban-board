import {Draggable} from "react-beautiful-dnd";
import styled from "styled-components";
import React, {useEffect, useState} from "react";
import {useSetRecoilState} from "recoil";
import {draggingState} from "../models/atoms";

const Wrapper = styled.div<{ isDragging: boolean }>`
  width: 274px;
  padding: 10px 22px 10px 22px;
  background-color: ${props => props.isDragging ? props => props.theme.taskDraggingColor : props => props.theme.taskColor};
  border-radius: 5px;
  align-items: center;

  &:hover {
    background-color: ${props => props.theme.taskDraggingColor};
  }
`
const Text = styled.span`
  font-size: 14px;
  line-height: 2;
  text-align: left;
`

function Task({id, index, text}: { id: number, index: number, text: string }) {
    const [draggingCard, setDraggingCard] = useState(false)
    const setDraggingAtomState = useSetRecoilState(draggingState)
    useEffect(() => { // prevent unlimited re-rendering
        setDraggingAtomState(draggingCard)
    }, [draggingCard])
    return (
        <Draggable draggableId={id + ""} index={index}>
            {(provided, snapshot) => {
                setDraggingCard(snapshot.isDragging)
                return (
                    <Wrapper isDragging={snapshot.isDragging}
                             ref={provided.innerRef}{...provided.draggableProps}{...provided.dragHandleProps}>
                        <Text>{text}</Text>
                    </Wrapper>
                )
            }}
        </Draggable>
    )
}

export default React.memo(Task)