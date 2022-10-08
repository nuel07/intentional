const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: [true, 'Please add a username'],
        unique: true
    },
    email:{
        type: String,
        required: [true, 'Please add an email'],
        unique: true
    },
    password:{
        type: String,
        required: [true, 'Please add a password']
    },
    profilePic:{
        type: String,
        default:""
    },
    //posts: [{type: mongoose.Types.ObjectId, ref: "Post", required: true}]
},
{
    timestamps: true
}
)
module.exports = mongoose.model('User', userSchema);