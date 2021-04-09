import {Form, Input} from '../components/Form'
import {useState, useEffect} from 'react'
import axios from 'axios'
import './style.css'
export default function Login() {

  const [state, setState] = useState({
    email: "",
    password: "",
    message: "",
    id_user: JSON.parse(sessionStorage.getItem('id')),
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
      window.location = "/report"
    }
  })

  const handleSubmit = (e) => {
    e.preventDefault(e)
    axios.post('http://localhost:1241/user/auth', state).then(({data}) => {
      if (data.message) {
        setState(state => ({
          ...state,
          message: data.message
        }))
      } else {
        if(data !== "Something Is Wrong") {
          sessionStorage.setItem('email', JSON.stringify(data.email))
          sessionStorage.setItem('id', JSON.stringify(data.id_user))
          sessionStorage.setItem('username', JSON.stringify(data.username))
          sessionStorage.setItem('password', JSON.stringify(data.password))
          sessionStorage.setItem('telp', JSON.stringify(data.telp))
          sessionStorage.setItem('token', JSON.stringify(data.token))
          window.location.assign('/report')
        }
      }
    }).catch(err => console.log(err))
  }

  return (<div className="masuk-container">
  <div className="masuk-box">
      <Form title="Masyarakat Login" onSubmit={handleSubmit}>
        <h5 className="">Email</h5>
        <Input name="email" placeholder="Email" type="email" onChange={handleChange}/>
        <h5 className="">Kata Sandi</h5>
        <Input name="password" placeholder="Kata Sandi" type="password" onChange={handleChange}/> {state.message && <div id="message entry w-100 rounded bg-danger">{state.message}</div>}
        <div className="row mt-4">
          <div className="col">
            
          </div>
          <div className="col">
            <div class="d-grid gap-2">
             
            </div>
            <div class="d-grid gap-2">
              <a className="btn btn-link btn-lg button-round" href="/register" type="button">Register</a>
              <button className="btn btn-lg btn-primary button-round" type="submit">Masuk</button>
            </div>  
          </div>
        </div>
      </Form>
  </div>
</div>)
}