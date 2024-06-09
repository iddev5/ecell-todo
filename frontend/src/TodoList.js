import { useState, useEffect } from "react";
import Todo from "./Todo.js";
import Form from "./Form.js";

function TodoList({ todos, setTodos, state, setState }) {
  const [addTodo, setAddTodo] = useState(false);
  const [onCreate, setOnCreate] = useState(false);
  const [emptyTitleError, setEmptyTitleError] = useState(false);

  const host = process.env.REACT_APP_HOST || "";

  async function createTodo(event) {
    event.preventDefault();

    setOnCreate(true);

    const new_todo = {
      title: event.target.title.value,
      desc: event.target.desc.value,
    };

    if (new_todo.title === undefined || new_todo.title === "") {
      setEmptyTitleError(true);
      return;
    }

    console.log(host, `${host}/api/`);

    const returned_todo = await fetch(`${host}/api/`, {
      method: "POST",
      body: JSON.stringify(new_todo),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const content = await returned_todo.json();
    setTodos([...todos, content]);
    setAddTodo(false);
    setOnCreate(false);
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
      {state === "fetching-get" && (
        <div className="d-flex justify-content-center">
          <div className="text-center">
            <div
              className="spinner-border text-primary"
              style={{ width: "3rem", height: "3rem", "margin-top": "10em" }}
              role="status"
            ></div>
            <h2>Please wait</h2>
            <p className="fs-5">Todos is loading</p>
          </div>
        </div>
      )}
      <div className="list-group">
        {todos.map((todo) => (
          <Todo key={todo._id} data={todo} todos={todos} setTodos={setTodos} />
        ))}
        {addTodo && (
          <div className="list-group-item">
            <Form
              onSubmit={createTodo}
              onCancel={() => setAddTodo(false)}
              emptyTitle={emptyTitleError}
              defaultTitle=""
              defaultDesc=""
              showSpinner={onCreate}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default TodoList;
