const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var productSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true
    },
    slug:{
        type:String,
        required:true,
        // unique:true,
        lowercase: true
    },
    thumb:{
        type:String,
        default:"https://c.wallhere.com/photos/12/ad/1920x1080_px_camera_technology-1232375.jpg!d"
    },
    description:{
        type:Array,
        required:true
    },
    brand:{
        type:String,
        required:true
    },
    price:{
        type: Number,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    quantity:{
        type: Number,
        default: 0
    },
    sold:{
        type: Number,
        default:0
    },
    images:{
        type: Array,
        default:[
            "http://media.doisongphapluat.com/529/2019/6/24/may-tinh-bang.jpg",
            "https://cdn.mos.cms.futurecdn.net/6t8Zh249QiFmVnkQdCCtHK.jpg",
            "https://cdn.pixabay.com/photo/2017/07/02/16/56/iphone-2464968_1280.png"
        ]
    },
    color:{
        type: Array,
        default:[
            "Black",
            "White"
        ]
    },
    internal:{
        type:Array
    },
    ram:{
        type:Array
    },
    informations:{
        type:Object
    },
    ratings:[
        {
            star: {
                type: Number
            },
            postedBy: {
                type:mongoose.Types.ObjectId, 
                ref: 'User'
            },
            postedBy: {
                type:mongoose.Types.ObjectId, 
                ref: 'User'
            },
            comment:{
                type: String
            },
        }
    ],
    totalRatings:{
        type:Number,
        default:0
    }
},{
    timestamps: true
});

//Export the model
module.exports = mongoose.model('Product', productSchema);