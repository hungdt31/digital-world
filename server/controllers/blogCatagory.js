const BlogCategory = require("../models/blogCategory");
const asyncHandler = require("express-async-handler");

const createCategory = asyncHandler(async (req, res) => {
    if (Object.keys(req.body).length === 0) throw new Error("Missing inputs");
    const response = await BlogCategory.create(req.body);
    return res.status(200).json({
        success: response ? true : false,
        createdCategory: response
            ? response
            : "Cannot create new product-category",
    });
});
const updateCategory = asyncHandler(async (req, res) => {
    const { bcid } = req.params;
    if (Object.keys(req.body).length === 0 || req.body.title === "")
        throw new Error("Missing inputs");
    console.log(req.body);
    const response = await BlogCategory.findByIdAndUpdate(bcid, req.body, {
        new: true,
    }).select("_id title");
    return res.status(200).json({
        success: response ? true : false,
        updatedCategory: response ? response : "Cannot update product-category",
    });
});
const deleteCategory = asyncHandler(async (req, res) => {
    const { bcid } = req.params;
    if (!bcid) throw new Error("Missing inputs");
    const response = await BlogCategory.findByIdAndDelete(bcid).select(
        "_id title"
    );
    return res.status(200).json({
        success: response ? true : false,
        deletedCategory: response ? response : "Cannot delete product-category",
    });
});
const getCategories = asyncHandler(async (req, res) => {
    const response = await BlogCategory.find().select("_id title");
    return res.status(200).json({
        success: response ? true : false,
        productCategories: response ? response : "Cannot get categories",
    });
});
module.exports = {
    createCategory,
    getCategories,
    deleteCategory,
    updateCategory,
};
