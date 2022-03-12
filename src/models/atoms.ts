import { atom } from "recoil";
import { loadTasks } from "./localStorage";

export interface ITask {
  id: number;
  text: string;
}

export interface ITaskState {
  [key: string]: ITask[];
}

export const draggingAtomState = atom({
  key: "draggingAtomState",
  default: false,
});

export const boardColorList = atom({
  key: "boardColorList",
  default: [
    "#2ecc71",
    "#e67e22",
    "#e74c3c",
    "#2c3e50",
    "#8e44ad",
    "#16a085",
    "#f39c12",
  ],
});
//emerald, carrot, alizarin, midnightBlue, wisteria, greenSea, orange

export const taskState = atom<ITaskState>({
  key: "taskState",
  default: loadTasks() ?? {
    "Completed-#2ecc71-1234512345123": [],
    "In progress-#e67e22-1234512345123": [],
    "Not started-#e74c3c-1234512345123": [],
  },
});
