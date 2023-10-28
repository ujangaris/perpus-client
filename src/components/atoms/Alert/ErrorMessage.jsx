import React from "react";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { resetErrorAction } from "../../../redux/slices/globalSlice/globalSlice";

export const ErrorMessage = ({ message }) => {
  const dispatch = useDispatch();
  Swal.fire({
    icon: "error",
    title: "Oops!",
    text: message,
  });
  //pasang dispath untuk mebirim action pada store redux
  dispatch(resetErrorAction());
};
