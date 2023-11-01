import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Input from "../../../components/atoms/Input";
import { LoadingComponent } from "../../../components/atoms/Alert/LoadingComponent";
import { addBookshelfAction } from "../../../redux/slices/bookshelves/bookshelvesSlices";

export const CreateBookshelfModal = ({ isOpen, onClose }) => {
  // siapkan dispatch
  const dispatch = useDispatch();
  //   state from data bookshelf
  const [formData, setFormData] = useState({
    bookshelf: "",
  });
  // handleChange
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  // akses fungsi redux
  const { error, loading } = useSelector((state) => state.bookshelves);
  //   ! form add books
  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(addBookshelfAction(formData));
  };

  return (
    <div
      className={`modal fade ${isOpen ? "show" : ""}`}
      style={{
        display: isOpen ? "block" : "none",
        marginTop: "200px",
      }}
      id="exampleModal"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header bg-success bg-opacity-75">
            <h1 className="modal-title text-white" id="exampleModalLabel">
              Add Bookshelf
            </h1>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
              onClick={onClose}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <form onSubmit={handleSubmit} method="post">
            <div className="modal-body">
              <Input
                label="Bookshelf Name"
                type="text"
                name="bookshelf"
                onChange={handleChange}
                value={formData.bookshelf}
              />
              {error && (
                <p className="text-danger">{error?.message?.bookshelf}</p>
              )}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={onClose}
              >
                Close
              </button>
              {loading ? (
                <LoadingComponent />
              ) : (
                <button type="submit" className="btn btn-success">
                  Add Bookshelf
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
