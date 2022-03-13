import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { boardColorList, taskState } from "../models/atoms";
import { Draggable } from "react-beautiful-dnd";
import { loadColorCount, saveColorCount } from "../models/localStorage";

interface INewBoardForm {
  boardId: string;
}

const Wrapper = styled.div`
  width: 400px;
  margin-left: 100px;
`;
const NewBoardForm = styled.form`
  width: 100%;
`;
const NewBoardInput = styled.input<{ boardColor: string; disabled: boolean }>`
  width: 122px;
  padding: 2px 4px;
  margin-left: 10px;
  //style
  border-style: ${(props) => (props.disabled ? "none" : "inherit")};
  border-radius: 5px;
  background-color: ${(props) =>
    props.disabled
      ? (props) => props.theme.bgColor
      : (props) => props.boardColor};
  //font
  font-size: 13px;
  text-align: center;
  line-height: 2;
  color: ${(props) =>
    props.disabled
      ? (props) => props.theme.textBlurColor
      : (props) => props.theme.textColor};

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
  color: ${(props) => props.theme.textBlurColor};
`;

const LimitMessage = styled.div<{ disabled: boolean }>`
  display: ${(props) => (props.disabled ? "block" : "none")};
  min-height: 400px;
  color: transparent;

  &:hover {
    color: ${(props) => props.theme.textBlurColor};
  }
`;

function AddBoard({ index }: { index: number }) {
  const setTasks = useSetRecoilState(taskState);
  const colors = useRecoilValue(boardColorList);
  const [disabled, setDisabled] = useState(false);
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
  useEffect(() => {
    index > 4 ? setDisabled(true) : setDisabled(false);
  }, [index]);
  return (
    <Draggable draggableId={"addBoard"} index={index}>
      {({ innerRef, draggableProps, dragHandleProps }) => (
        <Wrapper ref={innerRef} {...draggableProps} {...dragHandleProps}>
          <LimitMessage disabled={disabled}>
            👻 LIMITED TO 5 BOARDS 👻
          </LimitMessage>
          <NewBoardForm onSubmit={handleSubmit(onValid)}>
            <NewBoardInput
              disabled={disabled}
              boardColor={nextColor}
              autoComplete={"off"}
              {...register("boardId", {
                required: true,
                maxLength: {
                  value: 12,
                  message: "Board name must be less than 12 characters",
                },
              })}
              placeholder={disabled ? "" : "+ New Board"}
            />
            <ErrorMessage>{errors?.boardId?.message}</ErrorMessage>
          </NewBoardForm>
        </Wrapper>
      )}
    </Draggable>
  );
}

export default React.memo(AddBoard);
