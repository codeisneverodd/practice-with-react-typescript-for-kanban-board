import Board from "../components/Board";
import {DragDropContext, Droppable, DropResult} from "react-beautiful-dnd";
import styled from "styled-components";
import {useRecoilState} from "recoil";
import {taskState} from "../models/atoms";
import TrashCan from "../components/TrashCan";
import AddBoard from "../components/AddBoard";
import {useEffect} from "react";
import {saveLocal} from "../models/localStorage";

const Boards = styled.div`
  display: flex;
  flex-grow: 1;
  overflow-x: scroll;
  align-items: baseline;

  &::-webkit-scrollbar {
    display: none;
  }
`
const Grid = styled.div`
  display: flex;
  flex-direction: column;
`

function Home() {
    const [tasks, setTasks] = useRecoilState(taskState)
    const onDragEnd = (dropResult: DropResult) => {
        const {source, destination, draggableId, type} = dropResult
        if (!destination) return
        if (type === "boards") {
            if (source.droppableId === destination?.droppableId) {
                setTasks(allTasks => {
                    let entries = Object.entries(allTasks)
                    const [temp] = entries.splice(source.index, 1)
                    entries.splice(destination.index, 0, temp);
                    return entries.reduce((r, [k, v]) => ({...r, [k]: v}), {})
                })
            } else if (destination?.droppableId === "trashCanBoard") {
                setTasks(allTasks => {
                    let entries = Object.entries(allTasks)
                    entries.splice(source.index, 1)
                    return entries.reduce((r, [k, v]) => ({...r, [k]: v}), {})
                })
            } else {
                return
            }
        } else {
            //Same board
            if (source.droppableId === destination?.droppableId) {
                setTasks(allTasks => {
                    let result = [...allTasks[destination.droppableId]]
                    const grabbed = result[source.index]
                    result.splice(source.index, 1)
                    result.splice(destination?.index, 0, grabbed)
                    return {
                        ...allTasks,
                        [destination?.droppableId]: result,
                    }
                })
            } else if (destination?.droppableId === "trashCanCard") {
                setTasks(allTasks => {
                    let sourceBoard = [...allTasks[source.droppableId]]
                    sourceBoard.splice(source.index, 1)
                    console.log("working")
                    return {
                        ...allTasks,
                        [source.droppableId]: sourceBoard,
                    }
                })
            } else if (source?.droppableId !== destination?.droppableId) {
                setTasks(allTasks => {
                    let sourceBoard = [...allTasks[source.droppableId]]
                    let destinationBoard = [...allTasks[destination?.droppableId]]
                    const grabbed = sourceBoard[source.index]
                    sourceBoard.splice(source.index, 1)
                    destinationBoard.splice(destination?.index, 0, grabbed)
                    return {
                        ...allTasks,
                        [source.droppableId]: sourceBoard,
                        [destination?.droppableId]: destinationBoard,
                    }
                })
            }
        }
    }
    useEffect(() => {
        saveLocal(tasks)
    }, [tasks])
    return (
        <>
            <DragDropContext onDragEnd={onDragEnd}>
                <TrashCan/>
                <Droppable droppableId={"boards"} type={"boards"} direction={"horizontal"}>
                    {(provided) => (
                        <Grid ref={provided.innerRef} {...provided.droppableProps}>
                            <Boards>
                                {Object.keys(tasks).map((boardId, index) =>
                                    <Board key={boardId} index={index} boardId={boardId}
                                           tasks={tasks[boardId]}/>)}
                                <AddBoard/>
                            </Boards>
                            {provided.placeholder}
                        </Grid>
                    )}
                </Droppable>
            </DragDropContext>
        </>
    )
}

export default Home