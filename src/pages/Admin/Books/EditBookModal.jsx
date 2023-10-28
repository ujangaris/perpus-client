import React, { useEffect, useState } from "react";

import Input from "../../../components/atoms/Input";
import { LoadingComponent } from "../../../components/atoms/Alert/LoadingComponent";
import { useDispatch, useSelector } from "react-redux";
import { updateBooksAction } from "../../../redux/slices/books/booksSlices";
import { useParams } from "react-router-dom";

export const EditBookModal = ({
  isOpen,
  onClose,
  formData,
  setFormData,
  // handleEditChange,
}) => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.books);
  const { categories } = useSelector((state) => state.categories);
  const { authors } = useSelector((state) => state.authors);
  const { publishers } = useSelector((state) => state.publishers);
  const { bookshelves } = useSelector((state) => state.bookshelves);
  // handleEditChange
  const handleEditChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  // ! handle picture change
  const handleFileChange = (e) => {
    const selectedImage = e.target.files[0];
    if (selectedImage) {
      setFormData({
        ...formData,
        picture: selectedImage,
      });
    }
  };

  //Handle the form submission
  const handleUpdateBook = (e) => {
    // console.log(formData.category);
    e.preventDefault();

    // Dispatch the updateBooksAction with the formData
    dispatch(updateBooksAction({ ...formData }));
  };
  // console.log("formData :" + formData?.category);
  return (
    <div
      className={`modal fade ${isOpen ? "show" : ""}`}
      style={{
        display: isOpen ? "block" : "none",
        marginTop: "20px",
      }}
      id="exampleModal"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-lg ">
        <div className="modal-content" style={{ width: "90%" }}>
          <div className="modal-header bg-primary bg-opacity-75">
            <h1 className="modal-title fs-5 text-white" id="exampleModalLabel">
              Edit Book
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={onClose}
            ></button>
          </div>
          <form method="post" onSubmit={handleUpdateBook}>
            <div className="modal-body">
              <div className="row">
                <div className="col-md-6">
                  {/* <h2>Book Information</h2> */}
                  <Input
                    label="Title Book"
                    type="text"
                    name="title"
                    onChange={handleEditChange}
                    value={formData?.title}
                  />
                  <Input
                    name="stock"
                    label="Stock"
                    type="number"
                    onChange={handleEditChange}
                    value={formData?.stock}
                  />
                  <label htmlFor="category">Description</label>
                  <textarea
                    name="description"
                    className="form-control"
                    type="text"
                    onChange={handleEditChange}
                    value={formData?.description}
                  />

                  <label htmlFor="picture">Image</label>
                  <input
                    type="file"
                    name="picture"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                  {formData.picture && typeof formData.picture === "string" && (
                    <div className="mt-2">
                      <img
                        className="img-thumbnail"
                        src={formData.picture} // Use the Cloudinary URL from your formData
                        alt="Preview"
                        style={{
                          maxWidth: "100px",
                          maxHeight: "100px",
                          // border: "1px solid #ccc", // Thin and less prominent border
                        }}
                      />
                    </div>
                  )}
                  {formData.picture instanceof File && (
                    <div className="mt-2">
                      <img
                        className="img-thumbnail"
                        src={URL.createObjectURL(formData.picture)}
                        alt="Preview"
                        style={{
                          maxWidth: "100px",
                          maxHeight: "100px",
                          // border: "1px solid #ccc", // Thin and less prominent border
                        }}
                      />
                    </div>
                  )}
                </div>
                <div className="col-md-6">
                  {/* <h4>Additional Information</h4> */}

                  <div className="form-group">
                    <label htmlFor="category">Category</label>
                    <select
                      name="category"
                      id={formData?.id_category}
                      value={formData?.category}
                      onChange={handleEditChange}
                      className="form-select"
                    >
                      <option>-- select category --</option>
                      {categories?.data?.map((category) => (
                        <option
                          key={category?.id_category}
                          value={category?.id_category}
                        >
                          {category?.category}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="author">Author</label>
                    <select
                      name="author"
                      value={formData?.author}
                      onChange={handleEditChange}
                      className="form-select"
                    >
                      <option>--- select author ---</option>
                      {authors?.data?.map((author) => (
                        <option
                          key={authors?.id_author}
                          value={author?.id_author}
                        >
                          {author?.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="publisher">Publisher</label>
                    <select
                      name="publisher"
                      value={formData.publisher}
                      onChange={handleEditChange}
                      className="form-select"
                    >
                      <option>--- select publisher ---</option>
                      {publishers?.data?.map((publisher) => (
                        <option
                          key={publisher?.id_publisher}
                          value={publisher?.id_publisher}
                        >
                          {publisher?.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="bookshelf">Bookshelf</label>
                    <select
                      name="bookshelf"
                      value={formData.bookshelf}
                      onChange={handleEditChange}
                      className="form-select"
                    >
                      <option>--- select bookshelf ---</option>
                      {bookshelves?.data?.map((bookshelf) => (
                        <option
                          key={bookshelf?.id_bookshelf}
                          value={bookshelf?.id_bookshelf}
                        >
                          {bookshelf?.bookshelf}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={onClose}
              >
                Close
              </button>
              {loading ? (
                <LoadingComponent />
              ) : (
                <button type="submit" className="btn btn-primary">
                  Update Book
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
