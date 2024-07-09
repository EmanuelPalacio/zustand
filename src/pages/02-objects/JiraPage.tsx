import { JiraTasks } from "../../components";
import useTaskStore from "../../store/task.store";

export const JiraPage = () => {
    const doneTasks = useTaskStore((state) => state.getTaskByStatus("done"));
    const inProgressTasks = useTaskStore((state) => state.getTaskByStatus("in-progress"));
    const pendingTasks = useTaskStore((state) => state.getTaskByStatus("pending"));
    return (
        <>
            <h1>Tareas</h1>
            <p>Manejo de estado con objectos de Zustand</p>
            <hr />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <JiraTasks title="Pendientes" value="pending" tasks={pendingTasks} />
                <JiraTasks title="En progreso" value="in-progress" tasks={inProgressTasks} />
                <JiraTasks title="Terminadas" value="done" tasks={doneTasks} />
            </div>
        </>
    );
};
