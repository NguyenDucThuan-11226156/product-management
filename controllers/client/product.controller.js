// [GET] /products/
const Product = require("../../models/product.model");
module.exports.index = async (req, res) => {
  const products = await Product.find({
    status: "active",
    deleted: false,
  });
  for (const item of products) {
    item.priceNew = item.price * (1 - item.discountPercentage / 100);
    item.priceNew = item.priceNew.toFixed(0);
  }
  res.render("client/pages/products/index", {
    pageTitle: "Danh sách sản phẩm",
    products: products,
  });
};
// [GET] /products/detail
module.exports.detail = (req, res) => {
  res.send("Trang chi tiet san pham");
};
// [GET] /products/edit
module.exports.edit = (req, res) => {
  res.render("client/pages/products/index");
};
// [GET] /products/create
module.exports.create = (req, res) => {
  res.render("client/pages/products/index");
};
