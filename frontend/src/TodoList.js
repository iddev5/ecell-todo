import Todo from "./Todo.js";
import { FileText } from "lucide-react";

function TodoList({ todos, state }) {
  return (
    <div className="mb-5">
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
        {todos.length === 0 && state !== "fetching-get" && (
          <div className="text-center" style={{ "margin-top": "10em" }}>
            <FileText size={64} />
            <h2>No todos found...</h2>
            <p>Create a task to get started!</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default TodoList;
