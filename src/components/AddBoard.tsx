import React from "react";
import styled from "styled-components";
import {useForm} from "react-hook-form";
import {useRecoilValue, useSetRecoilState} from "recoil";
import {nextColorGetter, taskState} from "../models/atoms";

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
const Input = styled.input<{ boardColor: string }>`
  width: 122px;
  margin-left: 10px;
  font-size: 13px;
  text-align: center;
  line-height: 2;
  color: ${props => props.theme.textColor};
  padding: 2px 4px;
  border-radius: 5px;
  background-color: ${props => props.boardColor}
}

;

&:focus {
  outline: none
}

&::placeholder {
  color: inherit
}
`
const Error = styled.div`
  padding: 30px 10px 10px 10px;
  text-align: left;
`

function AddBoard() {
    const setTasks = useSetRecoilState(taskState)
    const nextColor = useRecoilValue(nextColorGetter)
    const {register, handleSubmit, setValue, formState: {errors}} = useForm<IForm>()
    const onValid = ({boardId}: IForm) => {
        setTasks(allTasks => ({
            ...allTasks,
            [boardId + "-" + nextColor + "-" + Date.now()]: [],
        }))
        setValue("boardId", "")
    }
    return (
        <Wrapper>
            <Form onSubmit={handleSubmit(onValid)}>
                <Input boardColor={nextColor} autoComplete={"off"} {...register("boardId", {
                    required: true,
                    maxLength: {
                        value: 10,
                        message: "It must be less than 10 characters"
                    }
                })}
                       placeholder={"+ New Board"}/>
                <Error>{errors?.boardId?.message}</Error>
            </Form>
        </Wrapper>
    )
}

export default AddBoard