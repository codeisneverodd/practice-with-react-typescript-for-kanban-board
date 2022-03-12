import { ITaskState } from "./atoms";

export const LOCAL_TASK_STATE = "recoil_tasks";
export const LOCAL_COLOR_COUNT_STATE = "recoil_color_count";

export const loadTasks = () => {
  const localTasks = localStorage.getItem(LOCAL_TASK_STATE);
  if (localTasks) {
    return JSON.parse(localTasks);
  }
  return null;
};

export const loadColorCount = () => {
  const localTasks = localStorage.getItem(LOCAL_COLOR_COUNT_STATE);
  if (localTasks) {
    const json = JSON.parse(localTasks);
    return json.count + 1;
  }
  return 3;
};

export const saveTasks = (tasks: ITaskState) => {
  localStorage.setItem(LOCAL_TASK_STATE, JSON.stringify(tasks));
};
export const saveColorCount = (colorCount: object) => {
  localStorage.setItem(LOCAL_COLOR_COUNT_STATE, JSON.stringify(colorCount));
};
