import React, { useEffect } from "react";
import { Button } from "../atoms";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutAction } from "../../redux/slices/users/usersSlices";
import "./Navbar.css";
export const Navbar = () => {
  // ! get the login user from store
  const { userAuth } = useSelector((state) => state?.users);
  // get the access_token
  const isLogin = userAuth?.userInfo?.data?.token?.access_token;
  // console.log(isLogin);
  const navigate = useNavigate();
  // ! dispatch
  const dispatch = useDispatch();
  // handleLogout
  const logoutHandler = () => {
    dispatch(logoutAction());
    // reload
    window.location.reload();
  };
  // daftarin path yang di ijinkan di akses tanpa login
  useEffect(() => {
    // console.log(userAuth);
    if (!isLogin) {
      navigate("/login");
    }
    if (!isLogin) {
      navigate("/register");
    }
    
  }, [isLogin, navigate]);
  return (
    <nav className="navbar navbar-expand-lg bg-light shadow-sm py-4 fixed-top">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Per<span>Pustakaan</span>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>{" "}
        <div className="collapse navbar-collapse" id="navbarNav">
          <div className="input-group mx-auto mt-lg-0">
            <input
              type="text"
              className="form-control"
              placeholder="What book are you looking for?"
            />
            <button
              className="btn-search d-flex align-items-center justify-content-center"
              type="button"
              id="button-addon2"
            >
              <i className="bx bx-search bx-sm"></i>
            </button>
          </div>
          <ul className="navbar-nav ms-auto mt-4 mt-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="#">
                <i className="bx bx-heart bx-tada-hover"></i>
              </Link>
            </li>
            <li className="nav-item me-5">
              <Link className="nav-link" to="#">
                <i className="bx bx-cart-alt bx-tada-hover"></i>
                <span className="badge text-bg-warning rounded-circle position-absolute">
                  2
                </span>
              </Link>
            </li>
            {/* pasang kondisi pada button  */}

            {!isLogin ? (
              <>
                <li className="nav-item me-lg-3 me-0 mt-4 mt-lg-0">
                  <Link to="/login" className={location.pathname && "/login"}>
                    <Button label="Login" variant="second" />
                  </Link>
                </li>
                <li className="nav-item me-lg-3 me-0 mt-4 mt-lg-0">
                  {/* pasang location untuk tahu sedang di path mana */}
                  <Link
                    to="/register"
                    className={location.pathname && "/register"}
                  >
                    <Button label="Register" variant="second" />
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item mt-3 mt-lg-0 dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="profile-dropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                      className="rounded-circle"
                      style={{ height: "35px", width: "35px" }}
                      alt="Profile Image"
                    />
                  </a>
                  <div
                    className="dropdown-menu dropdown-menu-end"
                    aria-labelledby="profile-dropdown"
                  >
                    <Link className="dropdown-item" to="/user-profile">
                      My Profile
                    </Link>
                    <button
                      type="button"
                      onClick={logoutHandler}
                      className="dropdown-item"
                      href="#"
                    >
                      Logout
                    </button>
                  </div>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};
