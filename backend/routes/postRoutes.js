const router = require('express').Router();
const User = require("../models/userModel");
const Post = require('../models/postModel');

//Get all posts
router.get("/", async(req, res) => {
    const username = req.query.user;
    const catName = req.query.cat;
    try {
        let posts;
        if(username){ //GET posts from specific user
            posts = await Post.find({username})
        } else if(catName){ //GET posts of specific category
            posts = await Post.find({
                categories: {
                    $in: [catName]
            }})
        } else {
            posts = await Post.find()
        }
        res.status(200).json(posts)
    } catch (error) {
        res.status(500).json(error)
    }
})
//Create new Post
router.post("/", async (req, res) =>{
    const newPost = new Post(req.body);
    try {
       const savedPost = await newPost.save();
       res.status(200).json(savedPost) 
    } catch (error) {
        res.status(500).json(error)
    }
})
//Update post info
router.put("/:id", async(req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        if(post.username === req.body.username){
            try {
                const updatedPost = await Post.findByIdAndUpdate(req.params.id, {
                    $set: req.body
                }, {new: true})
                res.status(200).json(updatedPost)
            } catch (error) {
                res.status(500).json(error)
            }
        } else{
            res.status(401).json("Update not authorized!")
        }
    } catch (error) {
        res.status(500).json(error)
    }
})

//Delete post
router.delete("/:id", async(req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        if(post.username === req.body.username){
            try {
                await post.delete();
                res.status(200).json("Post Successfully Deleted")
            } catch (error) {
                res.status(500).json(error)
            }
        } else{
            res.status(401).json("Delete not authorized!")
        }
    } catch (error) {
        res.status(500).json(error)
    }
})

//Get a specific post
router.get("/:id", async(req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json(error);
    }
})

module.exports = router;