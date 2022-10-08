import './posts.css'
import Post from './Post'
import { useState } from 'react'


export default function Posts() {
  const [posts] = useState([])
  return (
    <div className='posts'>
      {posts.map((p)=>(
        <Post post={p}/>
      ))}
    </div>
  )
}
