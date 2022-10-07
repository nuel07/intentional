import './register.css'
//import e from 'express'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useContext } from 'react'
import { Context } from '../../context/Context'
import validator from 'validator'
//import { useLocation } from 'react-router-dom'


export default function Register() {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(false)
  const { dispatch } = useContext(Context)
  //const location = useLocation()

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "REGISTER_START"})
    setError(false)
    try {
      const res = await axios.post("/auth/register", {
        username,
        email,
        password
      });
      if(validator.isEmail(email)){
        setEmail('Valid Email')
      } else{
        setEmail('Enter a valid email')
      }
      dispatch({ type: "REGISTER_SUCCESS", payload: res.data })
      res.data && window.location.replace("/login");
    } catch (error) {
      dispatch({type: "REGISTER_FAILURE"})
      setError(true)
    }
  }

  return (
    <div className='register'>
       <span className="registerTitle">Sign up today</span>
        <form className="registerForm" onSubmit={handleSubmit}>
          <label >Username</label>
            <input className='registerInput' type="text" 
            placeholder='Enter your username....'
            onChange={(e)=>setUsername(e.target.value)}/>
            <label >Email</label>
            <input className='registerInput' type="email"
            placeholder='Enter your email....'
            onChange={(e)=>setEmail(e.target.value)}
            />
            <label >Password</label>
            <input className='registerInput' type="password"
            placeholder='Enter your password...'
            onChange={(e)=>setPassword(e.target.value)}/>
            <button className='registerButton' type='submit' onClick={handleSubmit}>Register</button>
        </form>
        <h4 className='have-account'>Have an account?</h4>
        <button className="registerloginButton">
          <Link className='link' to="/login">Login</Link>
        </button>
        {error && <span style={{color:"red", marginTop:"10px"}}>oops! Something went wrong!</span>}
    </div>
  );
}
