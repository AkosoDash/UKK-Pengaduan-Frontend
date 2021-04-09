import { Fragment, useState, useEffect } from "react";
import axios from "axios";
import "./style.css";

export default function Login() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  }; 

  useEffect(() => {
    showButton();
  }, []);
  const [state, setState] = useState({
    content: "",
    status: "",
    report: [],
    id_user: JSON.parse(sessionStorage.getItem("id")),
    token: JSON.parse(sessionStorage.getItem("token")),
    username: JSON.parse(sessionStorage.getItem("username")),
  });

  useEffect(() => {
      axios
        .get(`http://localhost:1241/report/user/${state.id_user}`)
        .then(({ data }) => {
          console.log(data);
          setState((state) => ({ ...state, report: data }));
          // window.location.assign('/report')
        })
        .catch((err) => console.log(err));
  }, [state.id_user]);

  const handleLogout = () => {
    sessionStorage.clear();
    window.location.assign("/");
  };

  return (
    <Fragment>
      <div className='navbar'>
        <div className='navbar-container'>
          <a href='/report' className='navbar-logo' onClick={closeMobileMenu}>
            <span>NgaduMas</span>
          </a>
          <div className='menu-icon' onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu pb-2'}>
            <li className='nav-item'>
              <a href='report' className='nav-links' onClick={closeMobileMenu}>
                Beranda
              </a>
            </li>
            <li className='nav-item'>
              <a
                href="/reportindex"
                className='nav-links'
                onClick={closeMobileMenu}
              >
                PengaduanKu
              </a>
            </li>
            <li className='nav-item'>
              <a
                href="/done"
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Selesai
              </a>
            </li>
            <li>
              <a
                href='/masuk'
                className='nav-links-mobile'
                onClick={handleLogout}
              >
                Keluar
              </a>
            </li>
          </ul>
          {button && <a type="button" href='/masuk' className='mb-3 btn btn-outline-dark btn-lg'>Keluar</a>}
        </div>
      </div>
      <div className="bg-bersama">
      <div className="container">
      <div class="p-3 row row-cols-1 row-cols-md-3 g-3">
        {state.report.map((element) => (
          <div class="col mt-4">
          <div class="card h-100">
            <div className="card-header"><span className="judul-adu"><center>{element.title}</center></span></div>
            <div class="card-body">
              <h5 class="card-text"><span className="badge bg-warning text-black">Isi Pengaduan :</span></h5><span className="text-dark">{element.content}</span>
              <h5 class="card-text mt-3"><span className="badge bg-success text-white">Tanggapan :</span></h5><span>{element.response}</span>
            </div>
            <div class="card-footer">
              <small class="text-muted">Status : <button className="btn btn-info btn-sm disabled">{element.status}</button></small>
            </div>
          </div>
        </div>
      ))}
      </div>
    </div>
      </div>
    </Fragment>
  );
}