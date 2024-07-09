import { create, StateCreator } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

export type TaskStatus = "pending" | "in-progress" | "done";

export interface Task {
    id: string;
    title: string;
    status: TaskStatus;
}
interface TaskStore {
    tasks: Record<string, Task>; // es lo mismo que poner {[key:string]:Task}
    draginTaskId?: string;
    getTaskByStatus: (status: TaskStatus) => Array<Task>;
    addTask: (title: string, status: TaskStatus) => void;

    setDragByid: (taskId: string) => void;
    removeDragId: () => void;
    changeTaskStatus: (taskId: string, status: TaskStatus) => void;
    onTaskDrop: (status: TaskStatus) => void;
}
// eslint-disable-next-line react-refresh/only-export-components
const TaskStoreAPI: StateCreator<TaskStore, [["zustand/immer", never]]> = (set, get) => ({
    tasks: {
        "abc-1": { id: "abc-1", title: "Task 1", status: "pending" },
        "abc-2": { id: "abc-2", title: "Task 2", status: "in-progress" },
        "abc-3": { id: "abc-3", title: "Task 3", status: "pending" },
        "abc-4": { id: "abc-4", title: "Task 4", status: "pending" },
    },
    draginTaskId: undefined,
    getTaskByStatus: (status: TaskStatus) => {
        const tasks = get().tasks;
        return Object.values(tasks).filter((filter) => filter.status === status);
    },
    addTask: (title, status) => {
        let id = "";
        for (let index = 0; index < 4; index++) {
            id = id + Math.floor(Math.random() * 10).toString();
        }
        /*  set((state) => ({
            tasks: {
                ...state.tasks,
                [id]: { id, title, status },
            },
        })); */

        set((state) => {
            state.tasks[id] = { id, title, status };
        });
    },
    setDragByid: (taskId) => {
        set({ draginTaskId: taskId });
    },
    removeDragId: () => set({ draginTaskId: undefined }),
    /* changeTaskStatus: (id, status) => {
        const task = get().tasks[id];
        if (task) {
            task.status = status;
            set((state) => ({
                tasks: {
                    ...state.tasks,
                    [id]: task,
                },
            }));
        }
    }, */
    changeTaskStatus: (id, status) => {
        const task = get().tasks[id];
        if (task) {
            set((state) => {
                state.tasks[id].status = status;
            });
        }
    },
    onTaskDrop: (status) => {
        const taskID = get().draginTaskId;
        if (!taskID) return;
        get().changeTaskStatus(taskID, status);
        get().removeDragId();
    },
});
const useTaskStore = create<TaskStore>()(devtools(persist(immer(TaskStoreAPI), { name: "taskStore" })));
export default useTaskStore;
