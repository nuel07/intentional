import './login.css'
import e from 'express'
import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {toast} from 'react-toastify'
import {login, reset} from '../../features/auth/authSlice'
import Spinner from '../../components/Spinner'

export default function Login() {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
})
const { username, password } = formData

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


const onChange = () => {
    setFormData((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
    }))
}
const onSubmit = (e) => {
    e.preventDefault()

    const userData = {
        username,
        password,
    }

    dispatch(login(userData))
}

if(isLoading){
    return <Spinner />
}
  return (
    <div className='login'>
        <span className="loginTitle">Login</span>
        <form className="loginForm" onSubmit={onSubmit}>
            <label >Username</label>
            <input className='loginInput' type="email"
            placeholder='Enter your username....' onChange={onChange}/>
            <label >Password</label>
            <input className='loginInput' type="password"
            placeholder='Enter your password...' onChange={onChange}/>
            <button className="loginButton" type="submit" disabled={isLoading}>Login</button>
        </form>
        <h4 className='no-account'>Don't have an account?</h4>
        <button className="loginregisterButton">
          <Link className='link' to="/register">Register</Link>
        </button>
    </div>
  )
}
