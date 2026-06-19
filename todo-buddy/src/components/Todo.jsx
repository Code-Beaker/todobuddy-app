import React, { useEffect, useRef, useState } from "react";
import { addIcon, todoIcon } from "../assets";
import TodoItems from "./TodoItems";

const Todo = () => {
  const inputRef = useRef();
  const [todoList, setTodoList] = useState(
    localStorage.getItem("todos")
      ? JSON.parse(localStorage.getItem("todos"))
      : [],
  );

  const addTodo = () => {
    const inputText = inputRef.current.value.trim();

    if (inputText === "") {
      return null;
    }

    const newTodo = {
      id: Date.now(),
      text: inputText,
      isComplete: false,
    };

    setTodoList((prev) => [...prev, newTodo]);
    inputRef.current.value = "";
  };

  const deleteTodo = ({ id }) => {
    setTodoList((prvTodos) => {
      return prvTodos.filter((todo) => todo.id !== id);
    });
  };

  const toggleTodo = ({ id }) => {
    setTodoList((prevTodos) => {
      return prevTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, isComplete: !todo.isComplete };
        }

        return todo;
      });
    });
  };

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todoList));
  }, [todoList]);

  return (
    <div className="bg-slate-800 rounded-4xl p-6 shadow-xl">
      <h1 className="text-center text-2xl mb-6 font-extrabold text-slate-100">
        TodoBuddy
      </h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className="flex bg-white items-center gap-3 p-2 rounded-full"
      >
        <input
          ref={inputRef}
          className="px-6 py-3  rounded-full text-slate-800 placeholder:text-slate-400 outline-hidden outline-2 focus:outline-blue-600"
          placeholder="Complete homework..."
          type="text"
        />
        <button
          onClick={addTodo}
          className="bg-amber-500 flex gap-2 px-6 py-3 rounded-full cursor-pointer font-bold  transition hover:opacity-95 active:scale-95"
        >
          Add <img src={addIcon} />
        </button>
      </form>
      <div className="flex flex-col overflow-y-scroll max-h-[15em] gap-2 my-4">
        {todoList.map((item, index) => {
          return (
            <TodoItems
              key={index}
              text={item.text}
              id={item.id}
              isComplete={item.isComplete}
              deleteTodo={deleteTodo}
              toggleTodo={toggleTodo}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Todo;
