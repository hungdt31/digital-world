const Product = require('../models/product')
const asyncHandler = require('express-async-handler')
const slugify = require('slugify')

const createProduct = asyncHandler(async(req, res)=>{
    if(Object.keys(req.body).length === 0) throw new Error('Missing inputs')
    if(req.body && req.body.title) req.body.slug = slugify(req.body.title)
    const newProduct = await Product.create(req.body)
    return res.status(200).json({
        success: newProduct ? true : false,
        createdProduct: newProduct ? newProduct : 'Cannot create new product'
    })
})
const getProduct = asyncHandler(async(req, res) => {
    const {pid} = req.params
    const product = await Product.findById(pid)
    return res.status(200).json({
        success: product ? true : false,
        productData: product ? product : 'Cannot get product'
    })
})
// filtering, sorting & pagination
const getProducts = asyncHandler(async(req, res) => {
    const product = await Product.find()
    return res.status(200).json({
        success: product ? true : false,
        productDatas: product ? product : 'Cannot get all product'
    })
})
const updateProducts = asyncHandler(async(req, res) => {
    const {pid} = req.params
    if (req.body && req.body.title) req.body.slug = slugify(req.body.title)
    const updatedProduct = await Product.findByIdAndUpdate(pid,req.body, {new: true})
    return res.status(200).json({
        success: updatedProduct ? true : false,
        updatedProductData: updatedProduct ? updatedProduct : 'Cannot update product'
    })
})
const deleteProducts = asyncHandler(async(req, res) => {
    const {pid} = req.params
    const deletedProduct = await Product.findByIdAndDelete(pid)
    return res.status(200).json({
        success: deletedProduct ? true : false,
        deletedProductData: deletedProduct ? deletedProduct : 'Cannot delete product'
    })
})
module.exports = {
    createProduct,
    getProduct,
    getProducts,
    updateProducts,
    deleteProducts
}