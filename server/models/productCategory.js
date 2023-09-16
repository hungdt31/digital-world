const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var productCategorySchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true,
            index: true,
        },
        brand: {
            type: Array,
            required: true,
        },
        icon:{
            type:String
        },
        image:{
            type:String,
            default:"https://c.wallhere.com/photos/12/ad/1920x1080_px_camera_technology-1232375.jpg!d"
        }
    },
    {
        timestamps: true,
    }
);

//Export the model
module.exports = mongoose.model("ProductCategory", productCategorySchema);
