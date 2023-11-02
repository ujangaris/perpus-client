import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavbarAdmin } from "../../../components/Admin/NavbarAdmin/NavbarAdmin";
import { LoadingComponent } from "../../../components/atoms/Alert/LoadingComponent";
import {
  getAllCategoriesAction,
  updateCategoryAction,
} from "../../../redux/slices/categories/categoriesSlices";
import "animate.css";
import { CreateCategoryModal } from "./CreateCategoryModal";
import Swal from "sweetalert2";
import { resetCreateAction } from "../../../redux/slices/globalSlice/globalSlice";
import showSessionExpiredAlert from "../../../components/atoms/Alert/SessionExpiredAlert";
import { EditCategoryModal } from "./EditCategoryModal";
import { Pagination } from "../../../components/Admin/Pagination/Pagination";
const Categories = () => {
  // siapkan dispatch
  const dispatch = useDispatch();
  // akses fungsi redux
  const { loading, error, categories, category } = useSelector(
    (state) => state.categories
  );

  // get all data categories
  useEffect(() => {
    dispatch(getAllCategoriesAction());
  }, [dispatch]);

  useEffect(() => {
    // Check for 401 status code and show alert if found
    if (error?.msg === "Token has expired") {
      showSessionExpiredAlert();
    }
  }, [error]);
  console.log(error?.msg);
  //! formData
  const [formData, setFormData] = useState({
    category: "",
  });
  // State  untuk data kategori
  const [newCategory, setNewCategory] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false); // Track modal state

  // pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [categoriesPerPage] = useState(2); // Jumlah artikel per halaman
  const [searchTerm, setSearchTerm] = useState(""); // Kata kunci pencarian

  // Mengatur halaman saat ini
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Menghitung total halaman
  const totalPages = Math.ceil(categories?.data?.length / categoriesPerPage);
  // Menghitung indeks artikel yang akan ditampilkan di halaman saat ini
  const indexOfLastCategory = currentPage * categoriesPerPage;
  const indexOfFirstCategory = indexOfLastCategory - categoriesPerPage + 1;
  const currentCategories = categories?.data?.slice(
    indexOfFirstCategory - 1,
    indexOfLastCategory
  );

  // Menghasilkan tombol halaman
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }
  // State untuk modal edit
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  // state edit category
  const [editCategoryData, setEditCategoryData] = useState({
    id: "",
    category: "",
  });
  // handleEditChange
  const handleEditChange = (e) => {
    setEditCategoryData({
      ...editCategoryData,
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
  const handleEditClick = (id, category) => {
    // Ketika ikon edit diklik, isi data kategori yang akan diedit
    setEditCategoryData({
      id,
      category,
    });
    // Buka modal edit
    handleEditModalOpen();
  };
  // handle edit category save
  const handleEditSave = () => {
    // Kirim pembaruan kategori
    dispatch(
      updateCategoryAction({
        id: editCategoryData.id,
        updatedData: {
          category: editCategoryData.category,
        },
      })
    )
      .unwrap()
      .then(() => {
        // Tutup modal edit
        handleEditModalClose();
        // Refresh daftar kategori setelah pembaruan
        dispatch(getAllCategoriesAction());
      });
  };

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (category?.status === "CREATED" || category?.status === "OK") {
      Swal.fire({
        icon: "success",
        title: category?.message,
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
          category: "",
        });
        dispatch(resetCreateAction());
        setNewCategory(category.data.category);
      });
    }
  }, [category, dispatch]);

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
            <h1 className="h3 mb-0 text-gray-800">Categories Data</h1>
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
              <h3 className="text-center mb-3">List Of Categories</h3>
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
                            Category <i className="fas fa-plus"></i>
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
                            <th>No.</th>
                            <th>Name Categories</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody className="text-center">
                          {newCategory && (
                            <tr>
                              <td className="bg-info-subtle">
                                <span className="text-success">
                                  "{newCategory}"
                                </span>
                              </td>
                              <td className="bg-info-subtle">
                                <span className="text-danger">New data!</span>
                              </td>
                            </tr>
                          )}
                          {currentCategories?.map((item, index) => (
                            <tr key={item.id_category}>
                              <td>{indexOfFirstCategory + index}</td>
                              <td>{item.category}</td>
                              <td>
                                <span
                                  className="btn btn-sm btn-primary"
                                  onClick={() =>
                                    handleEditClick(
                                      item.id_category,
                                      item.category
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
                      {/* pasang pagination */}
                      <nav aria-label="Page navigation example">
                        <ul className="pagination justify-content-end">
                          <li
                            className={`page-item ${
                              currentPage === 1 ? "disabled" : ""
                            }`}
                          >
                            <button
                              className="page-link"
                              onClick={() => paginate(currentPage - 1)}
                            >
                              Previous
                            </button>
                          </li>
                          {pageNumbers.map((number) => (
                            <li
                              key={number}
                              className={`page-item ${
                                currentPage === number ? "active" : ""
                              }`}
                            >
                              <button
                                className="page-link"
                                onClick={() => paginate(number)}
                              >
                                {number}
                              </button>
                            </li>
                          ))}
                          <li
                            className={`page-item ${
                              currentPage === totalPages ? "disabled" : ""
                            }`}
                          >
                            <button
                              className="page-link"
                              onClick={() => paginate(currentPage + 1)}
                            >
                              Next
                            </button>
                          </li>
                        </ul>
                      </nav>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        {/* Modal */}
        <CreateCategoryModal isOpen={isModalOpen} onClose={handleModalClose} />
        {/* Modal Edit Kategori */}
        <EditCategoryModal
          isOpen={isEditModalOpen}
          onClose={handleEditModalClose}
          editCategoryData={editCategoryData}
          handleEditChange={handleEditChange}
          handleEditSave={handleEditSave}
        />
      </section>
    </>
  );
};

export default Categories;
