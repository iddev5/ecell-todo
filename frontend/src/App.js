import { useState, useEffect } from "react";
import * as bootstrap from 'bootstrap/dist/js/bootstrap.min.js';
import TodoList from "./TodoList.js";
import Form from "./Form.js";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, setTodo } from "./features/todoSlice.js";

function App() {
  const [addTodoState, setAddTodoState] = useState(false);
  const [emptyTitleError, setEmptyTitleError] = useState(false);
  const [onCreate, setOnCreate] = useState(false);
  const [state, setState] = useState("none");

  const todos = useSelector((state) => state.todos.todos);
  const dispatch = useDispatch();

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
      setOnCreate(false);
      return;
    }

    const returned_todo = await fetch(`${host}/api/`, {
      method: "POST",
      body: JSON.stringify(new_todo),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const content = await returned_todo.json();
    dispatch(addTodo(content));

    setAddTodoState(false);
    setOnCreate(false);
  }

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

  return <>
    <div className="container">
      <div className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Todo List
          </a>
          {!addTodoState && (
            <button
              className="btn btn-primary"
              onClick={() => {
                setAddTodoState(true);
                setEmptyTitleError(false);
              }}
            >
              New
            </button>
          )}
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
        {addTodoState && (
        <div className="list-group">
          <div className="list-group-item">
            <Form
              onSubmit={createTodo}
              onCancel={() => setAddTodoState(false)}
              emptyTitle={emptyTitleError}
              defaultTitle=""
              defaultDesc=""
              showSpinner={onCreate}
            />
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
              addTodoState={addTodoState}
            />
          </div>
        )
        }
      </div>
    </div>
  </>;
}

export default App;
