//import { useEffect, useState } from 'react';
import './sidebar.css'
//import axios from 'axios';
//import {Link} from 'react-router-dom';

export default function Sidebar() {
  /*const [categories, setCats] = useState([]);
  useEffect(() => {
    const getCats = async () => {
      const res = await axios.get("/")
      setCats(res.data)
    }
    getCats();
  }, []);*/
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
        <span className="sidebar-title">GET IN TOUCH</span>
        <div className="sidebarSocial">
            <a href="https://linkedin.com/promise-yehangane/" target="blank"><i className='sidebarIcon fa-brands fa-linkedin'></i></a>
            <a href="https://twitter.com/yehanganep" target="blank"><i className='sidebarIcon fab fa-twitter-square'></i></a>
            <a href="https://slack.com/yehanganep" target="blank"><i className='sidebarIcon fa-brands fa-slack'></i></a>
            <a href="https://instagram.com/n_uel07" target="blank"><i className='sidebarIcon fa-brands fa-instagram'></i></a>
        </div>
       </div>
    </div>
  )
}
