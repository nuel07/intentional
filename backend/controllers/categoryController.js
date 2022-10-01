const asyncHandler = require('express-async-handler');
const Category = require('../models/categoryModel');

//@desc Create categories
//@route POST /api/categories
//@access Public
const postCategory = asyncHandler(async(req, res) => {
    const newCat = new Category(req.body);
    try {
        const savedCat = await newCat.save();
        res.status(200).json(savedCat);
    } catch (error) {
        res.status(500).json(error);
    }
});

//@desc Get categories
//@route GET /api/categories
//@access Public
const getCategory = asyncHandler(async(req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json(error);
    }
})

module.exports ={
    postCategory,
    getCategory
}