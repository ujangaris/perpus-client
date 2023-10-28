import React from "react";
import { Gap } from "../../components/atoms";

export const Profile = () => {
  return (
    <>
      <section style={{ backgroundColor: "#eee" }}>
        <Gap height={70} />
        <div className="container py-5">
          <div className="row">
            <div className="col">
              <nav
                aria-label="breadcrumb"
                className="bg-light rounded-3 p-3 mb-4"
              >
                <ol className="breadcrumb mb-0">
                  <li className="breadcrumb-item">
                    <a href="#">Home</a>
                  </li>
                  <li className="breadcrumb-item">
                    <a href="#">User</a>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    User Profile
                  </li>
                </ol>
              </nav>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-4">
              <div className="card mb-4">
                <div className="card-body text-center">
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                    alt="avatar"
                    className="rounded-circle img-fluid"
                    style={{ width: "150px" }}
                  />
                  <h5 className="my-3">Bagas Adi Putra</h5>
                  <p className="text-muted mb-1">Kelas 3</p>
                  <p className="text-muted mb-4">IPS 3</p>
                  <div className="d-flex justify-content-center mb-2">
                    <button
                      type="button"
                      className="btn btn-outline-primary ms-1"
                    >
                      Edit Profile
                    </button>
                  </div>
                </div>
              </div>
              {/* <div className="card mb-4 mb-lg-0">
                <div className="card-body p-0">
                  <ul className="list-group list-group-flush rounded-3 px-5">
                    <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                      <i className="bx bx-globe bx-lg text-warning"></i>
                      <p className="mb-0">
                        <a href="#">@bagas</a>
                      </p>
                    </li>
                  </ul>
                </div>
              </div> */}
            </div>
            <div className="col-lg-8">
              <div className="card mb-4">
                <div className="card-body">
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Full Name</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">Bagas Adi Putra</p>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Email</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">bagas@gmail.com</p>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Phone</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">(08) 13-234-5678</p>
                    </div>
                  </div>
                  <hr />

                  <div className="row">
                    <div className="col-sm-3">
                      <p className="mb-0">Address</p>
                    </div>
                    <div className="col-sm-9">
                      <p className="text-muted mb-0">Jl.Jakarta Raya no 1</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="card mb-4 mb-md-0">
                    <div className="card-header text-center bg-warning">
                      <p className="mt-4 text-white">
                        <span className="text-primary font-italic me-1">
                          <a href="#">Buku</a>
                        </span>
                        Yang sedang di pinjam
                      </p>
                    </div>
                    <div className="card-body">
                      <div className="accordion" id="accordionPinjamBuku">
                        <div className="accordion-item">
                          <h2 className="accordion-header">
                            <button
                              className="accordion-button"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target="#panelsStayOpen-collapseOne"
                              aria-expanded="true"
                              aria-controls="panelsStayOpen-collapseOne"
                            >
                              Jumat,26 Agustus 2023
                            </button>
                          </h2>
                          <div
                            id="panelsStayOpen-collapseOne"
                            className="accordion-collapse collapse show"
                          >
                            <div className="accordion-body">
                              <ul>
                                <li>
                                  <a href="#">
                                    <p className="d-inline-flex gap-1">
                                      <span
                                        className="list-number"
                                        style={{
                                          fontWeight: "bold",
                                          fontSize: "20px",
                                        }}
                                      >
                                        1.
                                      </span>
                                      <a
                                        data-bs-toggle="collapse"
                                        href="#collapsePinjamBuku"
                                        role="button"
                                        aria-expanded="false"
                                        aria-controls="collapsePinjamBuku"
                                        className="mt-1"
                                      >
                                        Laskar Pelangi
                                      </a>
                                    </p>
                                    <div
                                      className="collapse"
                                      id="collapsePinjamBuku"
                                    >
                                      <div className="card card-body text-dark">
                                        Laskar Pelangi adalah novel pertama
                                        karya Andrea Hirata yang diterbitkan
                                        oleh Bentang Pustaka pada tahun 2005.
                                        Novel ini bercerita tentang kehidupan 10
                                        anak dari keluarga miskin yang
                                        bersekolah di sebuah sekolah
                                        Muhammadiyah di Belitung yang penuh
                                        dengan keterbatasan.
                                        <p className="mt-2">
                                          Penulis:
                                          <span className="text-primary">
                                            &nbsp;Andrea Hirata
                                          </span>
                                        </p>
                                        <p>
                                          Penerbit:
                                          <span className="text-primary">
                                            &nbsp;Bentang Pustaka
                                          </span>
                                        </p>
                                        <p>
                                          Genre:
                                          <span className="text-primary">
                                            &nbsp;Novel
                                          </span>
                                        </p>
                                        <p>
                                          Harus dikembalikan:
                                          <span className="text-danger">
                                            &nbsp;2, September 2023
                                          </span>
                                        </p>
                                      </div>
                                    </div>
                                  </a>
                                </li>

                                <li>
                                  <a href="#">
                                    <p className="d-inline-flex gap-1">
                                      <span
                                        className="list-number"
                                        style={{
                                          fontWeight: "bold",
                                          fontSize: "20px",
                                        }}
                                      >
                                        2.
                                      </span>
                                      <a
                                        data-bs-toggle="collapse"
                                        href="#collapsePinjamBuku"
                                        role="button"
                                        aria-expanded="false"
                                        aria-controls="collapsePinjamBuku"
                                        className="mt-1"
                                      >
                                        Kamus Lengkap Bahasa Inggris
                                      </a>
                                    </p>
                                    <div
                                      className="collapse"
                                      id="collapsePinjamBuku"
                                    >
                                      <div className="card card-body text-dark">
                                        Lorem ipsum, dolor sit amet consectetur
                                        adipisicing elit. Facilis, voluptates.
                                        <p className="mt-2">
                                          Penulis:
                                          <span className="text-primary">
                                            &nbsp;-
                                          </span>
                                        </p>
                                        <p>
                                          Penerbit:
                                          <span className="text-primary">
                                            &nbsp;-
                                          </span>
                                        </p>
                                        <p>
                                          Genre:
                                          <span className="text-primary">
                                            &nbsp;Novel
                                          </span>
                                        </p>
                                        <p>
                                          Harus dikembalikan:
                                          <span className="text-danger">
                                            &nbsp;3, September 2023
                                          </span>
                                        </p>
                                      </div>
                                    </div>
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="card mb-4 mb-md-0">
                    <div className="card-header text-center bg-danger ">
                      <p className="mt-4 text-white">
                        <span className="text-primary  font-italic me-1">
                          <a href="#">Buku</a>
                        </span>
                        Yang harus dikembalikan!
                      </p>
                    </div>
                    <div className="card-body">
                      <div className="accordion" id="accordionYangDikembalikan">
                        <div className="accordion-item">
                          <h2 className="accordion-header">
                            <button
                              className="accordion-button text-danger"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target="#panelsDua-collapseDua"
                              aria-expanded="true"
                              aria-controls="panelsDua-collapseDua"
                            >
                              Harap Dikembalikan!
                            </button>
                          </h2>
                          <div
                            id="panelsDua-collapseDua"
                            className="accordion-collapse collapse show"
                          >
                            <div className="accordion-body">
                              <ul>
                                <li className="">
                                  <a href="#">
                                    <p className="d-inline-flex gap-1">
                                      <span
                                        className="list-number"
                                        style={{
                                          fontWeight: "bold",
                                          fontSize: "20px",
                                        }}
                                      >
                                        1.
                                      </span>
                                      <a
                                        data-bs-toggle="collapse"
                                        href="#collapseDenda"
                                        role="button"
                                        aria-expanded="false"
                                        aria-controls="collapseDenda"
                                        className="mt-1"
                                      >
                                        Rumus Praktis Matematika
                                      </a>
                                    </p>
                                    <div
                                      className="collapse"
                                      id="collapseDenda"
                                    >
                                      <div className="card card-body text-dark">
                                        BUKU RAHASIA PINTAR LENGKAP DAN MUDAH
                                        RUMUS-RUMUS MATEMATIKA UNTUK SMA.
                                        Terlaris. BUKU RAHASIA PINTAR LENGKAP
                                        DAN MUDAH RUMUS-RUMUS MATEMATIKA UNTUK
                                        SMA.
                                        <p className="mt-2">
                                          Penulis:
                                          <span className="text-primary">
                                            &nbsp;Retno Wti
                                          </span>
                                        </p>
                                        <p>
                                          Penerbit:
                                          <span className="text-primary">
                                            &nbsp;Gramedia Pustaka
                                          </span>
                                        </p>
                                        <p>
                                          Genre:
                                          <span className="text-primary">
                                            &nbsp;Buku Pelajaran
                                          </span>
                                        </p>
                                        <p>
                                          Status Buku:
                                          <span className="text-danger">
                                            &nbsp;Belum dikembalikan
                                          </span>
                                        </p>
                                      </div>
                                    </div>
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
