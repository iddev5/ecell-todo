import { useState, useEffect } from "react";
import Todo from "./Todo.js";
import Form from "./Form.js";

function TodoList({todos, setTodos, state, setState}) {
  const [addTodo, setAddTodo] = useState(false);

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
      {todos.map((todo) => <Todo key={todo._id} data={todo} todos={todos} setTodos={setTodos} />)}
      {addTodo && <Form onSubmit={createTodo} onCancel={() => setAddTodo(false)} defaultTitle="" defaultDesc="" /> }
    </div>
  </div>
}

export default TodoList;