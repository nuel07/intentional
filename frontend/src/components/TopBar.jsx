import React, { useContext } from 'react'
import "./topBar.css"
//import {FaSignInAlt, FaUser} from 'react-icons/fa'
//import Login from '../pages/login/Login';
//import Register from '../pages/register/Register';
import Settings from '../pages/settings/Settings';
import {Link, useNavigate} from 'react-router-dom'
//import Sidebar from './Sidebar';
import { Context } from '../context/Context';

export default function TopBar() {
    const navigate = useNavigate()
    const {user, dispatch} = useContext(Context)
    const pics = "http://localhost:5000/images"

    const handleLogout = () => {
        dispatch({type: "LOGOUT"})
        navigate('/')
    }
    return (
    <div className='top'>
        <div className="topLeft">
            <a href="https://github.com/nuel07" target="blank"><i className='topIcon fa-brands fa-github'></i></a>
            <a href="https://pinterest.com/yehanganep" target="blank"><i className='topIcon fa-brands fa-pinterest'></i></a>
            <a href="https://dockerhub.com.com/nuel07" target="blank"><i className='topIcon fa-brands fa-docker'></i></a>
            <a href="https://medium.com/@yehanganep" target="blank"><i className='topIcon fa-brands fa-medium'></i></a>
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
                    <a href="https://github.com/nuel07/intentional" target="blank" className='link'>ABOUT</a>
                </li>
                )}
            </ul>
        </div>
        <div className="topRight">
            {
                user ? (
                    <ul className='topList'>
                        <Link to={<Settings />}>
                            <img className='topImg' src={pics + user.profilePic} alt="profile" />
                        </Link>
                    <li className='topList-item'>
                     <button className='btn' onClick={handleLogout}>{user && "LOGOUT"}
                        Logout
                    </button>
                    </li>
                    </ul>
                                       
                ): (
                    <ul className='topList'>
                    <li className='topList-item'>
                        <Link to={"/login"} className="link">
                           Login
                        </Link>
                    </li>
                    <li>
                        <Link to={"/register"} className="link">
                         Register
                        </Link>
                    </li>
                    </ul>
                )
            }
        </div>
    </div>
  )
}
