const Brand = require("../models/brand");
const asyncHandler = require("express-async-handler");

const createNewBrand = asyncHandler(async (req, res) => {
    if (Object.keys(req.body).length === 0) throw new Error("Missing inputs");
    const response = await Brand.create(req.body);
    return res.status(200).json({
        success: response ? true : false,
        createdBrand: response
            ? response
            : "Cannot create new brand",
    });
});
const updateBrand = asyncHandler(async (req, res) => {
    const { bid } = req.params;
    if (Object.keys(req.body).length === 0 || req.body.title === "")
        throw new Error("Missing inputs");
    const response = await Brand.findByIdAndUpdate(bid, req.body, {
        new: true,
    }).select("_id title");
    return res.status(200).json({
        success: response ? true : false,
        updatedBrand: response ? response : "Cannot update brand",
    });
});
const deleteBrand = asyncHandler(async (req, res) => {
    const { bid } = req.params;
    if (!bid) throw new Error("Missing inputs");
    const response = await Brand.findByIdAndDelete(bid).select(
        "_id title"
    );
    return res.status(200).json({
        success: response ? true : false,
        deletedBrand: response ? response : "Cannot delete brand",
    });
});
const getBrand = asyncHandler(async (req, res) => {
    const response = await Brand.find().select("_id title");
    return res.status(200).json({
        success: response ? true : false,
        Brand: response ? response : "Cannot get brand",
    });
});
module.exports = {
    getBrand,
    deleteBrand,
    updateBrand,
    createNewBrand,
};
