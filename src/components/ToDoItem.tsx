import { ToDoType } from "../type";
import CloseIcon from "./CloseIcon";

type Props = {
  toggleTask: (id: number) => void;
  deleteTodo: (id: number) => void;
} & ToDoType;

const ToDoItem = ({ text, isComplete, id, toggleTask, deleteTodo }: Props) => {
  return (
    <div className="flex justify-between items-center gap-2">
      <label
        onClick={() => toggleTask(id)}
        className={`hover:bg-slate-100 flex-1 p-2 rounded-md cursor-pointer select-none ${
          isComplete ? "line-through text-slate-600" : undefined
        }`}
      >
        {text}
      </label>
      <CloseIcon onClick={() => deleteTodo(id)} />
    </div>
  );
};

export default ToDoItem;
