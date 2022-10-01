import { useEffect } from 'react';
import { useState } from 'react'
import './sidebar.css'
import { axios } from 'axios';
import { Link } from 'react-router-dom';

export default function Sidebar() {
  const [cats, setCats] = useState([]);
  useEffect(() => {
    const getCats = async () => {
      const res = await axios.get("/categories")
      setCats(res.data)
    }
    getCats();
  }, [])
  return (
    <div className='sidebar'>
       <div className="sidebar-item">
        <span className="sidebar-title">ABOUT ME</span>
        <img src="images/mugshot2.jpg" alt="" />
        <p>
        An exciting Software engineer with proven experience and dedication to 
        learning various new technologies and taking on challenges through software development
        </p>
       </div>
       <div className="sidebar-item">
        <span className="sidebar-title">CATEGORIES</span>
        <ul className="sidebar-list">
          {cats.map(c=>(
            <Link to={`/?cat=${c.name}`}className='link'>
               <li className="sidebar-listItem">{c.name}</li>
            </Link>
          ))}
        </ul>
       </div>
       <div className="sidebar-item">
        <span className="sidebar-title">GET IN TOUCH</span>
        <div className="sidebarSocial">
            <i className='sidebarIcon fab fa-facebook-square'></i>
            <i className='sidebarIcon fab fa-twitter-square'></i>
            <i className='sidebarIcon fab fa-pinterest-square'></i>
            <i className='sidebarIcon fab fa-instagram-square'></i>
        </div>
       </div>
    </div>
  )
}
