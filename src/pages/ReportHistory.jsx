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

  const updateStatus = (reportId, status) => {
    axios.put(`http://localhost:1241/report/user/${reportId}/upStatus`, {status, response: state.content, id_admin: state.id_user}).then((response) => console.log(response)).catch((err) => console.log(err));
    window.location.reload();
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
    if (!state.token) {
      window.location = "/admin";
    } else {
      axios.get(`http://localhost:1241/report/user/history`).then(({data}) => {
        console.log(data);
        setState((state) => ({
          ...state,
          report: data
        }));
        // window.location.assign('/report')
      }).catch((err) => console.log(err));
    }
  }, [state.id_user, state.token]);

  const deleteReport = (reportId) => {
    axios.delete(`http://localhost:1241/report/user/${reportId}/del`).then((response) => console.log(response)).catch((err) => console.log(err));
    window.location.reload();
  };

  const handleLogout = () => {
    sessionStorage.clear();
    window.location.assign("/");
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
      <h3 className="tengah mt-3">Data Tanggapan</h3>
    <div className="container">
      <div className="mt-4">
        <h3 text-align="left">
          <button type="button" class="btn btn-block btn-outline-primary btn-md" onClick={() => window.print()}><i className="fas fa-download" /> Unduh Laporan Tanggapan</button>
        </h3>
      </div>
      <div className="table-responsive mt-4">
          <table class="table table-align-middle table-striped">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Isi Pengaduan</th>
              <th scope="col">Tanggal</th>
              <th scope="col">Tanggapan</th>
              <th scope="col">Status</th>
              <th scope="col">Aksi</th>
            </tr>
          </thead>
          {
          state.report.map((element, index) => (
            <tbody key={index}>
              <tr>
              <th scope="row">{index + 1}</th>
              <td>{element.content}</td>
              <td>{new Date(element.date_created).toLocaleString()}</td>
              <td>{element.response}</td>
              <td>{element.status}</td>
              <td>
                <div class="btn-group" role="group" aria-label="Basic example">
                
                <button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#selesai">
                  <i className="fas fa-check-square	" /> Selesai 
                </button>

                <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#hapus">
                  <i className="fas fa-trash	" /> Hapus 
                </button>
                
                <div class="modal fade" id="hapus" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-header bg-info text-white">
                        <h5 class="modal-title" id="staticBackdropLabel">Hapus Data</h5>
                        <button type="button " class="fa fa-close btn btn-lg text-white" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div class="modal-body">
                      <div class="mb-3 mt-3">
                        <h6>Apakah anda yakin ingin menghapus data ini?</h6>
                      </div>
                      </div>
                      <div class="modal-footer">
                        <button className="btn btn-secondary btn-md" data-bs-dismiss="modal" aria-label="Close">
                          <i className="fas fa-times-circle montfont"></i>{" "}Batalkan
                        </button>
                        <button className="btn btn-danger btn-md" onClick={() => deleteReport(element.id_report)}>
                          <i className="fas fa-check-square montfont"></i>{" "}Hapus
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="modal fade" id="selesai" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-header bg-info text-white">
                        <h5 class="modal-title" id="staticBackdropLabel">Selesaikan!!</h5>
                        <button type="button " class="fa fa-close btn btn-lg text-white" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div class="modal-body">
                      <div class="mb-3 mt-3">
                        <h6>Apa ini sudah benar-benar selesai?</h6>
                      </div>
                      </div>
                      <div class="modal-footer">
                        <button className="btn btn-secondary btn-md" data-bs-dismiss="modal" aria-label="Close">
                          <i className="fas fa-times-circle montfont"></i>{" "}Batalkan
                        </button>
                        <button className="btn btn-success btn-md" onClick={() => updateStatus(element.id_report, "Selesai")}>
                          <i className="fas fa-check-square montfont"></i>{" "}Selesai
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