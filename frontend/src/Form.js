function Form({
  onSubmit,
  onCancel,
  emptyTitle,
  defaultTitle,
  defaultDesc,
  showSpinner,
}) {
  return (
    <>
      {showSpinner && (
        <div className="d-flexjustify-content-center">
          <div className="text-center">
            <div
              className="spinner-border text-primary mt-2"
              style={{ width: "2rem", height: "2rem" }}
              role="status"
            ></div>
            <p>Please wait</p>
          </div>
        </div>
      )}
      {!showSpinner && (
        <form onSubmit={onSubmit}>
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
            <div className="text-danger">
              <p>*Blank title is not allowed</p>
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
            <button
              className="btn btn-primary mx-2"
              type="submit"
              value="submit"
            >
              Done
            </button>
            <button className="btn btn-secondary" onClick={onCancel}>
              Cancel
            </button>
          </div>
        </form>
      )}
    </>
  );
}

export default Form;
