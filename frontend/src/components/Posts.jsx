import './posts.css'
import Post from './Post'
import { useContext } from 'react'
import { Context } from '../context/postsContext'
import { useEffect } from 'react'
import { useState } from 'react'


export default function Posts() {
  const [posts, setPosts] = useState();
  const getPosts = async () => {
    try {
      const res = await axios.get("/posts")
      const data = await res.data
      return data
    } catch (error) {
      res.status(500).json(error)
    }
    useEffect(() => {
      getPosts().then(data => setPosts(data.posts))
    }, [])
  }
  return (
    <>
      <div className='posts'>
      {posts.map((p)=>(
        <Post post={p}/>
      ))}
    </div>
    </>
  )
}
