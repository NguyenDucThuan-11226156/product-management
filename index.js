const express = require("express");
const app = express();
const PORT = 3000;

app.set("views", "./views");
app.set("view engine", "pug");
app.get("/", (req, res) => {
  res.render("client/pages/home/index");
});

app.get("/products", (req, res) => {
  res.render("client/pages/products/index");
});
app.listen(PORT, () => {
  console.log(`App is listening at ${PORT}`);
});
