import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCategoryAction } from "../../../redux/slices/categories/categoriesSlices";
import Input from "../../../components/atoms/Input";
import { LoadingComponent } from "../../../components/atoms/Alert/LoadingComponent";
import { addAuthorAction } from "../../../redux/slices/authors/authorsSlices";

export const CreateAuthorModal = ({ isOpen, onClose }) => {
  // siapkan dispatch
  const dispatch = useDispatch();
  //   state from data author
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    gender: "",
    phone_number: "",
  });
  // handleChange
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  // akses fungsi redux
  const { error, loading } = useSelector((state) => state.authors);
  //   ! form add author
  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(addAuthorAction(formData));
  };

  return (
    <div
      className={`modal fade ${isOpen ? "show" : ""}`}
      style={{
        display: isOpen ? "block" : "none",
        marginTop: "40px",
      }}
      id="exampleModal"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">
              Add Author
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={onClose}
            ></button>
          </div>
          <form onSubmit={handleSubmit} method="post">
            <div className="modal-body">
              <Input
                label="Name"
                type="text"
                name="name"
                onChange={handleChange}
                value={formData.name}
              />
              {error && <p className="text-danger">{error?.message?.name}</p>}
              <Input
                label="Email"
                type="email"
                name="email"
                onChange={handleChange}
                value={formData.email}
              />
              {error && <p className="text-danger">{error?.message?.email}</p>}
              <Input
                label="Phone Number"
                type="text"
                name="phone_number"
                onChange={handleChange}
                value={formData.phone_number}
              />
              {error && <p className="text-danger">{error?.message?.email}</p>}
              <label htmlFor="gender">Select Gender:</label>
              <select
                id="gender"
                name="gender"
                onChange={handleChange}
                value={formData.gender}
                className="form-select"
              >
                <option value="">-- Select --</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
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
                <button type="submit" className="btn btn-primary">
                  Add Author
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
