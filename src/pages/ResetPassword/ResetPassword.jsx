import React, { useState } from "react";

export const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [passwordVerification, setPasswordVerification] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordVerification, setShowPasswordVerification] =
    useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // send data to server
  };
  return (
    <div className="d-flex justify-content-center align-items-center m-auto">
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">
            Choose a new password
          </h6>
        </div>
        <div className="card-body">
          <p>
            <strong>
              A Strong password is a combinatiiin of letters and punctuation
              marks it must be at least 8 characters long!
            </strong>
          </p>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="password">New Password</label>
              <div className="input-group">
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control mx-2"
                  id="password"
                  placeholder="Enter new password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="password-verification">Verify Password</label>
              <div className="input-group">
                <input
                  type={showPasswordVerification ? "text" : "password"}
                  className="form-control mx-2"
                  id="password-verification"
                  placeholder="Verify new password"
                  value={passwordVerification}
                  onChange={(e) => setPasswordVerification(e.target.value)}
                />
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={() =>
                    setShowPasswordVerification(!showPasswordVerification)
                  }
                >
                  {showPasswordVerification ? "Hide" : "Show"}
                </button>
              </div>
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
