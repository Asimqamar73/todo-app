import React, { useEffect, useState } from "react";
import "./App.css";
// import AllTodos from "./AllTodos";

function TodoInput({ addTodo, todoList, editItem }) {
  const [inputText, setInputText] = useState("");
  useEffect(() => {
    if (editItem) {
      setInputText(editItem);
    }
  }, [editItem]);

  return (
    <>
      <h1>Todo-App</h1>
      <div className="container">
        <div>
          <input
            value={inputText}
            className="todoinput"
            type="text"
            placeholder="Enter your Todo"
            onChange={(e) => setInputText(e.target.value)}
          />

          <button
            onClick={() => {
              addTodo(inputText);
              setInputText("");
            }}
            className="btn"
          >
            {editItem ? "Modify" : "Add"}
          </button>
        </div>
        {/* <AllTodos todoList={todoList} /> */}
      </div>
    </>
  );
}

export default TodoInput;
