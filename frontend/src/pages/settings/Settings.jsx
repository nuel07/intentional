import { useSelector, useDispatch } from 'react-redux'
import './settings.css'
import {toast} from 'react-toastify'
import { useLocation } from 'react-router-dom'
import { useState } from 'react'
import {update} from '../../features/auth/authSlice'
import axios from 'axios'

export default function Settings() {
  const dispatch = useDispatch()
  const [file, setFile] = useState(null)
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  //const {user} = useSelector((state) => state.auth)
  const {user, isLoading, isError, isSuccess, message} = useSelector((state) => (
    state.auth
))
  const [success, setSuccess] = useState(false)
  const pics = "http://localhost:5000/images"

  //handling update clicks
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(update(updatedUser))
    const updatedUser = {
      userId:user._id,
      username,
      email,
      password,
    }
    if(file){
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename)
      data.append("file", file)
      updatedUser.profilePic = filename
      try {
        await axios.post("/upload", data)
      } catch (error) {
        
      }
    }
    try {
      await axios.put("/users/" + user._id, updatedUser)
     //window.location.replace("/post" + res.data.id);
     setSuccess(true)
    } catch (error) {
      toast.error(message)
    }
  }
  return (
    <div className='settings'>
      <div className="settingsWrapper">
        <div className="settingsTitle">
            <span className="update">Update your account</span>
            <span className="delete">Delete your account</span>
        </div>
        <form className="settingsForm" onSubmit={handleSubmit}>
            <label>Profile Picture</label>
            <div className="settingsPP">
                <img src={file ? URL.createObjectURL(file) : pics + user.profilePic} alt="" />
                <label htmlFor="fileInput">
                    <i className=' settingsPPIcon far fa-user-circle'></i>
                </label>
                <input type="file" id='fileInput'
                style={{display:"none"}} onchange={(e)=>setFile(e.target.files[0])} />
            </div>
            <label>Username</label>
            <input type="text" placeholder={user.username}
            onChange={(e) => setUsername(e.target.value)}/>
            <label>Email</label>
            <input type="email" placeholder={user.email} onChange={(e) => setEmail(e.target.value)}/>
            <label>Password</label>
            <input type="password" placeholder='*****' onChange={(e) => setPassword(e.target.value)}/>
            <button className="settingsSubmit" type='submit'>
              Update
            </button>
            {success && <span style={{color:"green", textAlign:"center", marginTop:"20px"}}>Profile Updated Successfully!</span>}
        </form>
      </div>
    </div>
  )
}
