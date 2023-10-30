import React from "react";
import { useDispatch } from "react-redux";
import { logoutAction } from "../../../redux/slices/users/usersSlices";
import { useNavigate } from "react-router-dom";

export const LogoutAdmin = () => {
  // ! dispatch
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // handleLogout
  const logoutHandler = (e) => {
    e.preventDefault();
    dispatch(logoutAction());
    navigate("/login");
    // reload;
    window.location.reload();
  };
  return (
    <>
      <div
        className="modal fade"
        id="logoutModal"
        //   tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Ready to Leave?
              </h5>
              <button
                className="close"
                type="button"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              Select "Logout" below if you are ready to end your current
              session.
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-secondary"
                type="button"
                data-dismiss="modal"
              >
                Cancel
              </button>
              <button className="btn btn-primary" onClick={logoutHandler}>
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
