import Board from "../components/Board";
import {DragDropContext, DropResult} from "react-beautiful-dnd";
import styled from "styled-components";
import {useRecoilState} from "recoil";
import {taskState} from "../models/atoms";
import TrashCan from "../components/TrashCan";
import AddBoard from "../components/AddBoard";
import {useEffect} from "react";
import {saveTodos} from "../models/localStorage";

const Boards = styled.div`
  display: flex;
  flex-wrap: nowrap;
  overflow-x: scroll;
`
const Grid = styled.div`
  display: flex;
  flex-wrap: nowrap;
  flex-direction: column;
`

function Home() {
    const [tasks, setTasks] = useRecoilState(taskState)
    const onDragEnd = (dropResult: DropResult) => {
        const {source, destination, draggableId} = dropResult
        if (!destination) return
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
        } else if (destination?.droppableId === "trashCan") {
            setTasks(allTasks => {
                let sourceBoard = [...allTasks[source.droppableId]]
                sourceBoard.splice(source.index, 1)
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
    useEffect(() => {
        saveTodos(tasks)
    }, [tasks])
    return (
        <>
            <h1>Home</h1>
            <DragDropContext onDragEnd={onDragEnd}>
                <Grid>
                    <TrashCan/>
                    <Boards>
                        {Object.keys(tasks).map(boardId =>
                            <Board key={boardId} boardId={boardId} tasks={tasks[boardId]}/>)}
                        <AddBoard/>
                    </Boards>
                </Grid>
            </DragDropContext>
        </>
    )
}

export default Home