// [GET] /products/
module.exports.index = (req, res) => {
  res.render("client/pages/products/index");
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
