import {atom, selector} from "recoil";
import {loadTasks} from "./localStorage";

export interface ITask {
    id: number;
    text: string;
}


export interface ITaskState {
    [key: string]: ITask[];
}

export const draggingState = atom({
    key: "draggingState",
    default: false
})

export const boardColorList = atom({
    key: "boardColorList",
    default: ["#2ecc71", "#e67e22", "#e74c3c", "#2c3e50", "#8e44ad", "#16a085", "#f39c12"]
})
//emerald, carrot, alizarin, midnightBlue, wisteria, greenSea, orange


export const taskState = atom<ITaskState>({
    key: "tasks",
    default: loadTasks() ?? {
        "Completed-#2ecc71-1234512345123": [],
        "In progress-#e67e22-1234512345123": [],
        "Not started-#e74c3c-1234512345123": [],
    }
})


export const nextColorSelector = selector({
    key: "nextColorSelector",
    get: ({get}) => {
        const boardColor = get(boardColorList)
        const tasks = get(taskState)
        return boardColor[Object.keys(tasks).length % 7 * Math.floor(Math.random() * 10) % 7]
    },
})