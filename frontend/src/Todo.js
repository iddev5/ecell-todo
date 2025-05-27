import { useState, useRef, useEffect } from "react";
import Form from "./Form.js";
import { useDispatch } from "react-redux";
import api from "./api.js";

function Todo({ data }) {
  const [complete, setComplete] = useState(data.completed);
  const [onComplete, setOnComplete] = useState(false);
  const [onUpdate, setOnUpdate] = useState(false);
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const editModal = useRef(null);
  const formRef = useRef(null);
  const dispatch = useDispatch();

  const host = process.env.REACT_APP_HOST || "";

  function deleteTodoCb() {
    dispatch(api.deleteTodo(data._id));
  }

  async function markCompletedCb() {
    setOnComplete(true);

    dispatch(api.markCompleted(data._id, !complete));

    setComplete(!complete);
    setOnComplete(false);
  }

  useEffect(() => {
    editModal.current.addEventListener("hidden.bs.modal", async () => {
      const form = formRef.current;
      const title = form.elements["title"];
      const desc = form.elements["desc"];
      if (form && (title.value !== data.title || desc.value !== data.desc)) {
        setOnUpdate(true);

        // TODO: OR-ing is not needed if below TODO is fixed
        const form_data = {
          title: title.value || data.title,
          desc: desc.value || data.desc,
        };

        dispatch(api.updateTodo(data._id, form_data));

        setOnUpdate(false);
      }
    });
  }, []);

  return (
    <div className="list-group-item">
      <div
        ref={editModal}
        class="modal fade"
        id={`editModal-${data._id}`}
        tabindex="-1"
        aria-labelledby={`editModalLabel-${data._id}`}
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered modal-lg modal-dialog-scrollable">
          <div class="modal-content">
            {/* TODO: will see */}
            {/* <div class="modal-header">
              <h1 class="modal-title fs-5" id={`editModalLabel-${data._id}`}>Edit task</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div> */}
            <div class="modal-body">
              <Form
                formRef={formRef}
                emptyTitle={false}
                defaultTitle={data.title}
                defaultDesc={data.desc}
              />
            </div>
            {/* TODO: will see */}
            {/* <div class="modal-footer">
            </div> */}
          </div>
        </div>
      </div>

      {onUpdate && (
        <div className="d-flex justify-content-center">
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
      {!onUpdate && (
        <div className="container">
          <div className="row">
            <button className="col-1 p-0 btn" onClick={markCompletedCb} checked>
              {onComplete && (
                <div className="d-flex justify-content-center">
                  <div className="text-center">
                    <div
                      className="spinner-border text-primary mt-2"
                      style={{ width: "1.5rem", height: "1.5rem" }}
                      role="status"
                    ></div>
                  </div>
                </div>
              )}
              {complete && !onComplete && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  className="bi bi-check-circle"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                  <path d="m10.97 4.97-.02.022-3.473 4.425-2.093-2.094a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05" />
                </svg>
              )}
              {!complete && !onComplete && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  className="bi bi-circle"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                </svg>
              )}
            </button>
            <button
              ref={titleRef}
              className="col fs-4 text-start border-0 bg-transparent text-truncate"
              style={
                complete
                  ? {
                      "text-decoration": "line-through",
                      "text-decoration-thickness": "2px",
                      "font-style": "italic",
                    }
                  : {}
              }
              data-bs-toggle="modal"
              data-bs-target={`#editModal-${data._id}`}
            >
              {data.title}
            </button>
            <button
              className="col-1 btn text-danger p-2 opacity-100"
              onClick={deleteTodoCb}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                className="bi bi-trash"
                viewBox="0 0 16 16"
              >
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
              </svg>
            </button>
          </div>
          <div className="row">
            <div className="col-1"></div>
            <button
              ref={descRef}
              className="col text-start border-0 bg-transparent text-truncate"
              style={
                complete
                  ? {
                      "text-decoration": "line-through",
                      "text-decoration-thickness": "2px",
                      "font-style": "italic",
                    }
                  : {}
              }
              data-bs-toggle="modal"
              data-bs-target={`#editModal-${data._id}`}
            >
              {data.desc}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Todo;
