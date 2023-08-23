const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var blogSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    numberViews:{
        type:Number,
        default: 0
    },
    isLiked:{
        type: Boolean,
        default: false
    },
    likes:[
        {
            type: mongoose.Types.ObjectId,
            ref: 'User'
        }
    ],
    dislikes:[
        {
            type: mongoose.Types.ObjectId,
            ref: 'User'
        }
    ],
    image:{
        type:String,
        default:'c:\Users\ASUS\AppData\Local\Temp\flowers-notebook-near-laptop_23-2147759307.avif'
    },
    author:{
        type:String,
        default:'Admin'
    }
},{
    timestamps: true,
    toJSON:{
        virtuals: true,
    },
    toObject:{
        virtuals: true,
    }
});

//Export the model
module.exports = mongoose.model('Blog', blogSchema);