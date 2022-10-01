import './write.css'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createPost } from '../../features/posts/postSlice'
import axios from 'axios'
import { useLocation } from 'react-router-dom'

export default function Write() {
  const location = useLocation()
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
  const [file, setFile] = useState(null)
  const {user} = useSelector((state) => state.auth)

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      username:user.username,
      title,
      desc,
    }
    if(file){
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename)
      data.append("file", file)
      newPost.photo = filename
      try {
        await axios.post("/upload", data)
      } catch (error) {
        
      }
    }
    try {
     const res = await axios.post("/posts", newPost)
     window.location.replace("/post" + res.data.id);
    } catch (error) {
      
    }
  }
  return (
    <div className='write'>
      {file && (
        <img className='writeImg' src={URL.createObjectURL(file)} alt="" />
      )}
      <form action="" className="writeForm" onSubmit={handleSubmit}>
        <div className="formgroup">
            <label htmlFor="fileInput">
                <i className='addImage fas fa-plus'></i>
            </label>
            <input className='imageInput' type="file" id='fileInput'
            onChange={(e)=>setFile(e.target.files[0])} />
            <input className='txtInput' type="text" placeholder='Your Title'
            autoFocus={true} onChange={(e) => setTitle(e.target.value)}/>
        </div>
        <div className="formgroup">
            <textarea placeholder='lets hear it.....' type='text'
            className='txtInput writeTxt' onChange={(e) => setDesc(e.target.value)}></textarea>
        </div>
        <button className="writeSubmit" type='submit'>Publish</button>
      </form>
    </div>
  )
}
