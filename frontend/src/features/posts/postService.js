import axios from 'axios'

const API_URL = '/api/posts'

//Create new post
const createPost = async(postData, token) =>{
    const config = {
        headers:{
            Athorization:`Bearer ${token}`
        }
    }

    const response = await axios.post(API_URL, postData, config)

    return response.data
}

//Get posts
const getPosts = async(token) =>{
    const config = {
        headers:{
            Athorization:`Bearer ${token}`
        }
    }

    const response = await axios.get(API_URL, config)

    return response.data
}

//Delete post
const deletePost = async(postId, token) =>{
    const config = {
        headers:{
            Athorization:`Bearer ${token}`
        }
    }

    const response = await axios.delete(API_URL + postId, config)

    return response.data
}

export const postService = {
    createPost,
    getPosts,
    deletePost
}

export default postService