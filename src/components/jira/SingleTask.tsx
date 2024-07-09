import { IoReorderTwoOutline } from "react-icons/io5";
import useTaskStore, { type Task } from "../../store/task.store";
interface Props {
    task: Task;
}

const SingleTask: React.FC<Props> = ({ task }) => {
    const setDragId = useTaskStore((state) => state.setDragByid);
    const removeDragId = useTaskStore((state) => state.removeDragId);
    return (
        <div
            className="mt-5 flex items-center justify-between p-2"
            draggable
            onDragStart={() => setDragId(task.id)}
            onDragEnd={() => removeDragId()}
        >
            <div className="flex items-center justify-center gap-2">
                <p className="text-base font-bold text-navy-700">{task.title}</p>
            </div>
            <span className=" h-6 w-6 text-navy-700 cursor-pointer">
                <IoReorderTwoOutline />
            </span>
        </div>
    );
};
export default SingleTask;
