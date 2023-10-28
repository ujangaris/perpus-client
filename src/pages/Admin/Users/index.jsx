import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavbarAdmin } from "../../../components/Admin/NavbarAdmin/NavbarAdmin";
import { getAllUsersAction } from "../../../redux/slices/users/usersSlices";
import { LoadingComponent } from "../../../components/atoms/Alert/LoadingComponent";
import showSessionExpiredAlert from "../../../components/atoms/Alert/SessionExpiredAlert";
import { Link } from "react-router-dom";
import moment from "moment";
const Users = () => {
  // siapkan dispatch
  const dispatch = useDispatch();
  // akses fungsi redux
  const { loading, error, users } = useSelector((state) => state.users);

  // get all data user
  useEffect(() => {
    dispatch(getAllUsersAction());
  }, [dispatch]);

  useEffect(() => {
    // Check for 401 status code and show alert if found
    if (error?.msg === "Token has expired") {
      showSessionExpiredAlert();
    }
  }, [error]);

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
            <h1 className="h3 mb-0 text-gray-800">User Data</h1>
          </div>
        </div>
        {/*   <!-- /.container-fluid --> */}
      </div>
      {/* <!-- End of Main Content --> */}
      <section style={{ backgroundColor: "#eee" }}>
        <div className="container py-5">
          <div className="row">
            <div className="col">
              {/* table */}
              <h3 className="text-center mb-3">List Of Users</h3>
              {loading ? (
                <LoadingComponent />
              ) : (
                <div className="card shadow">
                  <div className="card-header">
                    <div className="row">
                      <div className="col-md-6">
                        <div
                          className="dataTables_length"
                          id="dataTable_length"
                        >
                          <label className="d-flex align-items-center">
                            Show
                            <select
                              name="dataTable_length"
                              aria-controls="dataTable"
                              className="custom-select custom-select-sm ml-2"
                              style={{ width: "70px" }}
                            >
                              <option value="10">10</option>
                              <option value="25">25</option>
                              <option value="50">50</option>
                              <option value="100">100</option>
                            </select>
                            entries
                          </label>
                        </div>
                      </div>
                      <div className="col-md-6 d-flex justify-content-end align-items-center">
                        <div
                          className="input-group input-group-sm"
                          style={{ width: "200px" }}
                        >
                          <input
                            type="text"
                            name="table_search"
                            className="form-control"
                            placeholder="Search..."
                          />
                          {/* <div className="input-group-append">
                    <button type="submit" className="btn btn-default">
                      <i className="fas fa-search"></i>
                    </button>
                  </div> */}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    <div
                      className="table-responsive"
                      style={{ marginTop: "-16px" }}
                    >
                      <table
                        className="table table-hover"
                        id="dataTable"
                        width="100%"
                        cellSpacing={0}
                      >
                        <thead className="table-primary text-center">
                          <tr>
                            <th>Picture</th>
                            <th>Username</th>
                            <th>Role</th>
                            <th>Last Login</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody className="text-center">
                          {users?.data?.map((item) => (
                            <tr key={item?.user?.id_user}>
                              <td>
                                <img
                                  src={item?.user?.picture}
                                  alt={item?.user?.name}
                                  width="50"
                                />
                              </td>
                              <td>{item?.user?.username}</td>
                              <td>
                                {item?.role?.name === "Super Admin" ? (
                                  <span className="badge badge-primary ">
                                    {item?.role?.name}
                                  </span>
                                ) : (
                                  <span className="badge badge-success">
                                    role{" "}
                                  </span>
                                )}
                              </td>
                              <td>
                                {item?.user?.last_login
                                  ? moment(item?.user?.last_login).format(
                                      "MMMM DD, YYYY h:mm A"
                                    )
                                  : "N/A"}
                              </td>
                              <td>
                                <Link to={`/user/${item?.user?.id_user}`}>
                                  <i className="fas fa-eye"></i>
                                </Link>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div className="row mt-3">
                      <div className="col-md-6">
                        <div
                          className="dataTables_length"
                          id="dataTable_length"
                        >
                          <label className="d-flex align-items-center">
                            Show
                            <select
                              name="dataTable_length"
                              aria-controls="dataTable"
                              className="custom-select custom-select-sm ml-2"
                              style={{ width: "70px" }}
                            >
                              <option value="10">10</option>
                              <option value="25">25</option>
                              <option value="50">50</option>
                              <option value="100">100</option>
                            </select>
                            entries
                          </label>
                        </div>
                      </div>
                      <div className="col-md-6 d-flex justify-content-end">
                        <nav aria-label="...">
                          <ul className="pagination">
                            <li className="page-item disabled">
                              <span className="page-link">Previous</span>
                            </li>
                            <li
                              className="page-item active"
                              aria-current="page"
                            >
                              <span className="page-link">1</span>
                            </li>
                            <li className="page-item">
                              <a className="page-link" href="#!">
                                2
                              </a>
                            </li>
                            <li className="page-item">
                              <a className="page-link" href="#!">
                                3
                              </a>
                            </li>
                            <li className="page-item">
                              <a className="page-link" href="#!">
                                Next
                              </a>
                            </li>
                          </ul>
                        </nav>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Users;
