const path = require('path')
const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config();
//import cors from 'cors'
const connectDB = require('./config/db');
const authRoute = require("./routes/auth")
const userRoute = require("./routes/userRoutes")
const postRoute = require("./routes/postRoutes")
//const categoryRoute = require("./routes/categoryRoutes")
const port = process.env.PORT || 8000;
const multer = require("multer");

connectDB();
const app = express();

const storage = multer.diskStorage({
    destination:(req, file, mycallback) => {
        mycallback(null, "images")
    },
    filename:(req, file, mycallback) => {
        mycallback(null, req.body.name)
    }
})

const upload = multer({storage:storage});
app.post("/api/upload", upload.single('file'), (req, res) => {
    res.status(200).json("File uploaded")
})

//app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/images", express.static(path.join(__dirname, "/images")))

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
//app.use("/api/categories", categoryRoute);

//Serve frontend
if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, '../frontend/build')))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../', 'fronted', 'build', 'index.html'))
    })
} else {
    app.get('/', (req, res) => res.send('Go to Production environment'))
}

app.listen(port, () =>{
    console.log(`Server running on http://localhost:${port}`)
    console.log(`press CTRL+C to stop server`)
})