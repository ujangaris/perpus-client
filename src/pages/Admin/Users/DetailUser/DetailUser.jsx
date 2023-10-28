import React, { useEffect, useState } from "react";
import Calendar from "react-calendar"; // Import the react-calendar component
import "react-calendar/dist/Calendar.css"; // Import the calendar styles
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSingleUserAction } from "../../../../redux/slices/users/usersSlices";
import { NavbarAdmin } from "../../../../components/Admin/NavbarAdmin/NavbarAdmin";
import { LoadingComponent } from "../../../../components/atoms/Alert/LoadingComponent";

export const DetailUser = () => {
  const [selectedDate, setSelectedDate] = useState(new Date()); // State to manage the selected date
  const dispatch = useDispatch();
  const { users, user, loading, success } = useSelector((state) => state.users);
  const { userId } = useParams();

  useEffect(() => {
    dispatch(getSingleUserAction(userId));
  }, [dispatch, userId]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  return (
    <>
      <div id="content">
        {/*  <!-- Topbar --> */}
        <NavbarAdmin />
        {/*  <!-- End of Topbar --> */}

        {/* <!-- Begin Page Content --> */}
        <div className="container-fluid">
          {/*  <!-- Page Heading --> */}
          <div className="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 className="h3 mb-0 text-gray-800">User Detail</h1>
          </div>

          {/*  <!-- Content Row --> */}
          <div className="row"></div>
        </div>
        {/*   <!-- /.container-fluid --> */}
      </div>
      {/* <!-- End of Main Content --> */}
      <section style={{ backgroundColor: "#eee" }}>
        <div className="container py-5">
          <div className="row">
            <div className="col">
              <nav
                aria-label="breadcrumb"
                className="bg-light rounded-3 p-3 mb-4"
              >
                <ol className="breadcrumb mb-0">
                  <li className="breadcrumb-item">
                    <a href="#">Home</a>
                  </li>
                  <li className="breadcrumb-item">
                    <a href="#">User</a>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    User Detail
                  </li>
                </ol>
              </nav>
            </div>
          </div>
          {loading ? (
            <LoadingComponent />
          ) : (
            <>
              <div className="row">
                <div className="col-lg-4">
                  <div className="card mb-4">
                    <div className="card-body text-center">
                      <img
                        src={user?.data?.user?.picture}
                        alt="avatar"
                        className="rounded-circle img-fluid"
                        style={{ width: "150px" }}
                      />
                      <h5 className="my-3">{user?.data?.user?.username}</h5>
                      <p className="text-muted mb-1">
                        {user?.data?.user?.email}
                      </p>
                      <div className="d-flex justify-content-center mb-2">
                        <button
                          type="button"
                          className="btn btn-outline-primary ms-1"
                        >
                          Edit Profile
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-8">
                  <div className="card mb-4">
                    <div className="card-body">
                      <div className="row">
                        <div className="col-sm-3">
                          <p className="mb-0">Full Name</p>
                        </div>
                        <div className="col-sm-9">
                          <p className="text-muted mb-0">
                            {user?.data?.user?.name}
                          </p>
                        </div>
                      </div>
                      <hr />
                      <div className="row">
                        <div className="col-sm-3">
                          <p className="mb-0">Email</p>
                        </div>
                        <div className="col-sm-9">
                          <p className="text-muted mb-0">
                            {user?.data?.user?.email}
                          </p>
                        </div>
                      </div>
                      <hr />
                      <div className="row">
                        <div className="col-sm-3">
                          <p className="mb-0">Phone</p>
                        </div>
                        <div className="col-sm-9">
                          <p className="text-muted mb-0">(08) 13-234-5678</p>
                        </div>
                      </div>
                      <hr />

                      <div className="row">
                        <div className="col-sm-3">
                          <p className="mb-0">Last Login</p>
                        </div>
                        <div className="col-sm-9">
                          <p className="text-muted mb-0">
                            {user?.data?.user?.last_login}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="card mb-4">
                        <div className="card-body">
                          <h5 className="mb-3">Calendar</h5>
                          <div className="row">
                            <div className="col-md-6">
                              <Calendar
                                onChange={handleDateChange}
                                value={selectedDate}
                              />
                            </div>
                            <div className="col-md-6">
                              <div className="card">
                                <div className="card-body">
                                  <h6>Event Notes</h6>
                                  {/* Add your input fields for event notes here */}
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
            </>
          )}
        </div>
      </section>
    </>
  );
};
