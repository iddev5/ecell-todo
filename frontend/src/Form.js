function Form({
  onSubmit,
  onCancel,
  formRef,
  emptyTitle,
  defaultTitle,
  defaultDesc,
}) {
  return (
    <>
      {(
        <form ref={formRef} onSubmit={onSubmit}>
          {/* TODO: JUST A BACK ARROW NEVER HARM ANYONE, RIGHT? */}
          <div className="mb-3">
            <input
              className="form-control focus-ring border-0 fs-3"
              style={{ boxShadow: 'none', outline: 'none' }}
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
          <div className="mb-3 pt-2 border-top">
            <textarea
              className="form-control focus-ring border-0"
              style={{ boxShadow: 'none', outline: 'none', height: '70vh' }}
              name="desc"
              id="desc"
              defaultValue={defaultDesc}
            />
          </div>
        </form>
      )}
    </>
  );
}

export default Form;
