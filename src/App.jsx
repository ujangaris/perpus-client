import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import "boxicons/css/boxicons.min.css";
import { Register } from "./pages";
// import { Login } from "./pages/Login/index";
import { Profile } from "./pages/User/Profile";
import { ProtectedRoute } from "./components/AuthRoute/ProtectedRoute";
import { useSelector } from "react-redux";
import { SidebarAdmin } from "./components/Admin/SidebarAdmin/SidebarAdmin";
import { AdminDashBoard } from "./pages/Admin/AdminDashBoard/AdminDashBoard";
import { AdminProfile } from "./pages/Admin/AdminProfile/AdminProfile";
import { FooterAdmin } from "./components/Admin/FooterAdmin/FooterAdmin";
import { LogoutAdmin } from "./components/Admin/LogoutAdmin/LogoutAdmin";
import Users from "./pages/Admin/Users";
import { DetailUser } from "./pages/Admin/Users/DetailUser/DetailUser";
import Categories from "./pages/Admin/Categories";
import Publishers from "./pages/Admin/Publishers";
import Authors from "./pages/Admin/Authors";
import Books from "./pages/Admin/Books";
import Bookshelves from "./pages/Admin/Bookshelves";
import { Login } from "./pages/Login";

function App() {
  // get the role user
  const { userAuth } = useSelector((state) => state?.users);
  const loggedInRole = userAuth?.userInfo?.data?.role;

  const isLoginAdmin = loggedInRole === "Super Admin";
  const isLoginUser = loggedInRole === "User";
  // console.log(userAuth?.userInfo?.data?.role);
  // console.log(isLoginUser);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AdminDashBoard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/user-profile"
          element={
            <ProtectedRoute>{isLoginUser && <Profile />}</ProtectedRoute>
          }
        />
      </Routes>

      {isLoginAdmin && (
        <div id="page-top">
          <div id="wrapper">
            <SidebarAdmin />
            <div id="content-wrapper" className="d-flex flex-column">
              <Routes>
                <Route path="/admin-dashboard" element={<AdminDashBoard />} />
                <Route path="/admin-profile" element={<AdminProfile />} />
                <Route path="/list-authors" element={<Authors />} />
                <Route path="/list-publishers" element={<Publishers />} />
                <Route path="/list-categories" element={<Categories />} />
                <Route path="/list-users" element={<Users />} />
                <Route path="/list-books" element={<Books />} />
                <Route path="/list-bookshelves" element={<Bookshelves />} />
                <Route path="/user/:userId" element={<DetailUser />} />
              </Routes>
              <FooterAdmin />
            </div>
            <a className="scroll-to-top rounded" href="#page-top">
              <i className="fas fa-angle-up"></i>
            </a>
            <LogoutAdmin />
          </div>
        </div>
      )}
    </BrowserRouter>
  );
}

export default App;
