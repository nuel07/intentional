import React from 'react'
import "./topBar.css"
import {FaSignInAlt, FaSignOutAlt, FaUser} from 'react-icons/fa'
import Login from '../pages/login/Login';
import Register from '../pages/register/Register';
import Settings from '../pages/settings/Settings';
import {Link, useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {logout, reset} from '../features/auth/authSlice' 
import Sidebar from './Sidebar';

export default function TopBar() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {user} = useSelector((state) => state.auth)
    const pics = "http://localhost:5000/images"

    const onLogout = () => {
        dispatch(logout())
        dispatch(reset())
        navigate('/')
    }
    return (
    <div className='top'>
        <div className="topLeft">
            <i className='topIcon fab fa-facebook-square'></i>
            <i className='topIcon fab fa-twitter-square'></i>
            <i className='topIcon fab fa-pinterest-square'></i>
            <i className='topIcon fab fa-instagram-square'></i>
        </div>
        <div className="topCenter">
            <ul className="topList">
                <li className='topList-item'>
                    <Link to={"/"} className="link">HOME</Link>
                </li>
                {user ? (
                <li className='topList-item'>
                    <Link to={"/write"} className="link">WRITE</Link>
                </li>
                ): (
                <li className='topList-item'>
                    <Link to={<Sidebar />} className="link">ABOUT</Link>
                </li>
                )}
            </ul>
        </div>
        <div className="topRight">
            {
                user ? (
                    <ul className='topList'>
                        <Link to={"/settings"}>
                            <img className='topImg' src={pics + user.profilePic} alt="profile" />
                        </Link>
                    <li className='topList-item'>
                     <button className='btn' onClick={onLogout}>
                         <FaSignOutAlt/> Logout
                    </button>
                    </li>
                    </ul>
                                       
                ): (
                    <ul className='topList'>
                    <li className='topList-item'>
                        <Link to={<Login />} className="link">
                            <FaSignInAlt/> LOGIN
                        </Link>
                    </li>
                    <li>
                        <Link to={<Register />} className="link">
                        <FaUser/> REGISTER
                        </Link>
                    </li>
                    </ul>
                )
            }
            <i className='topSearch fas fa-search'></i>
        </div>
    </div>
  )
}
