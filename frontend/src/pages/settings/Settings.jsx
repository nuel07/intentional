import './settings.css'
//import { useLocation } from 'react-router-dom'
import { useContext, useState } from 'react'
import axios from 'axios'
import { Context } from '../../context/Context'
import Spinner from '../../components/Spinner'

export default function Settings() {
  //user info
  const [file, setFile] = useState()
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  //context info
  const { user, dispatch, isFetching } = useContext(Context)
  const [success, setSuccess] = useState(false)
  const pics = "http://localhost:5000/images"

  const handleDelete = async() => {
    try {
        await axios.delete(`/users/${user._id}`,
        {data: {username:user.username}})
        window.location.replace("/")   
    } catch (error) {
        
    }
}

  //handling update clicks
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({type: "UPDATE_START"})
    const updatedUser = {
      userId:user._id,
      username,
      email,
      password,
      photo
    }
    if(file){
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename)
      data.append("file", file)
      updatedUser.profilePic = filename
      try {
        await axios.post("/upload", data)
        if(isFetching){
          return <Spinner/>
        }
      } catch (error) {
        
      }
    }
    try {
      const res = await axios.put("/api/users/" + user._id, updatedUser)
     //window.location.replace("/post" + res.data.id);
     setSuccess(true)
     dispatch({type: "UPDATE_SUCCESS", payload: res.data})
    } catch (error) {
      dispatch({type: "UPDATE_FAILURE"})
    }
  }
  return (
  <>
    <div className='settings'>
      <div className="settingsWrapper">
        <div className="settingsTitle">
            <span className="update">Update your account</span>
            <button className="deletebutton" onClick={handleDelete}>Deactivate</button>
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
    </>
  )
}
