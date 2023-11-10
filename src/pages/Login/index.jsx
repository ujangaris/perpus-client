import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginAction } from "../../redux/slices/users/usersSlices";

import { LoadingComponent } from "../../components/atoms/Alert/LoadingComponent";
import { SuccessMessage } from "../../components/atoms/Alert/SuccessMessage";
import { ErrorMessage } from "../../components/atoms/Alert/ErrorMessage";

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
  console.log(isLoginUser);
  // const token = userAuth?.userInfo?.data?.role === "Super Admin";
  useEffect(() => {
    // if (userAuth?.userInfo?.data?.access_token) {
    //   navigate("/dashboard-admin");
    //   console.log("token : " + userAuth?.userInfo?.data?.access_token);
    // }
    if (isLoginAdmin) {
      navigate("/dashboard-admin");
    } else if (isLoginUser) {
      navigate("/profile");
    }
  }, [
    navigate,
    userAuth?.userInfo?.data?.access_token,
    isLoginAdmin,
    isLoginUser,
  ]);
  // console.log("ini dari login: " + isLoginAdmin);
  // console.log("ini dari login: " + isLoginUser);
  return (
    <div className="bg-gradient-primary">
      <div className="container">
        {/* <!-- Outer Row --> */}
        <div className="row justify-content-center">
          <div className="col-xl-10 col-lg-12 col-md-9">
            <div className="card o-hidden border-0 shadow-lg my-5">
              <div className="card-body p-0">
                {/* <!-- Nested Row within Card Body --> */}
                <div className="row">
                  <div className="col-lg-6 d-none d-lg-block ">
                    <img
                      src="https://images.unsplash.com/photo-1529539795054-3c162aab037a?auto=format&fit=crop&q=60&w=468&h=538&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bG9naW58ZW58MHx8MHx8fDA%3D"
                      alt=""
                    />
                  </div>
                  <div className="col-lg-6">
                    <div className="p-5">
                      <div className="text-center">
                        <h1 className="h4 text-gray-900 mb-4">Welcome Back!</h1>
                      </div>
                      {/* display success */}
                      {success && (
                        <SuccessMessage message={userAuth.userInfo.message} />
                      )}
                      {/* display error */}
                      {error && <ErrorMessage message={error.message} />}
                      <form className="user" onSubmit={handleSubmit}>
                        <div className="form-group">
                          <input
                            type="text"
                            className="form-control form-control-user"
                            id="username"
                            aria-describedby="nameHelp"
                            placeholder="Enter username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="form-group">
                          <input
                            type="password"
                            className="form-control form-control-user"
                            id="exampleInputPassword"
                            placeholder="Password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                          />
                        </div>
                        {loading ? (
                          <LoadingComponent />
                        ) : (
                          <button
                            className="btn btn-primary btn-user btn-block"
                            type="submit"
                          >
                            Login
                          </button>
                        )}
                        <hr />
                        <a
                          href="#"
                          className="btn btn-google btn-user btn-block"
                        >
                          <i className="fab fa-google fa-fw"></i> Login with
                          Google
                        </a>
                        <a
                          href="#"
                          className="btn btn-facebook btn-user btn-block"
                        >
                          <i className="fab fa-facebook-f fa-fw"></i> Login with
                          Facebook
                        </a>
                      </form>
                      <hr />
                      <div className="text-center">
                        <a className="small" href="/forgot-password">
                          Forgot Password?
                        </a>
                      </div>
                      <div className="text-center">
                        <Link
                          to="/register"
                          lassName="small"
                          href="register.html"
                        >
                          Create an Account!
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
