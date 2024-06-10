require("dotenv").config();
const express = require("express");
const app = express();
const db = require("./config/database");
const cors = require("cors");
const path = require("path");
const errorHandler = require("./middlewares/errorHandler");
const userRoute = require("./routes/userRoute");
const categoryRoute = require("./routes/categoryRoute");
const productRoute = require("./routes/productRoute");
const transactionRoute = require("./routes/transactionRoute");


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(userRoute);
app.use(categoryRoute);
app.use(productRoute);
app.use(transactionRoute);

app.use(errorHandler);


app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});



