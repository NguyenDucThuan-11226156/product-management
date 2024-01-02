const mongoose = require("mongoose");

module.exports.connectDatabase = () => {
  mongoose.connect(process.env.MONGO_URL).then(() => console.log("Connected"));
};
