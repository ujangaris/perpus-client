import React from "react";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { resetSuccessAction } from "../../../redux/slices/globalSlice/globalSlice";

export const SuccessMessage = ({ message }) => {
  const dispatch = useDispatch();
  Swal.fire({
    icon: "success",
    title: "Good Job",
    text: message,
  });
  // pasang dispath untuk mebirim action pada store redux
  dispatch(resetSuccessAction());
};
