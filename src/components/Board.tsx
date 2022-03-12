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

const Area = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 10px;
  flex-grow: 1;
`
const Handle = styled.div`
  height: 57px;
  align-items: baseline;
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
  background-color: ${props => props.theme.taskColor};
  border-radius: 5px;
  font-size: 14px;
  line-height: 2;
  text-align: left;
  color: ${props => props.theme.textColor};

  &:focus {
    outline: none
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
    console.log(boardId.slice(boardId.length - 21, boardId.length - 14))
    return (
        <Draggable draggableId={boardId} index={index}>
            {(provided) => (
                <Wrapper ref={provided.innerRef} {...provided.draggableProps}>
                    <Handle {...provided.dragHandleProps}>
                        <Header
                            boardColor={boardId.slice(boardId.length - 21, boardId.length - 14)}>{boardId.slice(0, boardId.length - 22)}</Header>
                    </Handle>
                    <Droppable droppableId={boardId}>
                        {(provided) => (
                            <Area ref={provided.innerRef} {...provided.droppableProps}>
                                {tasks.map((task, index) => <Task key={task.id} id={task.id} index={index}
                                                                  text={task.text}/>)}
                                {provided.placeholder}
                                <Form onSubmit={handleSubmit(onValid)}>
                                    <Input autoComplete={"off"} {...register("task", {required: true})}
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