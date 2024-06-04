import { useState, useEffect } from "react";
import Todo from "./Todo.js";

function App() {
  const [state, setState] = useState("none");
  const [todos, setTodos] = useState([]);
  const [addTodo, setAddTodo] = useState(false);

  useEffect(() => {
    setState("fetching-get")
    const fetchData = async () => {
      const res = await fetch("/api/");
      const json = await res.json();
      setTodos(json);
      setState("none")
    }
    
    fetchData();
  }, [])

  async function createTodo(event) {
    event.preventDefault();

    const new_todo = {
      title: event.target.title.value,
      desc: event.target.desc.value
    };

    const returned_todo = await fetch("/api/", {
      method: 'POST',
      body: JSON.stringify(new_todo),
      headers: {
        'Content-Type': "application/json"
      }
    })

    const content = await returned_todo.json();
    setTodos([...todos, content]);
    setAddTodo(false);
  }
  
  return <div>
    {!addTodo &&
      <button onClick={() => setAddTodo(true)}>New</button> 
    }
    {state === "fetching-get" && <p>Loading data</p>}
    <div>
      {todos.map((todo) => <Todo key={todo._id} data={todo} />)}
      {addTodo && <form onSubmit={createTodo}>
        <input type="text" name="title" id="title" />
        <label htmlFor="title">Title</label>
      
        <textarea name="desc" id="desc" />
        <label htmlFor="desc">Description</label>

        <button type="submit" value="submit">Done</button>
        <button onClick={() => setAddTodo(false)}>Cancel</button>
      </form>}
    </div>
  </div>
}

export default App;
