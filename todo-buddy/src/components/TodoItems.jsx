import React from "react";
import { addIcon, deleteIcon, notTickIcon, tickIcon } from "../assets";

const TodoItems = ({ text, id, isComplete, deleteTodo, toggleTodo }) => {
  return (
    <div className="flex w-full items-center gap-2">
      <div
        className={`flex w-full items-center justify-between p-3 bg-slate-700 rounded-lg md:rounded-full cursor-pointer transition ${isComplete ? "opacity-50" : "opacity-100"}`}
      >
        <button
          onClick={() => {
            toggleTodo({ id });
          }}
          className="cursor-pointer transition hover:opacity-95 hover:scale-105 active:scale-95"
        >
          <img src={isComplete ? tickIcon : notTickIcon} />
        </button>
        <p
          className={`font-medium text-slate-300 ${isComplete ? "line-through" : ""}`}
        >
          {text}
        </p>
        <button
          onClick={() => {
            deleteTodo({ id });
          }}
          className="cursor-pointer bg-slate-100 p-2 rounded-full transition hover:opacity-95 hover:scale-105 active:scale-95"
        >
          <img className="w-6" src={deleteIcon} />
        </button>
      </div>
    </div>
  );
};

export default TodoItems;
