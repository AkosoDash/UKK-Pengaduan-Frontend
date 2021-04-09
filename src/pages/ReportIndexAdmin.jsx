import {Fragment, useState, useEffect} from "react";
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
    token: JSON.parse(sessionStorage.getItem("tokenAdmin")),
    username: JSON.parse(sessionStorage.getItem("username"))
  });

  useEffect(() => {
    axios.get(`http://localhost:1241/report/user/pending`).then(({data}) => {
      console.log(data);
      setState((state) => ({
        ...state,
        report: data
      }));
      // window.location.assign('/report')
    }).catch((err) => console.log(err));
  }, [state.id_user]);

  const updateStatus = (reportId, status) => {
    axios.put(`http://localhost:1241/report/user/${reportId}/upStatus`, {status, response: state.content, id_admin: state.id_user}).then((response) => console.log(response)).catch((err) => console.log(err));
    window.location.reload();
  };

  const handleLogout = () => {
    sessionStorage.clear();
    window.location.assign("/");
  };

  const handleChange = (e) => {
    setState((state) => ({
      ...state,
      [e.target.name]: e.target.value
    }));
  };

  return (<Fragment>
    <div className='navbar'>
        <div className='navbar-container'>
          <a href='/adminindex' className='navbar-logo' onClick={closeMobileMenu}>
            <span>NgaduMas</span>
          </a>
          <div className='menu-icon' onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu pb-2'}>
            <li className='nav-item'>
              <a href='/adminindex' className='nav-links' onClick={closeMobileMenu}>
                Beranda
              </a>
            </li>
            <li className='nav-item'>
              <a
                href="/reportindexadmin"
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Pengaduan
              </a>
            </li>
            <li className='nav-item'>
              <a
                href="/history"
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Tanggapan
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
                href='/admin'
                className='nav-links-mobile'
                onClick={handleLogout}
              >
                Keluar
              </a>
            </li>
          </ul>
          {button && <a type="button" href='/admin' className='mb-3 btn btn-outline-dark btn-lg'>Keluar</a>}
        </div>
      </div>
    <div className="container">
      <div className="tengah mt-4">
        <h3>Data Pengaduan</h3>
      </div>
      <div className="table-responsive">
          <table class="table table-align-middle table-striped">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Judul</th>
              <th scope="col">Isi Pengaduan</th>
              <th scope="col">Tanggal</th>
              <th scope="col">Pengadu</th>
              <th scope="col">Status</th>
              <th scope="col">Tanggapan</th>
            </tr>
          </thead>
          {
          state.report.map((element, index) => (
            <tbody key={index}>
              <tr>
              <th scope="row">{index + 1}</th>
              <td>{element.title}</td>
              <td>{element.content}</td>
              <td>{new Date(element.date_created).toLocaleString()}</td>
              <td>{element.username}</td>
              <td>{element.status}</td>
              <td>
                <div class="btn-group" role="group" aria-label="Basic example">
                <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#tanggapi">
                <i className="far fa-file-alt	" /> Tanggapi 
                </button>
                
                <div class="modal fade" id="tanggapi" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-header bg-info text-white">
                        <h5 class="modal-title" id="staticBackdropLabel">Form Tanggapan</h5>
                        <button type="button" class="fa fa-close btn btn-lg text-white" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div class="modal-body">
                      <div class="mb-3">
                        <label for="exampleFormControlTextarea1" class="form-label">Tanggapan</label>
                        <textarea className="form-control" name="content" placeholder="Response" style={{
                    height: "150px"
                  }} onChange={handleChange} required="required"/>
                      </div>
                      </div>
                      <div class="modal-footer">
                      <button className="btn btn-success btn-sm" onClick={() => updateStatus(element.id_report, "Disetujui")}>
                        <i className="fas fa-check-square montfont"></i>{" "}Setuju
                      </button>
                      <button className="btn btn-danger btn-sm" onClick={() => updateStatus(element.id_report, "Ditolak")}>
                        <i className="fas fa-times-circle montfont"></i>{" "}Tolak
                      </button>
                      </div>
                    </div>
                  </div>
                </div>
                </div>
              </td>
            </tr>
            </tbody>
            )
          )}
        </table>
      </div>
    </div>
  </Fragment>);
}
