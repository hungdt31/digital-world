const Product = require("../models/product");
const ProductCategory = require("../models/productCategory");
const categoryData = require("../../data/cate_brand");
const data = require("../../data/data2.json");
const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
const convertToVND = require("../utils/convertNumber");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
});
const createCategoryFolders = async (categories) => {
    // Iterate through the categories and create subfolders within "cua-hang-dien-tu"
    for (const category of categories) {
        const folderName = `cua-hang-dien-tu/${slugify(category)}`;
        await cloudinary.api.create_folder(folderName);
    }
};

const uploadImageToCloudinary = async (imageUrl, folderName) => {
    const imageUploadResult = await cloudinary.uploader.upload(imageUrl, {
        folder: folderName, // Specify the folder path in Cloudinary
    });
    return imageUploadResult.secure_url;
};

const uploadImagesToCloudinary = async (category, imageUrls) => {
    const uploadedImageUrls = [];
    const folderName = `cua-hang-dien-tu/${slugify(category)}`;

    // Upload images to Cloudinary with the specified folder path
    for (const imageUrl of imageUrls) {
        const uploadedImageUrl = await uploadImageToCloudinary(
            imageUrl,
            folderName
        );
        uploadedImageUrls.push(uploadedImageUrl);
    }

    return uploadedImageUrls;
};

const fn = async (product) => {
    const { category, images, thumb } = product;

    // Create the product category if it doesn't exist
    await createCategoryFolders([category[1]]);

    // Upload the product thumb image to Cloudinary
    const uploadedThumb = await uploadImageToCloudinary(
        thumb,
        `cua-hang-dien-tu/${slugify(category[1])}`
    );

    // Upload product images to Cloudinary in the corresponding folder
    const uploadedImages = await uploadImagesToCloudinary(category[1], images);

    await Product.create({
        title: product?.name,
        thumb: uploadedThumb, // Store the Cloudinary image URL for the thumbnail
        slug: slugify(product?.name) + "-" + Math.round(Math.random() * 10000),
        description: product?.description,
        brand: product?.brand,
        price: convertToVND(product?.price),
        category: category[1],
        quantity: Math.round(Math.random() * 1000),
        sold: Math.round(Math.random() * 500),
        images: uploadedImages, // Store the Cloudinary image URLs for the product images
        color: product?.variants?.find((el) => el.label === "Color")?.variants,
        ram: product?.variants?.find((el) => el.label === "Ram")?.variants,
        internal: product?.variants?.find((el) => el.label === "Internal")
            ?.variants,
        capacity: product?.variants?.find((el) => el.label === "Capacity")
            ?.variants,
        size: product?.variants?.find((el) => el.label === "Size")
            ?.variants,
        informations: product?.infomations,
        totalRatings: Math.round(Math.random() * 5),
    });
};
const fn2 = async (cate) => {
    await ProductCategory.create({
        title: cate?.cate,
        brand: cate?.brand,
        icon:cate?.icon,
        image:cate?.image
    });
};
const insertProduct = asyncHandler(async (req, res) => {
    const promises = [];
    for (let product of data) promises.push(fn(product));
    await Promise.all(promises);
    return res.status(200).json("Done");
});
const insertCategory = asyncHandler(async (req, res) => {
    const promises = [];
    for (let cate of categoryData) promises.push(fn2(cate));
    await Promise.all(promises);
    return res.status(200).json("Done");
});
module.exports = {
    insertProduct,
    insertCategory,
};
