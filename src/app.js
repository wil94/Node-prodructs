const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const cors = require("cors");

app.use(cors());
const port = 4300;

// connect to Mongo
mongoose
  .connect("mongodb://127.0.0.1:27017/catalog-mongo", { useNewUrlParser: true })
  .then((db) => console.log("DB connected"))
  .catch((err) => console.error(err));

//app.set('routes', path.join(__dirname, 'routes'))

// importing routes
const indexRoutes = require("./routes/index");
const productRoutes = require("./routes/controllers/productsController");

// middlewars
app.use(morgan(`dev`));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.use("/", indexRoutes);
app.use("/v1/product", productRoutes);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
