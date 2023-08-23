const router = require("express").Router();
const ctrls = require("../controllers/brand");
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyToken");

router.post("/", [verifyAccessToken, isAdmin], ctrls.createNewBrand);
router.get("/", ctrls.getBrand);
router.delete("/:bid", [verifyAccessToken, isAdmin], ctrls.deleteBrand);
router.put("/:bid", [verifyAccessToken, isAdmin], ctrls.updateBrand);

module.exports = router;
