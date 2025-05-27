import { useState, useRef, useEffect } from "react";
import Form from "./Form.js";
import { useDispatch } from "react-redux";
import { Trash2, Circle, CircleCheckBig } from "lucide-react";
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
            <button
              className="col-1 p-0 btn"
              onClick={markCompletedCb}
              style={{ border: "none" }}
              checked
            >
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
              {complete && !onComplete && <CircleCheckBig />}
              {!complete && !onComplete && <Circle />}
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
              style={{ border: "none" }}
            >
              <Trash2 />
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
