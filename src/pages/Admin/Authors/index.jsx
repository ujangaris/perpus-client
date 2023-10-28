import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavbarAdmin } from "../../../components/Admin/NavbarAdmin/NavbarAdmin";
import { LoadingComponent } from "../../../components/atoms/Alert/LoadingComponent";
import showSessionExpiredAlert from "../../../components/atoms/Alert/SessionExpiredAlert";
import {
  getAllAuthorsAction,
  updaateAuthorAction,
} from "../../../redux/slices/authors/authorsSlices";
import { CreateAuthorModal } from "./CreateAuthorModal";
import Swal from "sweetalert2";
import { resetCreateAction } from "../../../redux/slices/globalSlice/globalSlice";
import { EditAuthorModal } from "./EditAuthorModal";

const Authors = () => {
  // siapkan dispatch
  const dispatch = useDispatch();
  // akses fungsi redux
  const { loading, error, authors, author } = useSelector(
    (state) => state.authors
  );

  // get all data authors
  useEffect(() => {
    dispatch(getAllAuthorsAction());
  }, [dispatch]);

  useEffect(() => {
    // Check for 401 status code and show alert if found
    if (error?.msg === "Token has expired") {
      showSessionExpiredAlert();
    }
  }, [error]);
  //! formData
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    gender: "",
    phone_number: "",
  });
  // State  untuk data author
  const [newAuthor, setNewAuthor] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false); // Track modal state

  // State untuk modal edit
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  // state edit author
  const [editAuthorData, setEditAuthorData] = useState({
    id: "",
    name: "",
    email: "",
    phone_number: "",
    gender: "",
  });
  // handleEditChange
  const handleEditChange = (e) => {
    setEditAuthorData({
      ...editAuthorData,
      [e.target.name]: e.target.value,
    });
  };
  // handleEditModalOpen
  const handleEditModalOpen = () => {
    setIsEditModalOpen(true);
  };

  // handleEditModalClose
  const handleEditModalClose = () => {
    setIsEditModalOpen(false);
  };

  // pasang handleEditClick
  const handleEditClick = (id, name, email, phone_number, gender) => {
    // Ketika ikon edit diklik, isi data author yang akan diedit
    setEditAuthorData({
      id,
      name,
      email,
      gender,
      phone_number,
    });
    // Buka modal edit
    handleEditModalOpen();
  };
  // handle edit author save
  const handleEditSave = () => {
    // Kirim pembaruan kategori
    dispatch(
      updaateAuthorAction({
        id: editAuthorData.id,
        updatedData: {
          name: editAuthorData.name,
          email: editAuthorData.email,
          phone_number: editAuthorData.phone_number,
          gender: editAuthorData.gender,
        },
      })
    )
      .unwrap()
      .then(() => {
        // Tutup modal edit
        handleEditModalClose();
        // Refresh daftar kategori setelah pembaruan
        dispatch(getAllAuthorsAction());
      });
  };

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (author?.status === "CREATED" || author?.status === "OK") {
      Swal.fire({
        icon: "success",
        title: author?.message,
        showClass: {
          popup: "animate__animated animate__fadeInDown",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutUp",
        },
        timer: 3000, // Durasi dalam milidetik (misalnya 3000 ms untuk 3 detik)
        timerProgressBar: true, // Tampilkan progress bar timer
      }).then(() => {
        setIsModalOpen(false); // Tutup modal
        setFormData({
          name: "",
          email: "",
          phone_number: "",
          gender: "",
        });
        dispatch(resetCreateAction());
        setNewAuthor(author.data.name);
      });
    }
  }, [author, dispatch]);
  console.log("ini isinya: " + newAuthor);
  console.log("ini isinya2: " + editAuthorData.gender);
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
            <h1 className="h3 mb-0 text-gray-800">Authors Data</h1>
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
              <h3 className="text-center mb-3">List Of Authors</h3>
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
                        <div>
                          <button
                            className="btn btn-success mx-2"
                            onClick={handleModalOpen}
                          >
                            Author <i className="fas fa-plus"></i>
                          </button>
                        </div>
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
                            <th>Name Authors</th>
                            <th>Email</th>
                            <th>Gender</th>
                            <th>Phone</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody className="text-center">
                          {newAuthor && (
                            <tr>
                              <td className="bg-info-subtle">
                                <span className="text-success">
                                  "{newAuthor}"
                                </span>
                              </td>
                              <td className="bg-info-subtle"></td>
                              <td className="bg-info-subtle"></td>
                              <td className="bg-info-subtle"></td>
                              <td className="bg-info-subtle">
                                <span className="text-danger">New data!</span>
                              </td>
                            </tr>
                          )}
                          {authors?.data?.map((item) => (
                            <tr key={item.id_author}>
                              <td>{item.name}</td>
                              <td>{item.email}</td>
                              <td>{item.gender}</td>
                              <td>{item.phone_number}</td>
                              <td>
                                <span
                                  className="btn btn-sm btn-primary"
                                  onClick={() =>
                                    handleEditClick(
                                      item.id_author,
                                      item.name,
                                      item.email,
                                      item.phone_number,
                                      item.gender
                                    )
                                  }
                                >
                                  <i className="fas fa-edit text-white"></i>
                                </span>
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
        {/* Modal */}
        <CreateAuthorModal isOpen={isModalOpen} onClose={handleModalClose} />
        <EditAuthorModal
          isOpen={isEditModalOpen}
          onClose={handleEditModalClose}
          editAuthorData={editAuthorData}
          handleEditChange={handleEditChange}
          handleEditSave={handleEditSave}
        />
      </section>
    </>
  );
};

export default Authors;
