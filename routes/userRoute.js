const router = require("express").Router();
const authMiddleware = require("../middlewares/authenticationMiddleware");
const { isAdmin, checkProfileOwnership } = require("../middlewares/authorizationMiddleware");
const { getAllUser, createUser, updateUser, deleteUser, login, logout, getUserById, getProfile } = require("../controllers/userController");


router.get("/user", authMiddleware, isAdmin, getAllUser);
router.get("/user/:id", authMiddleware, getUserById);
router.post("/user", authMiddleware, createUser);
router.put("/user/:id", authMiddleware, updateUser);
router.delete("/user/:id", authMiddleware, isAdmin, deleteUser);
router.post("/login", login);
router.post("/logout", authMiddleware, logout);
router.get("/profile/:id", authMiddleware, checkProfileOwnership, getProfile);


module.exports = router;
