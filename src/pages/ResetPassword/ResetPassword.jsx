import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { resetPasswordAction } from "../../redux/slices/users/usersSlices";
import { LoadingComponent } from "../../components/atoms/Alert/LoadingComponent";

export const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const { loading, user, error } = useSelector((state) => state.users);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password === formData.confirmPassword) {
      dispatch(
        resetPasswordAction({ password: formData.password, resetToken: token })
      );
      // reset form
      setFormData({
        password: "",
        confirmPassword: "",
      });
      setPasswordError(""); // Reset the password error
      navigate('/login')
    } else {
      // Handle password mismatch error
      // console.log("Password and Confirm Password do not match");
      setPasswordError("Password and Confirm Password do not match");
    }
  };
  console.log("isi dari user ini:" + user);
  console.log("isi dari error ini:" + error?.message?.password[0]);
  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-md-6">
          <div className="card shadow mb-4">
            <div className="card-header py-3">
              <h6 className="m-0 font-weight-bold text-primary">
                Choose a new password
              </h6>
            </div>
            <div className="card-body">
              <p>
                <strong>
                  A strong password is a combination of letters and punctuation
                  marks. It must be at least 8 characters long!
                </strong>
              </p>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="password">New Password</label>
                  <div className="input-group">
                    <input
                      type={showPassword ? "text" : "password"}
                      // type="password"
                      className="form-control mx-2"
                      name="password"
                      placeholder="Enter new password"
                      value={formData.password}
                      onChange={handleChange}
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
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <div className="input-group">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      className="form-control mx-2"
                      name="confirmPassword"
                      placeholder="Confirm new password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                    />
                    <button
                      className="btn btn-outline-secondary"
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      {showConfirmPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                </div>
                {passwordError && (
                  <p style={{ color: "red" }}>{passwordError}</p>
                )}
                {loading ? (
                  <LoadingComponent />
                ) : (
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
