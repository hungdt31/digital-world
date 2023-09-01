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
    const queries = {...req.query}
    // tách các trường đặc biệt ra khỏi query
    const excludeFields = ['limit','sort','page','fields']
    excludeFields.forEach(el => delete queries[el])
    // format lại các operators cho đúng cú pháp mongoose
    let queryString = JSON.stringify(queries)
    queryString = queryString.replace(/\b(gte|gt|lt|lte)\b/g, matchedEl => `$${matchedEl}`)
    const formatedQueries = JSON.parse(queryString)
    // console.log(formatedQueries)
    // Filtering
    if (queries?.title) formatedQueries.title = {$regex: queries.title, $options: 'i'}
    let queryCommand = Product.find(formatedQueries)
    // Sorting
    // abc,efg => [abc,efg] => abc efg
    if(req.query.sort){
        const sortBy = req.query.sort.split(',').join(' ')
        queryCommand = queryCommand.sort(sortBy)
    }
    // fields limiting
    if(req.query.fields){
        const fields = req.query.fields.split(',').join(' ')
        queryCommand = queryCommand.select(fields)
    }
    // pagination : phân trang
    // limit: số object: lấy về khi gọi 1 API
    // skip: 2
    // 1, 2, 3, 4, ... 10
    // +fwde => NaN
    // +2 => 2
    const page = req.query.page || 1
    const limit = +req.query.limit || process.env.LIMIT_PRODUCTS
    const skip = (page-1)*limit
    queryCommand.skip(skip).limit(limit)
    // excute query
    // Số lượng sản phẩm thỏa mãn điều kiện !== số lượng sản phẩm trả về 1 lần gọi API
    queryCommand.exec(async(err, response)=>{
        if(err) throw new Error(err.message)
        const counts = await Product.find(formatedQueries).countDocuments()
        return res.status(200).json({
            success: response ? true : false,
            products: response ? response : 'Cannot get products',
            counts
        })
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
const deleteManyProducts = asyncHandler(async(req, res) => {
    const deletedProducts = await Product.deleteMany({quantity: { $gte: 0 }})
    return res.status(200).json({
        success: deletedProducts ? true : false,
        deletedProductData: deletedProducts ? 'Delete success' : 'Cannot delete product'
    })
})
const ratings = asyncHandler(async(req, res)=>{
    const {_id} = req.user
    const {star, comment, pid} = req.body
    if(!star || !pid) throw new Error('Missing inputs')
    const ratingProduct = await Product.findById(pid)
    const alreadyRating = ratingProduct?.ratings?.find(el => el.postedBy.toString() === _id)
    console.log({alreadyRating})
    if(alreadyRating){
        // update star & comment
        await Product.updateOne({
            ratings: {$elemMatch: alreadyRating}
        },{
            $set: {
                "ratings.$.star":star,
                "ratings.$.comment":comment
            }
        },{
            new: true
        })
    }
    else{
        // add star & comment
        await Product.findByIdAndUpdate(pid,{
            $push:{
                ratings:{star, comment, postedBy:_id
            }}
        },{
            new: true
        })
    }
    // sum ratings
    const updatedProduct = await Product.findById(pid)
    const ratingCount = updatedProduct.ratings.length
    const sumRatings = updatedProduct.ratings.reduce((sum,el)=> sum + el.star,0)
    updatedProduct.totalRatings = Math.round(sumRatings * 10/ratingCount) /  10
    await updatedProduct.save()
    return res.status(200).json({
        status: true,
        updatedProduct
    })
})
const uploadimageProduct = asyncHandler(async(req, res)=>{
    console.log(req.files)
    const { pid } = req.params
    if (!req.files) throw new Error('Missing inputs')
    const response = await Product.findByIdAndUpdate(pid,{$push:{images: {$each: req.files.map(el => el.path)}}},{new: true}).select('-createdAt -updatedAt')
    return res.status(200).json({
        success: response ? true : false,
        rs: response ? response : 'Upload images product'
    })
})
module.exports = {
    createProduct,
    getProduct,
    getProducts,
    updateProducts,
    deleteProducts,
    ratings,
    uploadimageProduct,
    deleteManyProducts
}