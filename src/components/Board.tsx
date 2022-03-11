import {Droppable} from "react-beautiful-dnd";
import Task from "./Task";
import styled from "styled-components";
import {ITask, taskState} from "../models/atoms";
import {useForm} from "react-hook-form";
import {useSetRecoilState} from "recoil";
import React from "react";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
  background-color: antiquewhite;
  margin: 40px;
  min-width: 400px;
  min-height: 600px;
`
const Form = styled.form`
  width: 100%
`

interface IForm {
    task: string;
}

const Area = styled.div`
  flex-grow: 1;
`

function Board({boardId, tasks}: { boardId: string, tasks: ITask[] }) {
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
    return (
        <Wrapper>
            <div>Board</div>
            <Droppable droppableId={boardId}>
                {(provided) => (
                    <Area ref={provided.innerRef} {...provided.droppableProps}>
                        {tasks.map((task, index) => <Task key={task.id} id={task.id} index={index} text={task.text}/>)}
                        {provided.placeholder}
                        <Form onSubmit={handleSubmit(onValid)}>
                            <input {...register("task", {required: true})} placeholder={"+ New"}/>
                        </Form>
                    </Area>
                )}
            </Droppable>
        </Wrapper>

    )
}

export default React.memo(Board)