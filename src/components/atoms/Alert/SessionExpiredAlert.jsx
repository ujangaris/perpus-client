import React from "react";
import Swal from "sweetalert2";

const showSessionExpiredAlert = () => {
  Swal.fire({
    title: "Session Berakhir",
    text: "Sesi Anda telah berakhir. Silakan login kembali.",
    icon: "warning",
    confirmButtonText: "OK",
  }).then(() => {
    localStorage.removeItem("userInfo");
    window.location.href = "/login";
  });
};

export default showSessionExpiredAlert;
