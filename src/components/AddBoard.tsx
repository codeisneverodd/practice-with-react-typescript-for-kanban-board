import React from "react";
import styled from "styled-components";
import {useForm} from "react-hook-form";
import {useRecoilState} from "recoil";
import {taskState} from "../models/atoms";

const Form = styled.form`
  width: 100%
`

interface IForm {
    boardId: string;
}

const Wrapper = styled.div`
  width: 400px;
  margin: 40px;
`

function AddBoard() {
    const [tasks, setTasks] = useRecoilState(taskState)
    const {register, handleSubmit, setValue} = useForm<IForm>()
    const onValid = ({boardId}: IForm) => {
        setTasks(allTasks => ({
            ...allTasks,
            [boardId + Date.now()]: []
        }))
        setValue("boardId", "")
    }
    return (
        <Wrapper>
            <Form onSubmit={handleSubmit(onValid)}>
                <input {...register("boardId", {required: true})}
                       placeholder={"+ New Board"}/>
            </Form>
        </Wrapper>
    )
}

export default AddBoard