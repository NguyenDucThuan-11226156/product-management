const Product = require("../../models/product.model");
const filterStateHelper = require("../../helpers/filter-state.helper");
const paginationHelper = require("../../helpers/pagination.helper");
const systemConfig = require("../../config/system");
const ProductCategory = require("../../models/product-category.model");
const createTreeHelper = require("../../helpers/create-tree.helper");
module.exports.index = async (req, res) => {
  try {
    const filterState = filterStateHelper(req.query);
    const find = {
      deleted: false,
    };
    if (req.query.status) {
      find.status = req.query.status;
    }
    //search
    if (req.query.keyword) {
      const regex = new RegExp(req.query.keyword, "i");
      find.title = regex;
    }
    //end search
    // Pagination
    const countPagination = await Product.countDocuments(find);
    const objectPagination = paginationHelper(4, req.query, countPagination);
    // End Pagination
    // Sort
    const sort = {};
    if (req.query.sortKey && req.query.sortValue) {
      sort[req.query.sortKey] = req.query.sortValue;
    } else {
      sort["position"] = "desc";
    }
    // End Sort
    const products = await Product.find(find)
      .sort(sort)
      .limit(objectPagination.limitItems)
      .skip(objectPagination.skip);
    res.render("admin/pages/products/index", {
      pageTitle: "Danh sách sản phẩm",
      products: products,
      filterState: filterState,
      keyword: req.keyword,
      pagination: objectPagination,
    });
  } catch (error) {
    console.log(error);
    res.redirect(`/${systemConfig.prefixAdmin}/products`);
  }
};
module.exports.changeStatus = async (req, res) => {
  const id = req.params.id;
  const status = req.params.status;
  await Product.updateOne(
    {
      _id: id,
    },
    {
      status: status,
    }
  );
  req.flash("success", "Cập nhật trạng thái thành công");
  res.redirect("back");
};
module.exports.changeMulti = async (req, res) => {
  const type = req.body.type;
  const ids = req.body.ids.split(", ");
  switch (type) {
    case "active":
    case "inactive":
      await Product.updateMany(
        {
          _id: { $in: ids },
        },
        {
          status: type,
        }
      );
      break;
    case "delete-all":
      await Product.updateMany(
        {
          _id: { $in: ids },
        },
        {
          deleted: true,
          deletedAt: new Date(),
        }
      );
      break;
    case "change-position":
      for (const item of ids) {
        let [id, position] = item.split("-");
        position = parseInt(position);

        await Product.updateOne(
          {
            _id: id,
          },
          {
            position: position,
          }
        );
      }
      break;
    default:
      break;
  }
  req.flash("success", "Cập nhật trạng thái thành công");
  res.redirect("back");
};
module.exports.deleteItem = async (req, res) => {
  const id = req.params.id;
  await Product.updateOne(
    {
      _id: id,
    },
    {
      deleted: true,
      deletedAt: new Date(),
    }
  );

  req.flash("success", "Đã xóa sản phẩm thành công!");
  res.redirect("back");
};
// [GET] /admin/products/create
module.exports.create = async (req, res) => {
  const records = await ProductCategory.find({
    deleted: false,
  });
  const newRecords = createTreeHelper(records);
  res.render("admin/pages/products/create", {
    pageTitle: "Thêm mới sản phẩm",
    records: newRecords,
  });
};
module.exports.createPost = async (req, res) => {
  req.body.price = parseInt(req.body.price);
  req.body.discountPercentage = parseInt(req.body.discountPercentage);
  req.body.stock = parseInt(req.body.stock);
  if (req.body.position == "") {
    const countProducts = await Product.countDocuments();
    req.body.position = countProducts + 1;
  } else {
    req.body.position = parseInt(req.body.position);
  }
  console.log(req.body);

  const product = new Product(req.body);
  await product.save();

  req.flash("success", "Thêm mới sản phẩm thành công!");

  res.redirect(`/${systemConfig.prefixAdmin}/products`);
};
module.exports.edit = async (req, res) => {
  try {
    const id = req.params.id;

    const product = await Product.findOne({
      _id: id,
      deleted: false,
    });
    const records = await ProductCategory.find({
      deleted: false,
    });

    const newRecords = createTreeHelper(records);
    res.render("admin/pages/products/edit", {
      pageTitle: "Chỉnh sửa sản phẩm",
      product: product,
      records: newRecords,
    });
  } catch (error) {
    res.redirect(`/${systemConfig.prefixAdmin}/products`);
  }
};
module.exports.editPatch = async (req, res) => {
  try {
    const id = req.params.id;
    req.body.price = parseInt(req.body.price);
    req.body.discountPercentage = parseInt(req.body.discountPercentage);
    req.body.stock = parseInt(req.body.stock);
    req.body.position = parseInt(req.body.position);

    if (req.file && req.file.filename) {
      req.body.thumbnail = `/uploads/${req.file.filename}`;
    }

    await Product.updateOne(
      {
        _id: id,
        deleted: false,
      },
      req.body
    );

    req.flash("success", "Cập nhật sản phẩm thành công!");

    res.redirect("back");
  } catch (error) {
    res.redirect(`/${systemConfig.prefixAdmin}/products`);
  }
};

// [GET] /admin/products/detail/:id
module.exports.detail = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findOne({
      _id: id,
      deleted: false,
    });
    res.render("admin/pages/products/detail", {
      pageTitle: "Chi tiết sản phẩm",
      product: product,
    });
  } catch (error) {
    res.redirect(`/${systemConfig.prefixAdmin}/products`);
  }
};
