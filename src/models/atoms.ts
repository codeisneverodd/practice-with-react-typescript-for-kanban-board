import {atom, selector} from "recoil";
import {loadTasks} from "./localStorage";

export interface ITask {
    id: number;
    text: string;
}

export interface ITaskState {
    [key: string]: ITask[];
}

export const boardColorState = atom({
    key: "boardColor",
    default: ["#2ecc71", "#e67e22", "#e74c3c", "#2c3e50", "#8e44ad", "#16a085", "#f39c12"]
})
//emerald, carrot, alizarin, midnightBlue, wisteria, greenSea, orange

export const taskState = atom<ITaskState>({
    key: "tasks",
    default: loadTasks() ?? {
        completed: [],
        inProgress: [],
        notStarted: [],
    }
})

export const boardColorSelector = selector({
    key: "boardColorSelector",
    get: ({get}) => {
        const boardColor = get(boardColorState)
        const boards = get(taskState)
        return boardColor[Object.keys(boards).length % boardColor.length]
    }
})
