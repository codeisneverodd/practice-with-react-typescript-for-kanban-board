import {Draggable, Droppable} from "react-beautiful-dnd";
import Task from "./Task";
import styled from "styled-components";
import {ITask, taskState} from "../models/atoms";
import {useForm} from "react-hook-form";
import {useSetRecoilState} from "recoil";
import React from "react";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 322px;
  padding: 24px;

`
const Form = styled.form`
  width: 100%
`

interface IForm {
    task: string;
}

const Area = styled.div<{ isDraggingOver: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 2px;
  flex-grow: 1;
  min-height: 400px;
  background-color: ${props => props.isDraggingOver ? props.theme.boardDraggingOverColor : "none"};
`
const Handle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 57px;
  align-items: baseline;

  button {
    display: none;
  }

  &:hover {
    button {
      display: block;
    }
  }
`
const Header = styled.div<{ boardColor: string }>`
  width: 122px;
  margin-left: 10px;
  font-size: 13px;
  text-align: center;
  line-height: 2;
  padding: 2px 4px;
  border-radius: 5px;
  background-color: ${props => props.boardColor ?? "#333333"};
`
const Input = styled.input`
  width: 274px;
  padding: 10px 22px 10px 22px;
  border-style: solid;
  border-color: #FFFFFF00;
  background-color: inherit;
  font-size: 14px;
  line-height: 2;
  text-align: left;
  color: ${props => props.theme.textColor};
  outline: none;

  &:hover, &:focus {
    outline: none;
    border-radius: 5px;
    background-color: ${props => props.theme.newTaskColor};
  }

  &::placeholder {
    color: inherit
  }
`

interface IBoard {
    boardId: string,
    tasks: ITask[],
    index: number
}

function Board({boardId, tasks, index}: IBoard) {
    const setTasks = useSetRecoilState(taskState)
    const {register, handleSubmit, setValue} = useForm<IForm>()
    const onValid = ({task}: IForm) => {
        const newTask = {id: Date.now(), text: task}
        setTasks(allTasks => ({
            ...allTasks,
            [boardId]: [newTask, ...allTasks[boardId]],
        }))
        setValue("task", "")
    }
    const onClick = () => {
        if (window.confirm(`Are you sure deleting "${boardId.slice(0, boardId.length - 22)}"? `)) {
            setTasks(allTasks => {
                let entries = Object.entries(allTasks)
                entries.splice(index, 1)
                return entries.reduce((r, [k, v]) => ({...r, [k]: v}), {})
            })
        }
    }
    return (
        <Draggable draggableId={boardId} index={index}>
            {(provided) => (
                <Wrapper ref={provided.innerRef} {...provided.draggableProps}>
                    <Handle {...provided.dragHandleProps}>
                        <Header
                            boardColor={boardId.slice(boardId.length - 21, boardId.length - 14)}>{boardId.slice(0, boardId.length - 22)}
                        </Header>
                        <button onClick={onClick}>Erase</button>
                    </Handle>
                    <Droppable droppableId={boardId}>
                        {(provided, snapshot) => (
                            <Area ref={provided.innerRef} {...provided.droppableProps}
                                  isDraggingOver={snapshot.isDraggingOver}>
                                {tasks.map((task, index) => <Task key={task.id} id={task.id} index={index}
                                                                  text={task.text}/>)}
                                {provided.placeholder}
                                <Form onSubmit={handleSubmit(onValid)}>
                                    <Input
                                        autoComplete={"off"} {...register("task", {required: true})}
                                        placeholder={"+ New"}/>
                                </Form>
                            </Area>
                        )}
                    </Droppable>
                </Wrapper>
            )}
        </Draggable>


    )
}

export default React.memo(Board)