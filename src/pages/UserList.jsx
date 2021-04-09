import { Form, Input } from "../components/Form";
import { useState, useEffect } from "react";
import axios from "axios";
import "./style.css";
// import logo from "../assets/logo64.png";

export default function Admindex() {
  const [state, setState] = useState({
    user: [],
    token: JSON.parse(sessionStorage.getItem("tokenAdmin")),
  });

  useEffect(() => {
    if (!state.token) {
      window.location = "/admin";
    } else {
      axios
        .get(`http://localhost:1241/user`)
        .then(({ data }) => {
          console.log(data);
          setState((state) => ({ ...state, user: data }));
          // window.location.assign('/report')
        })
        .catch((err) => console.log(err));
    }
  }, [state.id_user]);

  const handleLogout = () => {
    sessionStorage.clear();
    window.location.assign("/");
  };

  const deleteAccount = (userId) => {
    axios
      .delete(`http://localhost:1241/admin/user/${userId}/delete`)
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
    window.location.reload();
  };

  return (
    <div>
      <nav className="navbar sticky-top navbar-expand-lg navbar-light bg-light smooth-shadow">
        <div className="navbar-brand">
          {/* <img width="40" src={logo} alt="Logo" /> */}
          {/*<div className="margin-left__1rem display-5 larger-font-size text-dark">Lapor</div>*/}
        </div>

        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav w-100">
            <li className="nav-item">
              <a className="nav-link" href="/admindex">
                Beranda
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/reportindexadmin">
                Aduan
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/reporthistory">
                Riwayat Aduan
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link active" href="#">
                List User <span className="sr-only">(current)</span>
              </a>
            </li>
            <li className="nav-item ml-auto">
              <button className="btn btn-outline-danger" onClick={handleLogout}>
                Keluar
              </button>
            </li>
          </ul>
        </div>
      </nav>
      <div className="container-fluid">
        <div className="row margin-top__2rem justify-content-center">
          {state.user.map((element, index) => (
            <div className="card margin-card" key={index}>
              <div className="card-body">
                <h5 className="card-title">
                  {index + 1}.{" "}
                  {element.username.charAt(0).toUpperCase() +
                    element.username.slice(1)}
                </h5>
                <form>
                  <div className="form-row align-items-center">
                    <div className="form-group col-auto">
                      <label htmlFor="email">Email address</label>
                      <input
                        type="email"
                        className="form-control disabled"
                        id="email"
                        aria-describedby="emailHelp"
                        value={element.email}
                        disabled
                      />
                    </div>
                    <div className="form-group col-auto">
                      <label htmlFor="password">Password</label>
                      <input
                        type="text"
                        className="form-control disabled"
                        id="password"
                        value={element.password}
                        disabled
                      />
                    </div>
                    <div className="form-group col-auto">
                      <label htmlFor="username">Username</label>
                      <input
                        type="username"
                        className="form-control disabled"
                        id="username"
                        value={element.username}
                        disabled
                      />
                    </div>
                    <div className="form-group col-auto">
                      <label htmlFor="telp">No Telepon</label>
                      <input
                        type="number"
                        className="form-control disabled"
                        id="telp"
                        value={element.telp}
                        disabled
                      />
                    </div>
                    <div className="userlist-button">
                      <button
                        type="button"
                        className="btn btn-danger"
                        data-toggle="modal"
                    data-target="#exampleModal"
                      >
                        Hapus
                      </button>
                    </div>
                    <div
                className="modal fade"
                id="exampleModal"
                tabindex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true">
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="exampleModalLabel">
                        Apakah anda yakin ingin menghapus data aduan ini?
                      </h5>
                      <button
                        type="button"
                        className="close"
                        data-dismiss="modal"
                        aria-label="Close"
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div className="modal-body">Data aduan ini akan terhapus selama-lamanya!</div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        data-dismiss="modal"
                      >
                        Kembali
                      </button>
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => deleteAccount(element.id_user)}
                      >
                      Saya yakin, hapus aduan
                      </button>
                    </div>
                  </div>
                </div>
              </div>
                  </div>
                </form>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
