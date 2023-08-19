const Blog = require("../models/blog");
const asyncHandler = require("express-async-handler");

const createNewBlog = asyncHandler(async (req, res) => {
    const { title, description, category } = req.body;
    if (!title || !description || !category) throw new Error("Missing inputs");
    const response = await Blog.create(req.body);
    return res.status(200).json({
        success: response ? true : false,
        createdBlog: response ? response : "Cannot create new blog",
    });
});
const updateBlog = asyncHandler(async (req, res) => {
    const { bid } = req.params;
    if (Object.keys(req.body).length === 0) throw new Error("Missing inputs");
    const response = await Blog.findByIdAndUpdate(bid, req.body, { new: true });
    return res.status(200).json({
        success: response ? true : false,
        updatedBlog: response ? response : "Cannot update blog",
    });
});
const getBlogs = asyncHandler(async (req, res) => {
    const response = await Blog.find();
    return res.status(200).json({
        success: response ? true : false,
        Blogs: response ? response : "Cannot get blogs",
    });
});
// LIKE
// DISLIKE
/*
Khi người dùng like một bài blog thì:
1. Check xem người dùng trước đó có dislike hay không => bỏ dislike
2. Check xem người dùng trước đó có like hay không => bỏ like / thêm like
 */
const likeBlog = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { bid } = req.body;
    if (!bid) throw new Error("Missing inputs");
    const blog = await Blog.findById(bid);
    const isLiked = blog?.likes?.find((el) => el.toString() === _id);
    var response;
    if (isLiked) {
        response = await Blog.findByIdAndUpdate(
            bid,
            { $pull: { likes: _id } },
            { new: true }
        );
    } else {
        response = await Blog.findByIdAndUpdate(
            bid,
            { $push: { likes: _id } },
            { new: true }
        );
    }
    return res.status(200).json({
        success: response ? true : false,
        rs: response,
    });
});
module.exports = {
    createNewBlog,
    updateBlog,
    getBlogs,
    likeBlog,
};
