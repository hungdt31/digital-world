const mongoose = require('mongoose'); // Erase if already required
// Declare the Schema of the Mongo model => to create table in MongoDB
var tempUserSchema = new mongoose.Schema({
    firstname:{ // collection
        // document
        type:String,
        required:true,
    },
    lastname:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique: true,
    },
    mobile:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        default :'user',
    },
    token:{
        type:String,
        required: true
    }
},{
    timestamps: true
});

//Export the model
module.exports = mongoose.model('tempUser', tempUserSchema);