const router = require('express').Router()
const {verifyAccessToken, isAdmin} = require('../middlewares/verifyToken')
const ctrls = require('../controllers/blog')

router.put('/like',[verifyAccessToken],ctrls.likeBlog)
router.post('/',[verifyAccessToken, isAdmin], ctrls.createNewBlog)
router.put('/:bid',[verifyAccessToken, isAdmin],ctrls.updateBlog)
router.get('/',ctrls.getBlogs)

module.exports = router
