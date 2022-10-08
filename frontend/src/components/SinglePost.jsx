import { useContext, useEffect } from 'react'
import axios from 'axios'
import { useLocation } from 'react-router-dom'
import './singlepost.css'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Context } from '../context/Context'
import Spinner from './Spinner'

export default function SinglePost() {
    const location = useLocation()
    const path = location.pathname.split("/")[2];
    const [post, setPost] = useState({})
    const pics = "http://localhost:5000/images"
    const {user, isFetching} = useContext(Context)
    const [title, setTitle] = useState('')
    const [description, setDesc] = useState('')
    const [updateMode, setUpdateMode] = useState(false)

    useEffect(() => {
        const getPost = async() => {
            const res = await axios.get("/posts/" + path)
            setPost(res.data)
            setTitle(res.data.title)
            setDesc(res.data.description)
        }
        getPost();
    }, [path])

    //delete post
    const handleDelete = async() => {
        try {
            await axios.delete(`api/posts/${post._id}`,
            {data: {username:user.username}})
            window.location.replace("/")   
        } catch (error) {
            
        }
    }

    //update post
    const handleUpdate = async() => {
        try {
            await axios.put(`api/posts/${post._id}`, {
                username:user.username, 
                title, 
                description,
            })
            if(isFetching){
                return <Spinner />
            }
            //window.location.reload()
            setUpdateMode(false)
        } catch (error) {
            
        }
    }
    return (
    <div className='single-post'>
        <div className="singlePostWrapper">
            {post.photo && (
                <img src={pics + post.photo} alt="" className="singlePostImg" />
            )}
            {updateMode ? <input type='text' value={title}
            className='singlePostTitleInput'
            onChange={(e)=>setTitle(e.target.value)} autoFocus/>:
            (
                 <h1 className='singlePostTitle'>
                 {title}
                 {post.username === user?.username && (
                  <div className="singlePostEdit">
                     <i className='postIcon far fa-edit' onClick={()=>setUpdateMode(true)}></i>
                     <i className='postIcon far fa-trash-alt' onClick={handleDelete}></i>
                 </div>
                 )}
                
             </h1>
            )}
            <div className="postInfo">
                <span className='postAuthor'>Author:
                <Link to={`/?user=${post.username}`} className='link'>
                    <b>{post.username}</b>
                </Link>
                </span>
                <span className='postDate'>{new Date(post.createdAt).toDateString()}</span>
            </div>
            {updateMode ? (
            <textarea className='postdescInput' value={description}
            onChange={(e)=>setDesc(e.target.value)}/>
            ): (
            <p className="postdesc">
                {description}
            </p>
            )}
            {updateMode &&
            <button className="singlePostButton" onClick={handleUpdate}>Update</button>
            }
        </div>
    </div>
  )
}
