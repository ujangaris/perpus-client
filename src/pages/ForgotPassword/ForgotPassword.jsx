import React, { useState } from "react";
import { Link } from "react-router-dom";
import { forgotPasswordAction } from "../../redux/slices/users/usersSlices";
import { useDispatch, useSelector } from "react-redux";
import { LoadingComponent } from "../../components/atoms/Alert/LoadingComponent";
import { SuccessMessage } from "../../components/atoms/Alert/SuccessMessage";

export const ForgotPassword = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const { loading, success, user } = useSelector((state) => state.users);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(forgotPasswordAction({ email }));
  };
  console.log("isi dari user :" + user?.message);
  return (
    <body className="bg-gradient-primary">
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
                      src="https://images.unsplash.com/photo-1674049405160-9b800f5645f5?q=80&w=468&h=538&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      alt="reset-password"
                    />
                  </div>
                  <div className="col-lg-6">
                    <div className="p-5">
                      <div className="text-center">
                        <h1 className="h4 text-gray-900 mb-2">
                          Forgot Your Password?
                        </h1>
                        {success && <SuccessMessage message={user?.message} />}
                        <p className="mb-4">
                          We get it, stuff happens. Just enter your email
                          address below and we'll send you a link to reset your
                          password!
                        </p>
                      </div>
                      <form className="user" onSubmit={handleSubmit}>
                        <div className="form-group">
                          <input
                            type="email"
                            className="form-control form-control-user"
                            id="exampleInputEmail"
                            aria-describedby="emailHelp"
                            placeholder="Enter Email Address..."
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>
                        {loading ? (
                          <LoadingComponent />
                        ) : (
                          <button
                            type="submit"
                            className="btn btn-primary btn-user btn-block"
                          >
                            Reset Password
                          </button>
                        )}
                      </form>
                      <hr />
                      <div className="text-center">
                        <Link className="small" href="/register">
                          Create an Account!
                        </Link>
                      </div>
                      <div className="text-center">
                        <Link className="small" href="/login">
                          Already have an account? Login!
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
    </body>
  );
};
