import React, { useState } from "react";
import { Link } from "react-router-dom";

export const SidebarAdmin = () => {
  // hooks style
  const [style, setStyle] = useState(
    "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
  );

  const changeStyle = () => {
    if (
      style === "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
    ) {
      setStyle(
        "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion toggled"
      );
    } else {
      setStyle("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion");
    }
  };
  return (
    <>
      <ul className={style} id="accordionSidebar">
        {/*  <!-- Sidebar - Brand --> */}
        <a
          className="sidebar-brand d-flex align-items-center justify-content-center"
          onClick={changeStyle}
        >
          <div className="sidebar-brand-icon rotate-n-15">
            <a style={{ textDecoration: "none", color: "white" }}>
              <i className="fas fa-book"></i>
            </a>
          </div>
          <div className="sidebar-brand-text mx-3">
            Per <span>Pustakaan</span>
          </div>
          {/* <div className="text-center d-none d-md-inline">
                <button
                  className="rounded-circle border-0"
                  id="sidebarToggle"
                  onClick={changeStyle}
                ></button>
              </div> */}
        </a>

        {/*   <!-- Divider --> */}
        <hr className="sidebar-divider my-0" />

        {/*  <!-- Nav Item - Dashboard --> */}
        <li className="nav-item active">
          <Link className="nav-link" to="/">
            <i className="fas fa-fw fa-tachometer-alt"></i>
            <span>Dashboard</span>
          </Link>
        </li>

        {/*  <!-- Divider --> */}
        <hr className="sidebar-divider" />

        {/*   <!-- Heading --> */}
        <div className="sidebar-heading">Interface</div>

        {/*  <!-- Nav Item - Pages Collapse Menu --> */}
        <li className="nav-item">
          <Link className="nav-link collapsed" to="/list-users">
            <i className="fas fa-users "></i>
            <span>Users</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link collapsed" to="/list-books">
            <i className="fas fa-book"></i>
            <span>Books</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link collapsed" to="/list-bookshelves">
            <i className="fas fa-network-wired"></i>
            <span>Bookshelves</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link collapsed" to="/list-categories">
            <i className="fas fa-layer-group "></i>
            <span>Categories</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link collapsed" to="/list-publishers">
            <i className="fas fa-palette "></i>
            <span>Publishers</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link collapsed" to="/list-authors">
            <i className="fas fa-landmark "></i>
            <span>Authors</span>
          </Link>
        </li>
        <li className="nav-item">
          <a
            className="nav-link collapsed"
            to="list-user"
            data-toggle="collapse"
            data-target="#collapseTwo"
            aria-expanded="true"
            aria-controls="collapseTwo"
          >
            <i className="fas fa-fw fa-cog "></i>
            <span>Components</span>
          </a>
          <div
            id="collapseTwo"
            className="collapse"
            aria-labelledby="headingTwo"
            data-parent="#accordionSidebar"
          >
            <div className="bg-white py-2 collapse-inner rounded">
              <h6 className="collapse-header">Custom Components:</h6>
              <a className="collapse-item" href="buttons.html">
                Buttons
              </a>
              <a className="collapse-item" href="cards.html">
                Cards
              </a>
            </div>
          </div>
        </li>
      </ul>
    </>
  );
};
