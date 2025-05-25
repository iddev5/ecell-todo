import Todo from "./Todo.js";

function TodoList({ todos, state, addTodoState }) {
  return (
    <div>
      {state === "fetching-get" && (
        <div className="d-flex justify-content-center">
          <div className="text-center">
            <div
              className="spinner-border text-primary"
              style={{ width: "3rem", height: "3rem", "margin-top": "10em" }}
              role="status"
            ></div>
            <h2>Please wait</h2>
            <p className="fs-5">Todos are loading</p>
          </div>
        </div>
      )}
      <div className="list-group">
        {todos.map((todo) => (
          <Todo key={todo._id} data={todo} />
        ))}
        {todos.length === 0 && state !== "fetching-get" && !addTodoState && (
          <div className="text-center" style={{ "margin-top": "10em" }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="64"
              height="64"
              fill="currentColor"
              class="bi bi-file-earmark-text"
              viewBox="0 0 16 16"
            >
              <path d="M5.5 7a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1zM5 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5" />
              <path d="M9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.5zm0 1v2A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1z" />
            </svg>
            <h2>No todos found...</h2>
            <p>Click on the New button</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default TodoList;
