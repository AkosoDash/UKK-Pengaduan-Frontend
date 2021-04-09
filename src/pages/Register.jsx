import {Form, Input} from '../components/Form'
import {useState, useEffect} from 'react'
import axios from 'axios'
import './style.css'
export default function Register() {

  const [state, setState] = useState({
    email: '',
    password: '',
    username: '',
    telp: '',
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
    e.preventDefault();
    axios.post('/user', state).then(({data}) => console.log(data)).catch(err => console.log(err));
    window.location.assign('/login')
  }

  return (
  <div className="masuk-container">
  <div className="masuk-box">
      <Form title="Masyarakat Register" onSubmit={handleSubmit}>
        <h5 className="">Email</h5>
        <Input name="email" placeholder="Email" type="email" onChange={handleChange}/>
        <h5 className="">Kata Sandi</h5>
        <Input name="password" placeholder="Kata Sandi" type="password" onChange={handleChange}/> {state.message && <div id="message entry w-100 rounded bg-danger">{state.message}</div>}
        <h5 className="">Nama Pengguna</h5>
        <Input name="username" placeholder="Username" type="text" onChange={handleChange}/>
        <h5 className="">Nomor Telepon</h5>
        <Input name="telp" placeholder="Telephone" type="number" onChange={handleChange}/>
        <div className="row mt-4">
          <div className="col">
            
          </div>
          <div className="col">
            <div class="d-grid gap-2">
             
            </div>
            <div class="d-grid gap-2">
              <a href="/login" className="btn btn-lg btn-link button-round" type="submit">Masuk</a>
              <button className="btn btn-primary btn-lg button-round" type="submit">Register</button>
            </div>  
          </div>
        </div>
      </Form>
  </div>
</div>
  )
}