import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { set } from "mongoose";
import postService from "./postService";

const initialState = {
    posts: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

//Create a new post
export const createPost = createAsyncThunk('posts/create', async(postData, thunkAPI) =>{
    try {
        const token = thunkAPI.getState().auth.user.token
        return await postService.createGoal(postData, token)
    } catch (error) {
        const message = (
            error.response &&
            error.response.data &&
            error.response.data.message) ||
            error.message ||
            error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

//Get user posts
export const getPosts = createAsyncThunk('posts/getAll', async(_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await postService.getPosts(token)
    } catch (error) {
        const message = (
            error.response && error.response.data &&
            error.response.data.message
        ) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

//Delete post
export const deletePost = createAsyncThunk('goals/delete', async(id, thunkAPI) =>{
    try {
        const token = thunkAPI.getState().auth.user.token
        return await postService.deletePost(id, token)
    } catch (error) {
        const message = (
            error.response &&
            error.response.data &&
            error.response.data.message) ||
            error.message ||
            error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const postSlice = createSlice({
    name: 'post',
    initialState,
    reducer: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
        // Create post cases
            .addCase(createPost.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createPost.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.posts.push(action.payload)
            })
            .addCase(createPost.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })

            //Get post cases
            .addCase(getPosts.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getPosts.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.posts = action.payload
            })
            .addCase(getPosts.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })

             // Delete post cases
             .addCase(deletePost.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deletePost.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.posts = state.posts.filter(
                    (post) => post._id !== action.payload.id)
            })
            .addCase(deletePost.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }
})

export const {reset} = postSlice.actions
export default postSlice.reducer