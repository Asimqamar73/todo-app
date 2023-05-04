import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./App.css";
import TodoInput from "./TodoInput";
import AllTodos from "./AllTodos";

function App() {
  const [todoList, setTodoList] = useState(() => {
    const localState = JSON.parse(localStorage.getItem("data"));
    if (localState == null) return [];

    return localState;
  });
  const [isEditItem, setIsEditItem] = useState(false);
  const [editItem, setEditItem] = useState(null);

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(todoList));
  }, [todoList]);

  // useEffect(() => {
  //   const data = JSON.parse(localStorage.getItem("data"));
  //   console.log("new data", data);
  //   if (data) {
  //     setTodoList(data);
  //   }
  // }, []);

  const addTodo = (inputText) => {
    if (inputText !== "" && isEditItem === false) {
      const _id = uuidv4();
      setTodoList([...todoList, { content: inputText, _id }]);
    } else if (inputText !== "" && isEditItem) {
      setTodoList(
        todoList.map((el) => {
          if (el.id === editItem.id) {
            return { ...el, content: inputText };
          }
        })
      );
    }
  };

  const deleteTodo = (key) => {
    const newTodoList = [...todoList];
    newTodoList.splice(key, 1);
    setTodoList([...newTodoList]);
  };

  const handleEditClick = (id) => {
    console.log(id);
    setIsEditItem(true);
    setEditItem(id);
  };

  return (
    <div className="App">
      <TodoInput addTodo={addTodo} todoList={todoList} editItem={editItem} />
      <h2>Todo-Listing</h2>
      <hr />

      {todoList.length > 0 ? (
        todoList.map((listItem, i) => {
          return (
            <AllTodos
              key={i}
              item={listItem}
              index={listItem._id}
              deleteTodo={deleteTodo}
              handleEditClick={handleEditClick}
            />
          );
        })
      ) : (
        <h2>No Todos</h2>
      )}
    </div>
  );
}

export default App;
