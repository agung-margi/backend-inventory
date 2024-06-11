const router = require("express").Router();
const authMiddleware = require("../middlewares/authenticationMiddleware");
const { isAdmin } = require("../middlewares/authorizationMiddleware");
const {
  getAllCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");

router.get("/category", authMiddleware, getAllCategory);
router.post("/category", authMiddleware, isAdmin, createCategory);
router.put("/category/:id", authMiddleware, isAdmin, updateCategory);
router.delete("/category/:id", authMiddleware, isAdmin, deleteCategory);


module.exports = router;