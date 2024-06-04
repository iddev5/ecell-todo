import {useState} from "react";
import Form from "./Form.js";

function Todo({data, todos, setTodos}) {
	const [change, setChange] = useState(false)

	async function deleteTodo() {
		await fetch("http://127.0.0.1:8080/api/" + data._id + "/", {
			method: 'DELETE'
		});

		const newTodos = todos.filter(it => it._id !== data._id);
		setTodos(newTodos);
	}

	async function updateTodo(event) {
		event.preventDefault();

		// TODO: OR-ing is not needed if below TODO is fixed
		const form_data = {
			title: event.target.title.value || data.title,
			desc: event.target.desc.value || data.desc,
		};

		const res = await fetch(`/api/${data._id}/`, {
			method: 'PUT',
			body: JSON.stringify(form_data),
			headers: {
				'Content-Type': "application/json"
			}
		});

		const idx = todos.findIndex(it => data._id === it._id);
		const new_todos = todos.slice();
		// TODO: fix PUT returning old data
		new_todos[idx].title = form_data.title;
		new_todos[idx].desc = form_data.desc;

		setTodos(new_todos);
		setChange(false);
	}

	return <div>
			{change &&
				<div>
					<Form onSubmit={updateTodo} onCancel={() => setChange(false)} defaultTitle={data.title} defaultDesc={data.desc} />
				</div>}
			{!change &&
	      <div>
	        <button onClick={() => setChange(true)}><h1>{data.title}</h1></button>
	        <div><button onClick={() => setChange(true)}><p>{data.desc}</p></button></div>
					<button onClick={deleteTodo}>Delete</button>
	      </div>}
		</div>
}

export default Todo;
