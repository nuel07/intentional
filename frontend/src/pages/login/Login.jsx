import './login.css'
//import e from 'express'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import Spinner from '../../components/Spinner'
import { useRef } from 'react'
import { Context } from '../../context/Context'
import axios from 'axios'

export default function Login() {
    const userRef = useRef();
    const passwordRef = useRef();
    const { dispatch, isFetching} = useContext(Context)

    const handleSubmit = async (e) => {
        e.preventDefault()
        dispatch({type:"LOGIN_START"})
        try {
            const res = await axios.post("/api/users/auth/login", {
                username: userRef.current.value,
                password: passwordRef.current.value,
            })
            dispatch({type:"LOGIN_SUCCESS", payload:res.data});
            res.data && window.location.replace("/posts");
        } catch (error) {
            dispatch({type:"LOGIN_FAILURE"});
        }
    }
    if(isFetching){
        return <Spinner />
    }
  return (
    <div className='login'>
        <span className="loginTitle">Login</span>
        <form className="loginForm" onSubmit={handleSubmit}>
            <label >Username</label>
            <input className='loginInput' type="text"
            placeholder='Enter your username....'
            ref={userRef}
            />
            <label >Password</label>
            <input className='loginInput' type="password"
            placeholder='Enter your password...'
            ref={passwordRef}
            />
            <button className="loginButton" type="submit" onClick={handleSubmit} disabled={isFetching}>Login</button>
        </form>
        <h4 className='no-account'>Don't have an account?</h4>
        <button className="loginregisterButton">
          <Link className='link' to="/register">Register</Link>
        </button>
    </div>
  )
}
