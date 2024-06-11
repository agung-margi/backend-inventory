const route = require("express").Router();
const authMiddleware = require("../middlewares/authenticationMiddleware");
const { isAdmin } = require("../middlewares/authorizationMiddleware");
const {
  getAllTransaction,
  getDetailsTransaction,
  createTransaction,
  updateTransaction,
  deleteTransaction
} = require("../controllers/transactionController");


route.get("/transaction", authMiddleware, getAllTransaction);
route.get("/transaction/:id", authMiddleware, isAdmin, getDetailsTransaction);
route.post("/transaction", authMiddleware, isAdmin, createTransaction);
route.put("/transaction/:id", authMiddleware, isAdmin, updateTransaction);
route.delete("/transaction/:id", authMiddleware, isAdmin, deleteTransaction);

module.exports = route;