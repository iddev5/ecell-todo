import { useState, useEffect } from "react";
import * as bootstrap from 'bootstrap/dist/js/bootstrap.min.js';
import TodoList from "./TodoList.js";
import Form from "./Form.js";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, setTodo, changeSortOrder } from "./features/todoSlice.js";

function App() {
  const [state, setState] = useState("none");
  const [newEmptyTask, setNewEmptyTask] = useState(false);

  const todos = useSelector((state) => state.todos.todos);
  const dispatch = useDispatch();

  const host = process.env.REACT_APP_HOST || "";

  useEffect(() => {
    setState("fetching-get");
    const fetchData = async () => {
      const host = process.env.REACT_APP_HOST || "";
      const res = await fetch(`${host}/api/`);
      const json = await res.json();

      dispatch(setTodo(json));
      setState("none");
    };

    fetchData();
  }, []);

  const triggerTabList = document.querySelectorAll("#menu a");
  triggerTabList.forEach(triggerEl => {
    const tabTrigger = new bootstrap.Tab(triggerEl);

    triggerEl.addEventListener("click", event => {
      event.preventDefault();
      tabTrigger.show();
    })
  })

  const createBlankTodo = async (event) => {
    event.preventDefault();

    setNewEmptyTask(true);

    const title = event.target.title.value;
    if (title === undefined || title === "")
      return;

    const new_todo = {
      title: title,
      desc: "",
    };

    const returned_todo = await fetch(`${host}/api/`, {
      method: "POST",
      body: JSON.stringify(new_todo),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const content = await returned_todo.json();
    dispatch(addTodo(content));

    event.target.title.value = "";

    setNewEmptyTask(false);
  }

  return <>
    <div className="container">
      <div className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Todo List
          </a>
        </div>
      </div>

      <div className="container">
        <div className="row row-cols-auto">
          <p className="col">Sort by</p>
          <div className="col">
            <select onChange={(event) => dispatch(changeSortOrder(event.target.value))} className="form-select form-select-sm">
              <option value="new" selected>Newest first</option>
              <option value="old">Oldest first</option>
            </select>
          </div>
        </div>
      </div>

      <ul id="menu" className="nav nav-tabs">
        <li className="nav-item">
          <a className="nav-link active" data-bs-target="#all">All</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" data-bs-target="#done">Done</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" data-bs-target="#inprog">In-progress</a>
        </li>
      </ul>
      <div class="tab-content">
        {newEmptyTask && (
        <div className="list-group">
          <div className="list-group-item">
            {/* TODO: its copied from Todo.js, deduplicate it somehow */}
            <div className="d-flex justify-content-center">
              <div className="text-center">
                <div
                  className="spinner-border text-primary mt-2"
                  style={{ width: "2rem", height: "2rem" }}
                  role="status"
                ></div>
                <p>Please wait</p>
              </div>
            </div>
          </div>
        </div>
        )}       
        {[
          ['all', (todo) => true],
          ['done', (todo) => todo.completed === true], 
          ['inprog', (todo) => todo.completed === false],
        ].map((tab, index) =>
          <div id={tab[0]} className={`tab-pane ${index === 0 ? 'active' : ''}`} key={tab[0]}>
            <TodoList
              todos={todos.filter(tab[1])}
              state={state}
            />
          </div>
        )
        }
      </div>

      <nav className="navbar fixed-bottom navbar-light bg-light container">
        <div className="container-fluid">
          <form onSubmit={createBlankTodo} className="w-100">
            <div className="input-group">
              <input
                className="form-control"
                type="text"
                name="title"
                placeholder="Add title..."
              />
              <button
                className="btn btn-primary"
                type="submit"
              >
                Done
              </button>
            </div>
          </form>
        </div>
      </nav>
    </div>
  </>;
}

export default App;
