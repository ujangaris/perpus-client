import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavbarAdmin } from "../../../components/Admin/NavbarAdmin/NavbarAdmin";
import {
  getAllBooksAction,
  updateBooksAction,
} from "../../../redux/slices/books/booksSlices";
import { LoadingComponent } from "../../../components/atoms/Alert/LoadingComponent";
import { CreateBookModal } from "./CreateBookModal";
import Swal from "sweetalert2";
import { resetCreateAction } from "../../../redux/slices/globalSlice/globalSlice";
import showSessionExpiredAlert from "../../../components/atoms/Alert/SessionExpiredAlert";
import { EditBookModal } from "./EditBookModal";
import { useParams } from "react-router-dom";
const Books = () => {
  // siapkan dispatch
  const dispatch = useDispatch();
  // akses fungsi redux
  const { loading, error, books, book } = useSelector((state) => state.books);

  // get all data books
  useEffect(() => {
    dispatch(getAllBooksAction());
  }, [dispatch]);

  useEffect(() => {
    // Check for 401 status code and show alert if found
    if (error?.msg === "Token has expired") {
      showSessionExpiredAlert();
    }
  }, [error]);
  // console.log(`ini apa ? ${error?.msg}`);

  const [isModalOpen, setIsModalOpen] = useState(false); // Track modal state

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };
  // state untuk modal edit
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    description: "",
    stock: "",
    picture: null,
    category: "",
    author: "",
    publisher: "",
    bookshelf: "",
  });

  // handleEditModalOpen
  const handleEditModalOpen = () => {
    setIsEditModalOpen(true);
  };

  // handleEditModalClose
  const handleEditModalClose = () => {
    setIsEditModalOpen(false);
  };

  // handleEditChange
  const handleEditChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  // pasang handleEditKlik
  const handleEditClick = (
    id,
    title,
    stock,
    description,
    picture,
    category,
    author,
    publisher,
    bookshelf
  ) => {
    // ketika icon edit di clik, isi data book yang akan di edit
    setFormData({
      id,
      title,
      stock,
      description,
      picture,
      category,
      author,
      publisher,
      bookshelf,
    });
    // buka modal edit
    handleEditModalOpen();
  };
  // console.log("category :" + category?.id_category);
  // console.log("formData :" + formData?.category);
  useEffect(() => {
    if (book?.status === "CREATED" || book?.status === "OK") {
      Swal.fire({
        icon: "success",
        title: book?.message,
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
          title: "",
          description: "",
          stock: "",
          picture: null,
          category: "",
          author: "",
          publisher: "",
          bookshelf: "",
        });
        dispatch(resetCreateAction());
        // Ambil data buku terbaru setelah berhasil menambahkan buku
        dispatch(getAllBooksAction());
      });
    }
  }, [book, book?.status, book?.message, books?.data, dispatch]);
  // console.log("isinya apas sih:" + books?.data[0]?.book?.title);

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
            <h1 className="h3 mb-0 text-gray-800">Books Data</h1>
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
              <h3 className="text-center mb-3">List Of Books</h3>
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
                            Books <i className="fas fa-plus"></i>
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
                            <th>Sampul</th>
                            <th>Name Books</th>
                            <th>Available Stock</th>
                            <th>Author</th>
                            <th>Publisher</th>
                            <th>Bookshelf</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody className="text-center">
                          {/* loop data books */}
                          {books?.data?.map((item) => (
                            <tr key={item?.book?.id_book}>
                              <td>
                                <img
                                  src={item?.book?.picture}
                                  alt={item?.book?.name}
                                  width="50"
                                />
                              </td>
                              <td>{item?.book?.title}</td>
                              <td>{item?.book?.stock}</td>
                              <td>{item?.author?.name}</td>
                              <td>{item?.publisher?.name}</td>
                              <td>{item?.bookshelf?.bookshelf}</td>
                              <td>
                                <span
                                  className="btn btn-sm btn-primary"
                                  onClick={() =>
                                    handleEditClick(
                                      item?.book?.id_book,
                                      item?.book?.title,
                                      item?.book?.stock,
                                      item?.book?.description,
                                      item?.book?.picture,
                                      item?.category?.category,
                                      item?.author?.name,
                                      item?.publisher?.name,
                                      item?.bookshelf?.bookshelf
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
        <CreateBookModal isOpen={isModalOpen} onClose={handleModalClose} />
        {/* Modal edit book */}
        <EditBookModal
          isOpen={isEditModalOpen}
          onClose={handleEditModalClose}
          formData={formData}
          handleEditChange={handleEditChange}
          setFormData={setFormData}
        />
      </section>
    </>
  );
};

export default Books;
