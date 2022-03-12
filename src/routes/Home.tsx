import Board from "../components/Board";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import styled from "styled-components";
import { useRecoilState, useSetRecoilState } from "recoil";
import { draggingAtomState, taskState } from "../models/atoms";
import AddBoard from "../components/AddBoard";
import { useEffect, useRef, useState } from "react";
import { saveTasks } from "../models/localStorage";
import TaskTrashCan from "../components/TaskTrashCan";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
`;
const Boards = styled.div`
  display: flex;
  flex-grow: 1;
  align-items: baseline;
`;

function Home() {
  const [tasks, setTasks] = useRecoilState(taskState);
  const setDraggingAtomState = useSetRecoilState(draggingAtomState);
  const [trashCanWidth, setTrashCanWidth] = useState(1000);
  const boardWidthRef = useRef<HTMLDivElement>(null);

  const onDragEnd = (dropResult: DropResult) => {
    const { source, destination, type } = dropResult;
    if (!destination) return;
    if (type === "boards") {
      if (source.droppableId === destination?.droppableId) {
        // Move Boards
        setTasks((allTasks) => {
          let boardEntries = Object.entries(allTasks);
          const [sourceBoard] = boardEntries.splice(source.index, 1);
          boardEntries.splice(destination.index, 0, sourceBoard);
          return boardEntries.reduce(
            (modifiedBoards, [boardId, tasks]) => ({
              ...modifiedBoards,
              [boardId]: tasks,
            }),
            {}
          );
        });
      }
    } else {
      // Move Tasks
      if (source.droppableId === destination?.droppableId) {
        // Move a task in same board.
        setTasks((allTasks) => {
          let reOrderedTasks = [...allTasks[destination.droppableId]];
          const sourceTask = reOrderedTasks[source.index];
          reOrderedTasks.splice(source.index, 1);
          reOrderedTasks.splice(destination?.index, 0, sourceTask);
          return {
            ...allTasks,
            [destination?.droppableId]: reOrderedTasks,
          };
        });
      } else if (destination?.droppableId === "trashCanCard") {
        // Move task to trash
        setTasks((allTasks) => {
          let modifiedTasks = [...allTasks[source.droppableId]];
          modifiedTasks.splice(source.index, 1);
          return {
            ...allTasks,
            [source.droppableId]: modifiedTasks,
          };
        });
        setDraggingAtomState(false); // To show trashCan area
      } else if (source?.droppableId !== destination?.droppableId) {
        // Move task to different board
        setTasks((allTasks) => {
          let modifiedSourceTasks = [...allTasks[source.droppableId]];
          let modifiedDestinationTasks = [
            ...allTasks[destination?.droppableId],
          ];
          const sourceTask = modifiedSourceTasks[source.index];
          modifiedSourceTasks.splice(source.index, 1);
          modifiedDestinationTasks.splice(destination?.index, 0, sourceTask);
          return {
            ...allTasks,
            [source.droppableId]: modifiedSourceTasks,
            [destination?.droppableId]: modifiedDestinationTasks,
          };
        });
      } else {
        return;
      }
    }
  };
  useEffect(() => {
    saveTasks(tasks);
    setTrashCanWidth(
      boardWidthRef?.current ? boardWidthRef?.current?.offsetWidth : 1000
    );
  }, [tasks]);
  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <TaskTrashCan width={trashCanWidth} />
        <Droppable
          droppableId={"boards"}
          type={"boards"}
          direction={"horizontal"}
        >
          {({ innerRef, droppableProps, placeholder }) => (
            <Wrapper ref={innerRef} {...droppableProps}>
              <Boards ref={boardWidthRef}>
                {Object.keys(tasks).map((boardId, index) => (
                  <Board
                    key={boardId}
                    index={index}
                    boardId={boardId}
                    tasks={tasks[boardId]}
                  />
                ))}
                <AddBoard index={Object.keys(tasks).length} />
              </Boards>
              {placeholder}
            </Wrapper>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
}

export default Home;
