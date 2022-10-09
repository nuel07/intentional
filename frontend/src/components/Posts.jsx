import './posts.css'
import Post from './Post'
import { useContext } from 'react'
import { Context } from '../context/postsContext'


export default function Posts() {
  const {posts} = useContext(Context)
  return (
    <>
    {posts.length > 0 ? (
      <div className='posts'>
      {posts.map((p)=>(
        <Post post={p}/>
      ))}
    </div>
    ):(<h2>No Blogs available</h2>)}
    </>
  )
}
