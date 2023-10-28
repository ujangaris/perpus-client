import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../slices/users/usersSlices";
import categoriesReducer from "../slices/categories/categoriesSlices";
import publishersReducer from "../slices/publishers/publishersSlices";
import authorsReducer from "../slices/authors/authorsSlices";
import booksReducer from "../slices/books/booksSlices";
import bookshelvesReducer from "../slices/bookshelves/bookshelvesSlices";

//! Store
const store = configureStore({
  reducer: {
    users: usersReducer,
    categories: categoriesReducer,
    publishers: publishersReducer,
    authors: authorsReducer,
    bookshelves: bookshelvesReducer,
    books: booksReducer,
  },
});

export default store;
