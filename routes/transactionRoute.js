const route = require("express").Router();
const authMiddleware = require("../middlewares/authenticationMiddleware");
const { isAdmin } = require("../middlewares/authorizationMiddleware");
const {
  getAllTransaction,
  getDetailsTransaction,
  createTransaction,
} = require("../controllers/transactionController");


route.get("/transaction", getAllTransaction);
route.get("/transaction/:id", getDetailsTransaction);
route.post("/transaction", createTransaction);


module.exports = route;