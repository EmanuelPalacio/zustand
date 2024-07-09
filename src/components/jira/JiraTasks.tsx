import { IoAddOutline, IoCheckmarkCircleOutline } from "react-icons/io5";
import useTaskStore, { Task, TaskStatus } from "../../store/task.store";
import SingleTask from "./SingleTask";
import { useRef, useState, type DragEvent } from "react";

interface Props {
    title: string;
    tasks: Array<Task>;
    value: TaskStatus;
}

export const JiraTasks: React.FC<Props> = ({ title, tasks, value }) => {
    const [dragOver, setDragOver] = useState(false);
    const REF = useRef<HTMLDivElement>(null);
    const isDragingTaskId = useTaskStore((state) => state.draginTaskId);
    const onTaskDrop = useTaskStore((state) => state.onTaskDrop);
    const addTask = useTaskStore((state) => state.addTask);

    const handleAddTask = () => {
        addTask("nuevo titulo", value);
    };
    const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        console.log("onDragOver");
        setDragOver(true);
    };
    const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        console.log("onDragLeave");
        setDragOver(false);
    };
    const handleDrop = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        console.log("onDrop", value);
        setDragOver(false);
        onTaskDrop(value);
    };

    isDragingTaskId
        ? REF.current?.classList.add("border-blue-500", "border-dotted")
        : REF.current?.classList.remove("border-blue-500", "border-dotted");
    dragOver ? REF.current?.classList.add("border-green-500") : REF.current?.classList.remove("border-green-500");

    return (
        <div
            ref={REF}
            className="!text-black border-4 relative flex flex-col rounded-[20px]  bg-white bg-clip-border shadow-3xl shadow-shadow-500  w-full !p-4 3xl:p-![18px]"
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
        >
            {/* Task Header */}
            <div className="relative flex flex-row justify-between">
                <div className="flex items-center justify-center">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100">
                        <span className="flex justify-center items-center h-6 w-6 text-brand-500">
                            <IoCheckmarkCircleOutline style={{ fontSize: "50px" }} />
                        </span>
                    </div>

                    <h4 className="ml-4 text-xl font-bold text-navy-700">{title}</h4>
                </div>

                <button onClick={handleAddTask}>
                    <IoAddOutline />
                </button>
            </div>

            {/* Task Items */}
            <div className="h-full w-full">
                {tasks.map((e) => (
                    <SingleTask key={e.id} task={e} />
                ))}
            </div>
        </div>
    );
};
