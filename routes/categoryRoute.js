const router = require("express").Router();
const authMiddleware = require("../middlewares/authenticationMiddleware");
const { isAdmin } = require("../middlewares/authorizationMiddleware");
const {
  getAllCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");

router.get("/category", getAllCategory);
router.post("/category", createCategory);
router.put("/category/:id", updateCategory);
router.delete("/category/:id", deleteCategory);


module.exports = router;