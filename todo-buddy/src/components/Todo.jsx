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
    <div className="bg-slate-800 rounded-2xl px-3 py-4 min-w-[23rem] md:p-6 shadow-xl transition">
      <h1 className="text-center text-2xl mb-6 font-extrabold text-slate-100">
        TodoBuddy
      </h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className="flex flex-col md:flex-row justify-between bg-white items-center gap-3 p-2 rounded-xl md:rounded-full"
      >
        <input
          ref={inputRef}
          className="w-full px-2 py-3  rounded-full text-slate-800 placeholder:text-slate-400 outline-hidden outline-2 focus:outline-blue-600"
          placeholder="Complete homework..."
          type="text"
        />
        <button
          onClick={addTodo}
          className="bg-amber-500 w-full md:w-fit flex items-center justify-center gap-2 px-6 py-3 rounded md:rounded-full cursor-pointer font-bold  transition hover:opacity-95 active:scale-95"
        >
          Add <img src={addIcon} />
        </button>
      </form>
      <div className="relative my-4">
        <div className="items-container flex flex-col overflow-y-auto py-4 max-h-[15em] gap-2 my-4 scrollbar-thin scrollbar-thumb-slate-500 scrollbar-track-slate-700">
          <div className="fade-top"></div>

          {todoList.map((item, index) => {
            return (
              <TodoItems
                key={item.id}
                text={item.text}
                id={item.id}
                isComplete={item.isComplete}
                deleteTodo={deleteTodo}
                toggleTodo={toggleTodo}
              />
            );
          })}
        </div>
        <div className="fade-bot"></div>
      </div>
    </div>
  );
};

export default Todo;
