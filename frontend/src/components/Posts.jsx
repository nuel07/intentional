import './posts.css'
import Post from './Post'
import { useContext } from 'react'
//import { useState } from 'react'
//import { Context } from '../context/postsContext'

export default function Posts({posts}) {
  //const [posts] = useState([])
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
