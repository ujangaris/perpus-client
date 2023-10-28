import React, { useState } from "react";

import Input from "../../../components/atoms/Input";

export const EditPublisherModal = ({
  isOpen,
  onClose,
  editPublisherData,
  handleEditChange,
  handleEditSave,
}) => {
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
              Update Publisher
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={onClose}
            ></button>
          </div>
          <form>
            <div className="modal-body">
              <Input
                label="Name"
                type="text"
                name="name"
                onChange={handleEditChange}
                value={editPublisherData.name}
              />

              <Input
                label="Email"
                type="email"
                name="email"
                onChange={handleEditChange}
                value={editPublisherData.email}
              />

              <Input
                label="Phone number"
                type="text"
                name="phone_number"
                onChange={handleEditChange}
                value={editPublisherData.phone_number}
              />
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
                Update Publisher
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
