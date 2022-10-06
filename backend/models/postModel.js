const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    username:{
        type: String,
        required: true,
        ref: 'User'
    },
    title:{
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: [true, 'Please add a text value']
    },
    photo:{
        type: String,
        required: false
    },
    categories:{
        type: Array,
        required: false,
    }
},
{
    timestamps: true,
}
)

module.exports = mongoose.model('Post', postSchema);