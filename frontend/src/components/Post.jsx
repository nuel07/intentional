import './post.css'
import { Link } from 'react-router-dom'
import { useState } from 'react'

export default function Post() {
  const pics = "http://localhost:5000/images"
  const [post] = useState({})
  return (
    <div className='post'>
      {post.photo && (
        <img className='post-image' src={pics + post.photo} alt="" />
      )}
      <div className="post-info">
        <div className="post-cats">
          {post.categories.map(c=>(
            <span className="post-cat">{c.name}</span>
          ))}
        </div>
        <Link to={`api/posts/${post._id}`} className="link">
          <span className="post-title">
            {post.title}
          </span>
        </Link>
        <hr />
        <span className="postDate">{new Date(post.createdAt).toDateString()}</span>
      </div>
      <p className="post-desc">
        {post.description}
      </p>
    </div>
  )
}
