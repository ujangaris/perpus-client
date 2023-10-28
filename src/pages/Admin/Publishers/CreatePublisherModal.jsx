import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Input from "../../../components/atoms/Input";
import { LoadingComponent } from "../../../components/atoms/Alert/LoadingComponent";
import { addPublisherAction } from "../../../redux/slices/publishers/publishersSlices";

export const CreatePublisherModal = ({ isOpen, onClose }) => {
  // siapkan dispatch
  const dispatch = useDispatch();
  //   state from data publisher
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone_number: "",
  });
  // handleChange
  const handleChange = (e) => {
    // Check if the input name is "phone_number" and add the prefix if not already present
    if (e.target.name === "phone_number" && !e.target.value.startsWith("+62")) {
      setFormData({ ...formData, [e.target.name]: "+62" + e.target.value });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };
  // akses fungsi redux
  const { error, loading, publisher } = useSelector(
    (state) => state.publishers
  );
  //   ! form add publisher
  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(addPublisherAction(formData));
  };
  console.log("ini isinya apa: " + error?.message?.email);
  return (
    <div
      className={`modal fade ${isOpen ? "show" : ""}`}
      style={{
        display: isOpen ? "block" : "none",
        marginTop: "50px",
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
              Add Publisher
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
              {error && (
                <p className="text-danger">{error?.message?.name?.[0]}</p>
              )}
              <Input
                label="Email"
                type="email"
                name="email"
                onChange={handleChange}
                value={formData.email}
              />
              {error && (
                <p className="text-danger">{error?.message?.email?.[0]}</p>
              )}
              <Input
                label="Phone number"
                type="text"
                name="phone_number"
                onChange={handleChange}
                value={formData.phone_number}
              />
              {error && (
                <p className="text-danger">
                  {error?.message?.phone_number?.[0]}
                </p>
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
                <button type="submit" className="btn btn-primary">
                  Add Publisher
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
