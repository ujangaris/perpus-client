import React, { useEffect, useState } from "react";
import { Button, Input, Gap } from "./../../components/atoms";
import ImageLogin from "../../assets/images/imageLogin.png";
import { useDispatch, useSelector } from "react-redux";
import { loginAction } from "../../redux/slices/users/usersSlices";
import { LoadingComponent } from "../../components/atoms/Alert/LoadingComponent";
import { SuccessMessage } from "../../components/atoms/Alert/SuccessMessage";
import { useNavigate } from "react-router-dom";
import { ErrorMessage } from "../../components/atoms/Alert/ErrorMessage";
import "../../App.css";
export const Login = () => {
  // ! Navigation
  const navigate = useNavigate();
  // ! dispatch
  const dispatch = useDispatch();
  // hook from data
  const [formData, setFormData] = useState({
    username: "super_admin",
    password: "Super@adm1n",
  });
  // handle form change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  // handle from submit
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(formData);
    // ! dispatch action
    dispatch(
      loginAction({
        username: formData.username,
        password: formData.password,
      })
    );
    // reset form data
    setFormData({
      username: "",
      password: "",
    });
  };
  // store data
  const { userAuth, loading, success, error } = useSelector(
    (state) => state?.users
  );
  // !redirect
  // get the token user & admin
  const isLoginAdmin = userAuth?.userInfo?.data?.role === "Super Admin";

  const isLoginUser = userAuth?.userInfo?.data?.role === "User";
  // console.log(isLoginUser);
  useEffect(() => {
    if (isLoginAdmin) {
      navigate("/admin-dashboard");
    } else if (isLoginUser) {
      navigate("/user-profile");
    } else {
      navigate("/login");
    }
    // if (userAuth?.userInfo?.data?.token?.access_token) {
    //   navigate("/user-profile");
    // }
  }, [isLoginAdmin, isLoginUser, navigate]);
  return (
    <section className="subscriptions">
      <div className="container">
        {/* bagi 2 halaman login kiri untuk gambar kanan untuk form */}
        <div
          className="row text-center justify-content-center align-items-center"
          style={{ height: "450px" }}
        >
          <div className="col-md-6 order-md-2 mb-4 mb-md-0 ">
            <div className="row">
              <div className="col-md-8">
                <h1 className="text-center mb-4">Please Login</h1>
                {/* pasang handleLogin */}

                {/* display success */}
                {success && (
                  <SuccessMessage message={userAuth.userInfo.message} />
                )}
                {/* display error */}
                {error && <ErrorMessage message={error.message} />}
                <form onSubmit={handleSubmit}>
                  <Input
                    type="text"
                    placeholder="Enter Username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                  />
                  <Gap height={18} />
                  <Input
                    type="password"
                    placeholder="Enter Password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <Gap height={18} />
                  {loading ? (
                    <LoadingComponent />
                  ) : (
                    <Button
                      label="Login"
                      type="submit"
                      variant="second"
                      fullWidth
                    />
                  )}
                </form>
              </div>
            </div>
          </div>
          <div className="col-md-6 mt-5 mb-5">
            <img src={ImageLogin} alt="Login" className="img-fluid" />
          </div>
        </div>
      </div>
    </section>
  );
};
