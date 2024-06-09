import { useState, useEffect } from "react";
import TodoList from "./TodoList.js";

function App() {
  const [state, setState] = useState("none");
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    setState("fetching-get");
    const fetchData = async () => {
      const host = process.env.REACT_APP_HOST || "";
      const res = await fetch(`${host}/api/`);
      const json = await res.json();
      setTodos(json);
      setState("none");
    };

    fetchData();
  }, []);

  return (
    <TodoList
      todos={todos}
      setTodos={setTodos}
      state={state}
      setState={setState}
    />
  );
}

export default App;
