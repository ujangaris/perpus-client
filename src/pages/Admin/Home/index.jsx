import React from "react";
import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <div>
      <div className="container ">
        <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
          <div className="col-10 col-sm-8 col-lg-6 mx-auto">
            <img
              src="https://images.unsplash.com/photo-1580537659466-0a9bfa916a54?auto=format&fit=crop&q=80&w=1374&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              className="d-block mx-lg-auto img-fluid mb-2"
              alt="Bootstrap Themes"
              width="350"
              height="500"
              loading="lazy"
            />
          </div>
          <div className="col-lg-6">
            <h1 className="display-5 fw-bold text-body-emphasis lh-1 mb-3 text-center shadow">
              <marquee>
                <strong className="fw-bold">Per</strong>
                <span className="fw-bold text-primary ">Pustakaan</span>
              </marquee>
            </h1>
            <p className="lead">
              Temukan beragam buku berkualitas dan akses cepat di perpustakaan
              kami. Kami menawarkan koleksi buku terlengkap dengan layanan
              terbaik, sehingga Anda dapat mengejar pengetahuan dan petualangan
              literer Anda.
            </p>
            <div className="d-grid gap-2 d-md-flex justify-content-md-start">
              <Link
                to="/login"
                type="button"
                className="btn btn-primary btn-lg px-4 mr-2"
              >
                Login
              </Link>
              <Link
                to="/register"
                type="button"
                className="btn btn-outline-secondary btn-lg px-4"
              >
                Register
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
