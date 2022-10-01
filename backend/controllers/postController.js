const asyncHandler = require('express-async-handler');
const Post = require('../models/postModel');
const User = require('../models/userModel');

//@desc Get posts
//@route GET /api/posts
//@access Public
const getPosts = asyncHandler(async (req, res) => {
    const username = req.query.user;
    const categoryName = req.query.cat;
    try {
        let posts;
        if(username){
            posts = await Post.find({username})
        } else if(categoryName){
            posts = await Post.find({categories:{
                $in:[categoryName]
            }})
        } else {
            posts = Post.find()
        }
        res.status(200).json(posts)
    } catch (error) {
        res.status(500).json(error);
    }
})

//@desc Get single post
//@route GET /api/posts/post
//@acess Public
const getPost = asyncHandler(async(req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json(error);
    }
})
//@desc Create posts
//@route POST /api/posts
//@access Private
const writePosts = asyncHandler(async (req, res) => {
    if(!req.body.text){
        res.status(400)
        throw new Error('Post required')
    }

    const post = await Post.create({
        title: req.body.text,
        description: req.body.text,
        username: req.user.id
    })
    res.status(200).json(post);
})

//@desc Update posts
//@route PUT /api/posts/id
//@access Private
const updatePosts = asyncHandler(async (req, res) => {
    const post = await Post.findById(req.params.id);
    if(!post){
        res.status(400)
        throw new Error('Post not found');
    }
    
    //check user
    if(!req.user) {
        res.status(401)
        throw new Error('User not found')
    }

    //Check that post belongs to logged in user
    if(post.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('Unauthorized user');
    }

    const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {new: true});
    res.status(200).json(updatedPost);
})

//@desc Delete posts
//@route DELETE /api/posts
//@access Private
const deletePosts = asyncHandler(async (req, res) => {
    const post = await Post.findById(req.params.id);
    if(!post){
        res.status(400)
        throw new Error('Post not found');
    }

    //check user
    if(!req.user){
        res.status(401)
        throw new Error('User not found')
    }

    //check that post belongs to logged in user
    if(post.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('Unauthorized user');
    }
    await post.remove();
    //const deletedPost = await Post.findByIdAndDelete(req.params.id); another option
    res.status(200).json({ id: req.params.id });
})

module.exports = {
    getPosts,
    getPost,
    writePosts,
    updatePosts,
    deletePosts
}