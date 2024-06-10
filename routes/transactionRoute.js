const route = require("express").Router();
const authMiddleware = require("../middlewares/authenticationMiddleware");
const { isAdmin } = require("../middlewares/authorizationMiddleware");
const {
  getAllTransaction,
} = require("../controllers/transactionController");


route.get("/transaction", getAllTransaction);


module.exports = route;