import {useState} from "react";

function Todo({data, todos, setTodos}) {
	const [change, setChange] = useState(false)

	async function deleteTodo() {
		await fetch("http://127.0.0.1:8080/api/" + data._id + "/", {
			method: 'DELETE'
		});

		const newTodos = todos.filter(it => it._id !== data._id);
		setTodos(newTodos);
	}

	return <div>
			{change &&
				<div>

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
