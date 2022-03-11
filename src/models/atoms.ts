import {atom} from "recoil";
import {loadTasks} from "./localStorage";

export interface ITask {
    id: number;
    text: string;
}

export interface ITaskState {
    [key: string]: ITask[];
}


export const taskState = atom<ITaskState>({
    key: "tasks",
    default: loadTasks() ?? {
        completed: [],
        inProgress: [],
        notStarted: [],
    }
})
