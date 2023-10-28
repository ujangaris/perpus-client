import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./NavbarAdmin.css";

export const NavbarAdmin = () => {
  // get the login user role
  const { userAuth } = useSelector((state) => state?.users);
  console.log(userAuth?.userInfo?.data?.role);
  // console.log(userAuth?.userInfo?.data?.role);
  return (
    <div>
      <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
        {/*  <!-- Sidebar Toggle (Topbar) --> */}
        <Link
          reloadDocument
          id="sidebarToggleTop"
          className="btn btn-link d-md-none rounded-circle mr-3"
        >
          <i className="fa fa-bars"></i>
        </Link>

        {/*  <!-- Topbar Navbar --> */}
        <ul className="navbar-nav ml-auto">
          <div className="topbar-divider d-none d-sm-block"></div>

          {/* <!-- Nav Item - User Information --> */}
          <li className="nav-item dropdown no-arrow">
            <a
              className="nav-link dropdown-toggle"
              href="#"
              id="userDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <span className="mr-2 d-none d-lg-inline text-gray-600 small">
                {userAuth?.userInfo?.data?.role}
              </span>
              <img
                className="img-profile rounded-circle"
                src="img/undraw_profile.svg"
              />
            </a>
            {/*  <!-- Dropdown - User Information --> */}
            <div
              className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
              aria-labelledby="userDropdown"
            >
              <Link className="dropdown-item" to="/admin-profile">
                <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                Profile
              </Link>

              <div className="dropdown-divider"></div>
              <a
                className="dropdown-item"
                href="#"
                data-toggle="modal"
                data-target="#logoutModal"
              >
                <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                Logout
              </a>
            </div>
          </li>
        </ul>
      </nav>
    </div>
  );
};
