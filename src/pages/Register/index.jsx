import React, { useEffect, useState } from "react";
import { Input, Gap, Button } from "./../../components/atoms";
import BgRegister from "../../assets/images/imageRegister.png";
import { registerAction } from "../../redux/slices/users/usersSlices";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SuccessMessage } from "../../components/atoms/Alert/SuccessMessage";

const Register = () => {
  // ! Navigation
  const navigate = useNavigate();
  // ! dispatch
  const dispatch = useDispatch();
  // hook from data
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
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
      registerAction({
        name: formData.name,
        username: formData.username,
        email: formData?.email,
        password: formData.password,
      })
    );

    // reset form data
    // setFormData({
    //   name: "",
    //   username: "",
    //   email: "",
    //   password: "",
    // });
  };
  // store data
  const { user, success, error } = useSelector((state) => state?.users);
  // !redirect
  useEffect(() => {
    if (user?.status === "CREATED") {
      navigate("/login");
    }
  }, [user, navigate]);
  return (
    <>
      <section className="subscriptions">
        <div className="container">
          {/* Divide the page into two: left for the image, right for the form */}
          <div className="row " style={{ height: "450px" }}>
            <div className="col-md-8  mb-4 mb-md-0">
              <div className="row ">
                <div className="col-md-12">
                  <h1 className="text-center mt-5">Welcome to PerPustakaan</h1>
                  <p className="text-center mb-4">
                    Create a new account to access our services.
                  </p>
                  {/* Display error*/}
                  {/* {error && <ErrorMessage message={error?.message} />} */}
                  {/* Display success*/}
                  {success && <SuccessMessage message={user?.message} />}
                  {/* Add handleLogin */}
                  <form onSubmit={handleSubmit}>
                    <div className="row px-5">
                      <div className="col-md-6">
                        <label htmlFor="name">Name</label>
                        <Input
                          type="text"
                          placeholder="Enter Name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                        />
                        {/* error validation */}
                        {error && (
                          <p className="text-danger">
                            {error?.message?.name?.[0]}
                          </p>
                        )}
                        <Gap height={18} />
                        <label htmlFor="email">Email</label>
                        <Input
                          type="email"
                          placeholder="Enter Email Address"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                        />
                        {/* error validation */}
                        {error && (
                          <p className="text-danger">
                            {error?.message?.email?.[0]}
                          </p>
                        )}
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="username">Username</label>
                        <Input
                          type="text"
                          placeholder="Enter Username"
                          name="username"
                          value={formData.username}
                          onChange={handleChange}
                        />
                        {/* error validation */}
                        {error && (
                          <p className="text-danger">
                            {error?.message?.username?.[0]}
                          </p>
                        )}
                        <Gap height={18} />
                        <label htmlFor="password">Password</label>
                        <Input
                          type="password"
                          placeholder="Enter Password"
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                        />
                        {/* error validation */}
                        {error && (
                          <p className="text-danger">
                            {error?.message?.password?.[0]}
                          </p>
                        )}
                      </div>
                      <Gap height={18} />
                      <Button
                        //   label={isLoading ? "loading" : "Login"}
                        type="submit"
                        variant="second"
                        fullWidth
                        label="Register"
                        style={{ border: "1px solid #b4d51e" }}
                      />
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="col-md-4 mt-5 mb-5">
              <Gap height={100} />
              <img src={BgRegister} alt="Login" className="img-fluid" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Register;
