function Form({ onSubmit, onCancel, emptyTitle, defaultTitle, defaultDesc }) {
  return (
    <form className="list-group-item" onSubmit={onSubmit}>
      <div className="mb-3">
        <label className="form-label" htmlFor="title">
          Title
        </label>
        <input
          className="form-control"
          type="text"
          name="title"
          id="title"
          defaultValue={defaultTitle}
        />
      </div>
      {emptyTitle && (
        <div>
          <p>Blank title is not allowed</p>
        </div>
      )}
      <div className="mb-3">
        <label className="form-label" htmlFor="desc">
          Description
        </label>
        <textarea
          className="form-control"
          name="desc"
          id="desc"
          defaultValue={defaultDesc}
        />
      </div>
      <div className="">
        <button className="btn btn-primary mx-2" type="submit" value="submit">
          Done
        </button>
        <button className="btn btn-secondary" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
}

export default Form;
