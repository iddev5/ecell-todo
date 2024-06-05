import { useState, useEffect } from "react";
import Todo from "./Todo.js";
import Form from "./Form.js";

function TodoList({ todos, setTodos, state, setState }) {
  const [addTodo, setAddTodo] = useState(false);
  const [emptyTitleError, setEmptyTitleError] = useState(false);

  async function createTodo(event) {
    event.preventDefault();

    const new_todo = {
      title: event.target.title.value,
      desc: event.target.desc.value,
    };

    if (new_todo.title === undefined || new_todo.title === "") {
      setEmptyTitleError(true);
      return;
    }

    const returned_todo = await fetch("/api/", {
      method: "POST",
      body: JSON.stringify(new_todo),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const content = await returned_todo.json();
    setTodos([...todos, content]);
    setAddTodo(false);
  }

  return (
    <div className="container">
      <div className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Todo List
          </a>
          {!addTodo && (
            <button
              className="btn btn-primary"
              onClick={() => {
                setAddTodo(true);
                setEmptyTitleError(false);
              }}
            >
              New
            </button>
          )}
        </div>
      </div>
      {state === "fetching-get" && <p>Loading data</p>}
      <div className="list-group">
        {todos.map((todo) => (
          <Todo key={todo._id} data={todo} todos={todos} setTodos={setTodos} />
        ))}
        {addTodo && (
          <Form
            onSubmit={createTodo}
            onCancel={() => setAddTodo(false)}
            emptyTitle={emptyTitleError}
            defaultTitle=""
            defaultDesc=""
          />
        )}
      </div>
    </div>
  );
}

export default TodoList;
