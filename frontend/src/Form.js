
function Form({onSubmit, onCancel, defaultTitle, defaultDesc}) {
	return <form onSubmit={onSubmit}>
    <input type="text" name="title" id="title" defaultValue={defaultTitle} />
    <label htmlFor="title">Title</label>

    <textarea name="desc" id="desc" defaultValue={defaultDesc} />
    <label htmlFor="desc">Description</label>

    <button type="submit" value="submit">Done</button>
    <button onClick={onCancel}>Cancel</button>
  </form>
}

export default Form;