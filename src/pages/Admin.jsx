import {Form, Input} from '../components/Form'
import {useState, useEffect, Fragment} from 'react'
import axios from 'axios'
import './style.css'
export default function Admin() {

  const [state, setState] = useState({
    email: "",
    password: "",
    message: "",
    token: JSON.parse(sessionStorage.getItem('token'))
  })

  const handleChange = (e) => {
    setState(state => ({
      ...state,
      [e.target.name]: e.target.value
    }))
  }

  useEffect(() => {
    if (state.token) {
      window.location = "/adminindex"
    }
  })

  const handleSubmit = (e) => {
    e.preventDefault(e)
    axios.post('http://localhost:1241/admin', state).then(({data}) => {
      if (data.message) {
        setState(state => ({
          ...state,
          message: data.message
        }))
      } else {
        sessionStorage.setItem('email', JSON.stringify(data.email))
        sessionStorage.setItem('id', JSON.stringify(data.id_admin))
        sessionStorage.setItem('username', JSON.stringify(data.username))
        sessionStorage.setItem('password', JSON.stringify(data.password))
        sessionStorage.setItem('tokenAdmin', JSON.stringify(data.tokenAdmin))
        window.location.assign('/adminindex')
      }
    }).catch(err => console.log(err))
  }
  return (<Fragment>
    <div className="masuk-container">
      <div className="masuk-box">
          <Form title="Admin Login" onSubmit={handleSubmit}>
            <h5 className="">Email</h5>
            <Input name="email" placeholder="Email" type="email" onChange={handleChange}/>
            <h5 className="">Kata Sandi</h5>
            <Input name="password" placeholder="Kata Sandi" type="password" onChange={handleChange}/> {state.message && <div id="message entry w-100 rounded bg-danger">{state.message}</div>}
            <div className="row mt-4">
              <div className="col">
                <div class="d-grid gap-2">
                  <a className="btn btn-link btn-md button-round" href="/login" type="button">Masuk Sebagai Pengguna</a>
                </div>
              </div>
              <div className="col">
                <div class="d-grid gap-2">
                  <button className="btn btn-primary button-round" type="submit">Masuk</button>
                </div>  
              </div>
            </div>
          </Form>
      </div>
    </div>
  </Fragment>)
}