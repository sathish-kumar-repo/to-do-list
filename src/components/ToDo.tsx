import { useEffect, useRef, useState } from "react";
import ToDoItem from "./ToDoItem";
import { ToDoType } from "../type";

const ToDo = () => {
  const initialValue: ToDoType[] = localStorage.getItem("todos")
    ? JSON.parse(localStorage.getItem("todos")!)
    : [];
  const [todoList, setTodoList] = useState(initialValue);
  const inputRef = useRef<HTMLInputElement>();

  // Update LocalStorage
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todoList));
  }, [todoList]);

  // Add New Task
  const addTask = () => {
    const inputText = inputRef.current!.value.trim();

    if (inputText === "") return null;

    const newTodo = { id: Date.now(), text: inputText, isComplete: false };
    setTodoList((prev) => [...prev, newTodo]);
    inputRef.current!.value = "";
  };

  // Update Task Status
  const toggleTask = (id: number) => {
    setTodoList((prev) => {
      return prev.map((todo) => {
        if (id === todo.id) {
          return { ...todo, isComplete: !todo.isComplete };
        }
        return todo;
      });
    });
  };

  // Delete Task
  const deleteTodo = (id: number) => {
    setTodoList((prev) => {
      return prev.filter((todo) => todo.id !== id);
    });
  };
  return (
    <>
      <div className="w-[30rem]">
        <h1 className="text-lg my-2 font-medium text-amber-500">To-Do List</h1>

        <div className="flex gap-2">
          <div className="flex-1">
            <input
              type="text"
              className="py-3 px-4 w-full text-sm border focus:outline-none focus:border-amber-500"
              placeholder="Add yout task"
            />
          </div>

          <button
            onClick={addTask}
            className="bg-blue-600 py-3 px-4 text-white hover:bg-blue-700 text-sm font-medium rounded-sm border-none "
          >
            Add Task sathish dfgf
          </button>
        </div>
        <p className="my-3 text-sm text-zinc-400 px-1">Fill task details</p>
      </div>
      <div className="w-[30rem] bg-white shadow py-6 px-4">
        <fieldset className="space-y-3">
          <legend className="text-pink-600 font-medium">List of tasks</legend>
          {/* List Items */}
          {todoList.length === 0 ? (
            <p className="text-gray-500 font-medium">No Tasks found</p>
          ) : (
            todoList.map((todo) => (
              <ToDoItem
                key={todo.id}
                text={todo.text}
                isComplete={todo.isComplete}
                id={todo.id}
                toggleTask={toggleTask}
                deleteTodo={deleteTodo}
              />
            ))
          )}
          {/* <ToDoItem text="Ryt" /> */}
        </fieldset>
      </div>
    </>
  );
};

export default ToDo;
