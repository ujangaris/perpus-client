import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCategoryAction } from "../../../redux/slices/categories/categoriesSlices";
import Input from "../../../components/atoms/Input";
import { LoadingComponent } from "../../../components/atoms/Alert/LoadingComponent";
import Select from "react-select";
import {
  addBooksAction,
  getAllBooksAction,
} from "../../../redux/slices/books/booksSlices";
import { getAllCategoriesAction } from "./../../../redux/slices/categories/categoriesSlices";
import { getAllAuthorsAction } from "../../../redux/slices/authors/authorsSlices";
import { getAllPublishersAction } from "../../../redux/slices/publishers/publishersSlices";
import { getAllBookShelvesAction } from "../../../redux/slices/bookshelves/bookshelvesSlices";

export const CreateBookModal = ({ isOpen, onClose }) => {
  // siapkan dispatch
  const dispatch = useDispatch();
  // get data from store
  // const { books } = useSelector((state) => state?.books);
  // console.log("ini data book: " + books?.data[0]?.book?.title);
  const { categories } = useSelector((state) => state?.categories);
  // console.log("ini data category: " + categories?.data[0]?.category);
  const options = categories?.data?.map((category) => {
    return {
      value: category?.id_category,
      label: category?.category,
    };
  });
  const { authors } = useSelector((state) => state?.authors);

  const authorOptions = authors?.data?.map((author) => ({
    value: author?.id_author,
    label: author?.name,
  }));

  const { publishers } = useSelector((state) => state?.publishers);
  const publisherOptions = publishers?.data?.map((publisher) => ({
    value: publisher?.id_publisher,
    label: publisher?.name,
  }));

  const { bookshelves } = useSelector((state) => state?.bookshelves);
  const bookshelfOptions = bookshelves?.data?.map((bookshelf) => ({
    value: bookshelf?.id_bookshelf,
    label: bookshelf?.bookshelf,
  }));

  useEffect(() => {
    dispatch(getAllCategoriesAction());
    dispatch(getAllAuthorsAction());
    dispatch(getAllPublishersAction());
    dispatch(getAllBookShelvesAction());
  }, [dispatch]);
  //   state from data category
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    stock: 0,
    category: "",
    author: "",
    publisher: "",
    bookshelf: "",
    picture: null,
  });

  // ! react select hanlde change
  const handleSelectChange = (selectedOption) => {
    setFormData({ ...formData, category: selectedOption.value });
  };
  const handleAuthorChange = (selectedOption) => {
    setFormData({ ...formData, author: selectedOption.value });
  };

  const handlePublisherChange = (selectedOption) => {
    setFormData({ ...formData, publisher: selectedOption.value });
  };

  const handleBookshelfChange = (selectedOption) => {
    setFormData({ ...formData, bookshelf: selectedOption.value });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  // akses fungsi redux
  const { error, loading } = useSelector((state) => state.books);
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

  //   ! form add Book
  const handleSubmit = async (e) => {
    console.log(formData);
    e.preventDefault();
    // dispatch
    dispatch(addBooksAction(formData)); // Use the addBookAction with FormData

    setFormData({
      title: "",
      description: "",
      stock: 0,
      category: "",
      author: "",
      publisher: "",
      bookshelf: "",
      picture: null,
    });
  };

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
      <div className="modal-dialog modal-lg">
        <div className="modal-content" style={{ width: "90%" }}>
          <div className="modal-header bg-success bg-opacity-75">
            <h1 className="modal-title fs-5 text-white" id="exampleModalLabel">
              Add Book
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={onClose}
            ></button>
          </div>
          <form onSubmit={handleSubmit} method="post">
            <div className="modal-body">
              <div className="row">
                <div className="col-md-6">
                  {/* <h2>Book Information</h2> */}
                  <Input
                    label="Title Book"
                    type="text"
                    name="title"
                    onChange={handleChange}
                    value={formData.title}
                  />
                  <Input
                    name="stock"
                    label="Stock"
                    type="number"
                    onChange={handleChange}
                    value={formData.stock}
                  />
                  <label htmlFor="category">Description</label>
                  <textarea
                    name="description"
                    className="form-control"
                    type="text"
                    onChange={handleChange}
                    value={formData.description}
                  />

                  <label htmlFor="picture">Image</label>
                  <input
                    type="file"
                    name="picture"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                  {/* {error && (
                <p className="text-danger">{error?.message?.category}</p>
              )} */}
                </div>
                <div className="col-md-6">
                  {/* <h4>Additional Information</h4> */}
                  <label htmlFor="category">Category</label>
                  <Select
                    options={options}
                    name="category"
                    onChange={handleSelectChange}
                  />
                  <label htmlFor="author">Author</label>
                  <Select
                    options={authorOptions}
                    name="author"
                    onChange={handleAuthorChange}
                  />

                  <label htmlFor="publisher">Publisher</label>
                  <Select
                    options={publisherOptions}
                    name="publisher"
                    onChange={handlePublisherChange}
                  />
                  <label htmlFor="bookshelf">Bookshelf</label>
                  <Select
                    options={bookshelfOptions}
                    name="bookshelf"
                    onChange={handleBookshelfChange}
                  />
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
                <button type="submit" className="btn btn-success">
                  Add Book
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
