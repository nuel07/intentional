import './register.css'
import e from 'express'
import axios from 'axios'
import {toast} from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import {register, reset} from '../../features/auth/authSlice'
import Spinner from '../../components/Spinner'
//import { compareSync } from 'bcryptjs'

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
})
const { name, email, password, password2 } = formData

const navigate = useNavigate()
const dispatch = useDispatch()

const {user, isLoading, isError, isSuccess, message} = useSelector((state) => (
  state.auth
))

useEffect(() => {
    if(isError){
        toast.error(message)
    }
    if(isSuccess || user){
        navigate('/')
    }

    dispatch(reset)
}, [user, isError, isSuccess, message, navigate, dispatch])

const onChange = (e) => {
    setFormData((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
    }))
}
const onSubmit = (e) => {
    e.preventDefault()
    if(password !== password2){
        toast.error('Passwords don\'t match')
    } else {
        const userData = {
            name,
            email,
            password,
        }
        dispatch(register(userData))
    }
}

if (isLoading){
    return <Spinner />
}
  /**
   *   const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false)
    try {
      const res = await axios.post("/api/register", {
        username,
        email,
        password
      });
      res.data && window.location.replace("/login");
    } catch (error) {
      setError(true)
    }
  }
   * 
   */

  return (
    <div className='register'>
       <span className="registerTitle">Sign up today</span>
        <form className="registerForm" onSubmit={onSubmit}>
          <label >Username</label>
            <input className='registerInput' type="text" 
            placeholder='Enter your username....'
            onChange={onChange}/>
            <label >Email</label>
            <input className='registerInput' type="email"
            placeholder='Enter your email....'
            onChange={onChange}
            />
            <label >Password</label>
            <input className='registerInput' type="password"
            placeholder='Enter your password...'
            onChange={onChange}/>
            <button className='registerButton' type='submit'>Register</button>
        </form>
        <h4 className='have-account'>Have an account?</h4>
        <button className="registerloginButton">
          <Link className='link' to="/login">Login</Link>
        </button>
    </div>
  )
}
