import './posts.css'
import Post from './Post'
import { useContext } from 'react'
import { Context } from '../context/postsContext'


export default function Posts({posts}) {
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
