import React from "react";

export const EditBookshelfModal = ({
  isOpen,
  onClose,
  editBookshelfData,
  handleEditChange,
  handleEditSave,
}) => {
  return (
    <div
      className={`modal ${isOpen ? "show" : ""}`}
      tabIndex="-1"
      role="dialog"
      style={{
        display: isOpen ? "block" : "none",
        marginTop: "150px",
      }}
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit Bookshelf</h5>
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
          <div className="modal-body">
            <form>
              <div className="form-group">
                <label htmlFor="editBookshelfName">Bookshelf Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="editBookshelfName"
                  name="bookshelf"
                  value={editBookshelfData.bookshelf}
                  onChange={handleEditChange}
                />
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleEditSave}
            >
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
