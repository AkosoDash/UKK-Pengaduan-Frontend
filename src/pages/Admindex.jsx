import './style.css'
import axios from 'axios'
import {useState, useEffect} from 'react'

export default function Admindex() {

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
        token: JSON.parse(sessionStorage.getItem("tokenAdmin")),
        username: JSON.parse(sessionStorage.getItem("username")),
        pendingReport: 0,
        totalReport: 0,
        totalUser: 0
      });

  useEffect(() => {
    if (!state.token) {
      window.location = "/admin"
    }else {
        axios
  
        .get(`http://localhost:1241/report/user/pending`)
        .then(({ data }) => {
          console.log(data);
          setState((state) => ({ ...state, pendingReport: data.length }));
  
          axios
          .get(`http://localhost:1241/report/user/total`)
          .then(({ data }) => {
            console.log(data);
            setState((state) => ({ ...state, totalReport: data.length }));
  
            axios
            .get(`http://localhost:1241/user/total`)
            .then(({ data }) => {
              console.log(data);
              setState((state) => ({ ...state, totalUser: data.length }));
            })
  
          })
  
        })
        .catch((err) => console.log(err));
  
        
      }
    });


  const handleLogout = () => {
    sessionStorage.clear();
    window.location.assign("/");
  };

  return (<div>
    <div className='navbar'>
        <div className='navbar-container'>
          <a href='/adminindex' className='navbar-logo' onClick={closeMobileMenu}>
            <span>NgaduMas</span>
          </a>
          <div className='menu-icon' onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
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
    <div className='hero-container'>
      <div className="h1">
        <h1 text-align="center">Halo {state.username}</h1>
      </div>
      <p>Selamat datang dan semangat untuk hari ini. Semoga urusan {state.username} lancar semua yaa.</p>
    </div>
  </div>)
}