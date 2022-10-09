import "./homestyle.css";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import Posts from "../../components/Posts";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from "react-router-dom";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const {search}= useLocation();

  useEffect(() =>{
    const fetchPosts = async () => {
      const res = await axios.get("/api/posts" + search)
      setPosts(res.data)
  }
  fetchPosts();
  }, [search])
  return (
    <>
     <Header />
      <div className="home">
        <Posts />
        <Sidebar />
    </div>
    </>
  )
}
