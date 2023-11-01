import React from "react";

import Input from "../../../components/atoms/Input";

export const EditAuthorModal = ({
  isOpen,
  onClose,
  editAuthorData,
  handleEditChange,
  handleEditSave,
}) => {
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
              Update Author
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
          <form>
            <div className="modal-body">
              <Input
                label="Name"
                type="text"
                name="name"
                onChange={handleEditChange}
                value={editAuthorData.name}
              />

              <Input
                label="Email"
                type="email"
                name="email"
                onChange={handleEditChange}
                value={editAuthorData.email}
              />

              <Input
                label="Phone Number"
                type="text"
                name="phone_number"
                onChange={handleEditChange}
                value={editAuthorData.phone_number}
              />

              <label htmlFor="gender">Select Gender:</label>
              <select
                id="gender"
                name="gender"
                onChange={handleEditChange}
                value={editAuthorData.gender}
                className="form-control"
              >
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
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleEditSave}
              >
                Update Author
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
