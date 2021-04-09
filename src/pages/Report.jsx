import {Form, Input} from '../components/Form'
import {Fragment, useState, useEffect} from 'react'
import axios from 'axios'
import $ from 'jquery'
import './style.css'
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

  window.addEventListener('resize', showButton);
  const [state, setState] = useState({
    title: "",
    content: "",
    status: "",
    id_user: JSON.parse(sessionStorage.getItem('id')),
    token: JSON.parse(sessionStorage.getItem('token')),
    username: JSON.parse(sessionStorage.getItem("username"))
  })

  useEffect(() => {
    if (!state.token) {
      window.location = "/login";
    } else {
      axios.get(`http://localhost:1241/report/user/${state.id_user}`).then(({data}) => {
        console.log(data);
        setState((state) => ({
          ...state,
          report: data
        }));
        // window.location.assign('/report')
      }).catch((err) => console.log(err));
    }
  }, [state.id_user, state.token]);

  const handleChange = (e) => {
    setState((state) => ({
      ...state,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault(e);
    axios.post("http://localhost:1241/report", state).then(({data}) => {}).catch((err) => console.log(err));
    window.location.reload()
    $("#entry-point").removeClass("d-none");
  };

  const handleLogout = () => {
    sessionStorage.clear();
    window.location.assign("/");
  };

  return (<Fragment>
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
      <div className='hero-container'>
      <div className="h1">
        <h1 text-align="center">PENGADUAN MASYARAKAT</h1>
      </div>
      <p>Dengan ini kami meyediakan sebuah website untuk masyarakat memberitahukan fasilitas apa yang sudah rusak atau tidak layak digunakan</p>
      
      <button type="button" class="btn btn-lg btn-outline-light mt-4 button-round" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
        Laporkan Di Sini
      </button>
      
      <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header bg-info text-white">
              <h5 class="modal-title" id="staticBackdropLabel">Form Pengaduan</h5>
              <button type="button" class="fa fa-close btn btn-lg text-white" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <Form onSubmit={handleSubmit}>
              <div class="modal-body">
                <div class="mb-3">
                  <label for="exampleFormControlTextarea1" class="form-label">Judul</label>
                  <Input name="title" placeholder="Tulis judul pengaduanmu di sini" type="text" onChange={handleChange} required="required"/>
                </div>
                <div className="mb-3">
                <label for="exampleFormControlTextarea1" class="form-label">Isi Pengaduan</label>
                <textarea className="form-control" style={{
                  height: "300px"
                }} name="content" placeholder="Tulis isi pengaduanmu di sini" onChange={handleChange} required="required"></textarea>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Tutup</button>
                <button type="submit" data-bs-target="/reportindex" className="btn btn-primary">
                {" "}
                Kirim</button>
                <div id="entry-point" className="d-none text-success">Success</div>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  </Fragment>)
}