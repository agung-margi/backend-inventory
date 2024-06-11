const router = require("express").Router();
const authMiddleware = require("../middlewares/authenticationMiddleware");
const { isAdmin } = require("../middlewares/authorizationMiddleware");
const {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");


router.get("/product", authMiddleware, getProducts);
router.post("/product", authMiddleware, isAdmin, createProduct);
router.put("/product/:id", authMiddleware, isAdmin, updateProduct);
router.delete("/product/:id", authMiddleware, isAdmin, deleteProduct);

module.exports = router