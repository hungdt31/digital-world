const router = require('express').Router()
const {verifyAccessToken, isAdmin} = require('../middlewares/verifyToken')
const ctrls = require('../controllers/blog')
const uploader = require('../config/cloudinary.config')
router.put(
    "/uploadimage/:bid",
    [verifyAccessToken, isAdmin],
    uploader.single("image"),
    ctrls.uploadimageBlog
);
router.put('/like/:bid',[verifyAccessToken],ctrls.likeBlog)
router.put('/dislike/:bid',[verifyAccessToken],ctrls.disLikeBlog)
router.post('/',[verifyAccessToken, isAdmin], ctrls.createNewBlog)
router.put('/:bid',[verifyAccessToken, isAdmin],ctrls.updateBlog)
router.get('/',ctrls.getBlogs)
router.get('/:bid',ctrls.getBlog)
router.delete('/:bid',[verifyAccessToken, isAdmin],ctrls.deleteBlog)

module.exports = router
