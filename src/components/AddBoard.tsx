import React, { useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { boardColorList, taskState } from "../models/atoms";
import { Draggable } from "react-beautiful-dnd";
import { loadColorCount, saveColorCount } from "../models/localStorage";

interface INewBoardForm {
  boardId: string;
}

const NewBoardForm = styled.form`
  width: 100%;
`;
const Wrapper = styled.div`
  width: 400px;
  margin: 40px;
`;
const NewBoardInput = styled.input<{ boardColor: string }>`
  width: 122px;
  padding: 2px 4px;
  margin-left: 10px;
  //style
  border-radius: 5px;
  background-color: ${(props) => props.boardColor};
  //font
  font-size: 13px;
  text-align: center;
  line-height: 2;
  color: ${(props) => props.theme.textColor};

  &:focus {
    outline: none;

    &::placeholder {
      color: transparent;
    }
  }

  &::placeholder {
    color: inherit;
  }
`;
const ErrorMessage = styled.div`
  padding: 30px 10px 10px 10px;
  text-align: left;
`;

function AddBoard({ index }: { index: number }) {
  const setTasks = useSetRecoilState(taskState);
  const colors = useRecoilValue(boardColorList);
  const [colorCount, setColorCount] = useState(loadColorCount);
  const nextColor = colors[colorCount % colors.length];
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<INewBoardForm>();
  const onValid = ({ boardId }: INewBoardForm) => {
    setTasks((allTasks) => ({
      // Board ID structure.
      ...allTasks,
      [boardId + "-" + nextColor + "-" + Date.now()]: [],
    }));
    setColorCount(colorCount + 1);
    //Save Count in localStorage
    saveColorCount({ count: colorCount });
    setValue("boardId", "");
  };
  return (
    <Draggable draggableId={"addBoard"} index={index}>
      {({ innerRef, draggableProps, dragHandleProps }) => (
        <Wrapper ref={innerRef} {...draggableProps} {...dragHandleProps}>
          <NewBoardForm onSubmit={handleSubmit(onValid)}>
            <NewBoardInput
              boardColor={nextColor}
              autoComplete={"off"}
              {...register("boardId", {
                required: true,
                maxLength: {
                  value: 12,
                  message: "Board name must be less than 12 characters",
                },
              })}
              placeholder={"+ New Board"}
            />
            <ErrorMessage>{errors?.boardId?.message}</ErrorMessage>
          </NewBoardForm>
        </Wrapper>
      )}
    </Draggable>
  );
}

export default React.memo(AddBoard);
