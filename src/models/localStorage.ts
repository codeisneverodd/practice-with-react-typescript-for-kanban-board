import {ITaskState} from './atoms';

export const LOCAL_TASK_STATE = 'recoil_tasks';

export const loadTasks = () => {
    const localTasks = localStorage.getItem(LOCAL_TASK_STATE);
    if (localTasks) {
        return JSON.parse(localTasks);
    }
    return null;
};

export const saveTodos = (todos: ITaskState) => {
    localStorage.setItem(LOCAL_TASK_STATE, JSON.stringify(todos));
};