import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCategoryAction } from "../../../redux/slices/categories/categoriesSlices";
import Input from "../../../components/atoms/Input";
import { LoadingComponent } from "../../../components/atoms/Alert/LoadingComponent";

export const CreateCategoryModal = ({ isOpen, onClose }) => {
  // siapkan dispatch
  const dispatch = useDispatch();
  //   state from data category
  const [formData, setFormData] = useState({
    category: "",
  });
  // handleChange
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  // akses fungsi redux
  const { error, loading } = useSelector((state) => state.categories);
  //   ! form add category
  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(addCategoryAction(formData));
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
              Add Category
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
                label="Category Name"
                type="text"
                name="category"
                onChange={handleChange}
                value={formData.category}
              />
              {error && (
                <p className="text-danger">{error?.message?.category}</p>
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
                  Add Category
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
