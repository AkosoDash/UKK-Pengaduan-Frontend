// export default function Nav () {
//   const handleLogout = () => {
//     sessionStorage.clear()
//     window.location.assign('/')
//   }
//   return (
//     <div className="container-fluid bg-dark ">
//       <div className="row">
//         <div className="ml-auto col-md-4  text-right">
//           <button className="btn btn-transparent" onClick={handleLogout}>Logout</button>
//         </div>
//       </div>
//     </div>
//   )
// }
export default function Nav() {
  const handleLogout = () => {
    sessionStorage.clear();
    window.location.assign("/");
  };
  return (
    <nav className="navbar sticky-top navbar-expand-lg navbar-light bg-dark text-light smooth-shadow">
      <div className="navbar-brand">
        
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

      <div className="collapse navbar-collapse " id="navbarSupportedContent">
        <ul className="navbar-nav w-100 ">
        <li className="nav-item">
            <a className="nav-link text-light arial-black" href= "/report">
              Citizen's Report
            </a>
        </li>
          <li className="nav-item">
            <a className="nav-link text-light " href="/report">
              Home
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-light" href="/reportindex">
              Report List
            </a>
          </li>
          <li className="nav-item ml-auto">
            <button className="btn btn-outline-danger" onClick={handleLogout}>
              Log Out
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}
