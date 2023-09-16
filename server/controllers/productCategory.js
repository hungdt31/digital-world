const ProductCategory = require('../models/productCategory')
const asyncHandler = require('express-async-handler')

const createCategory = asyncHandler(async(req, res)=>{
    if(Object.keys(req.body).length === 0) throw new Error('Missing inputs')
    const response = await ProductCategory.create(req.body)
    return res.status(200).json({
        success: response ? true : false,
        createdCategory: response ? response : 'Cannot create new product-category'
    })
})
const updateCategory = asyncHandler(async(req, res)=>{
    const {pcid} = req.params
    if(Object.keys(req.body).length === 0 || req.body.title === '') throw new Error('Missing inputs')
    const response = await ProductCategory.findByIdAndUpdate(pcid,req.body,{new: true}).select('_id title')
    return res.status(200).json({
        success: response ? true : false,
        updatedCategory: response ? response : 'Cannot update product-category'
    })
})
const deleteCategory = asyncHandler(async(req, res)=>{
    const {pcid} = req.params
    if(!pcid) throw new Error('Missing inputs')
    const response = await ProductCategory.findByIdAndDelete(pcid).select('_id title')
    return res.status(200).json({
        success: response ? true : false,
        deletedCategory: response ? response : 'Cannot delete product-category'
    })
})
const deleteAllCategory = asyncHandler(async(req, res)=>{
    const response = await ProductCategory.deleteMany({})
    return res.status(200).json({
        success: response ? true : false,
        deletedCategory: response ? 'Delete success' : 'Cannot delete product-category'
    })
})
const getCategories = asyncHandler(async(req, res)=>{
    const response = await ProductCategory.find()
    return res.status(200).json({
        success: response ? true : false,
        productCategories: response ? response : 'Cannot get categories'
    })
})
module.exports = {
    createCategory,
    getCategories,
    deleteCategory,
    updateCategory,
    deleteAllCategory
}