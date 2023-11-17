import React from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

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
import NotFound from "./pages/NotFound";
import { Home } from "./pages/Admin/Home";
import { ForgotPassword } from "./pages/ForgotPassword/ForgotPassword";
import { ResetPassword } from "./pages/ResetPassword/ResetPassword";

function App() {
  // get the role user
  const { userAuth } = useSelector((state) => state?.users);
  // const loggedInRole = userAuth?.userInfo?.data?.access_token;
  const isLogin = userAuth?.userInfo?.data?.access_token;
  // const notLogin =
  //   userAuth?.userInfo === null || userAuth?.userInfo === undefined;

  // const isLoginAdmin = loggedInRole === "Super Admin";
  // const isLoginUser = loggedInRole === "User";
  console.log(userAuth?.userInfo?.data?.access_token);
  console.log("token apa:" + isLogin);
  return (
    <BrowserRouter>
      <div id="page-top">
        <div id="wrapper">
          {isLogin && <SidebarAdmin />}
          <div id="content-wrapper" className="d-flex flex-column">
            <Routes>
              {/* <Route path="*" element={<NotFound />} /> */}
              <Route path="/" element={<Outlet />}>
                <Route index element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route
                  path="/reset_password/:token"
                  element={<ResetPassword />}
                />

                <Route
                  path="/user-profile"
                  element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/dashboard-admin"
                  element={
                    <ProtectedRoute>
                      <AdminDashBoard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute>
                      <AdminProfile />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/list-authors"
                  element={
                    <ProtectedRoute>
                      <Authors />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/list-publishers"
                  element={
                    <ProtectedRoute>
                      <Publishers />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/list-categories"
                  element={
                    <ProtectedRoute>
                      <Categories />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/list-users"
                  element={
                    <ProtectedRoute>
                      <Users />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/list-books"
                  element={
                    <ProtectedRoute>
                      <Books />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/list-bookshelves"
                  element={
                    <ProtectedRoute>
                      <Bookshelves />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/user/:userId"
                  element={
                    <ProtectedRoute>
                      <DetailUser />
                    </ProtectedRoute>
                  }
                />
              </Route>
            </Routes>
            {isLogin && <FooterAdmin />}
          </div>
          <a className="scroll-to-top rounded" href="#page-top">
            <i className="fas fa-angle-up"></i>
          </a>
          {isLogin && <LogoutAdmin />}
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
