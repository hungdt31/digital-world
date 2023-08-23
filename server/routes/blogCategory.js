const router = require("express").Router();
const ctrls = require("../controllers/blogCatagory");
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyToken");

router.post("/", [verifyAccessToken, isAdmin], ctrls.createCategory);
router.get("/", ctrls.getCategories);
router.delete("/:bcid", [verifyAccessToken, isAdmin], ctrls.deleteCategory);
router.put("/:bcid", [verifyAccessToken, isAdmin], ctrls.updateCategory);

module.exports = router;
