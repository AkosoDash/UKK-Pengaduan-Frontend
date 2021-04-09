import {Fragment} from "react";
import './style.css'
export default function Index() {
  return (
  <Fragment>
    <div className="masuk-container">
      <div className="row justify-content-center">
        <div className="col-auto navbar-brand d-flex flex-column align-items-center ind-mt">
          <h1 className="display-1 text-white pmfont">NgaduMas</h1>
          <h1 className=" pmfont text-white">Ceritakan apa yang rusak di sekitar anda!</h1>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col">
          <div class="d-grid gap-2">
            <a className="btn btn-light btn-link btn-lg button-round" href="/login" type="button">Login</a>
          </div>
        </div>
        <div className="col">
          <div className="d-grid gap-2">
            <a className="btn btn-dark btn-lg button-round" href="/register" type="submit">Register</a>
          </div>  
        </div>
      </div>              
    </div>
  </Fragment>
  );
}