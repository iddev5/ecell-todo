import { useState, useEffect } from "react";
import Todo from "./Todo.js";

function App() {
  const [todos, setTodos] = useState([]);
  const [addTodo, setAddTodo] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/");
      const json = await res.json();
      setTodos(json);
    }
    
    fetchData();
  }, [])

  
  return <div>
    {!addTodo &&
      <button onClick={() => setAddTodo(true)}>New</button> 
    }
    <div>
      {todos.map((todo) => <Todo key={todo._id} data={todo} />)}
      {addTodo && <form>
        <input type="text" name="title" id="title" />
        <label for="title">Title</label>
      
        <textarea name="desc" id="desc" />
        <label for="desc">Description</label>

        <input type="submit" value="Save" />
        <button onClick={() => setAddTodo(false)}>Cancel</button>
      </form>}
    </div>
  </div>
}

export default App;
