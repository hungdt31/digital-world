const router = require('express').Router()
const ctrls = require('../controllers/products')
const {verifyAccessToken, isAdmin} = require('../middlewares/verifyToken')

router.post('/',[verifyAccessToken, isAdmin], ctrls.createProduct)
router.get('/',ctrls.getProducts)
router.put('/:pid',[verifyAccessToken, isAdmin],ctrls.updateProducts)
router.delete('/:pid',[verifyAccessToken, isAdmin],ctrls.deleteProducts)
router.get('/:pid',ctrls.getProduct)

module.exports = router