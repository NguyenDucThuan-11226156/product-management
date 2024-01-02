const express = require("express");
const dotenv = require("dotenv");
const database = require("./config/database");
dotenv.config();
database.connectDatabase();
const routesClient = require("./routes/client/index.route");
const routesAdmin = require("./routes/admin/index.route");
const system = require("./config/system");
const app = express();
const PORT = process.env.PORT;
app.set("views", "./views");
app.set("view engine", "pug");
app.use(express.static("public"));
// app Local
app.locals.prefixAdmin = system.prefixAdmin;
//routes admin
routesAdmin(app);
//routes client
routesClient(app);

app.listen(PORT, () => {
  console.log(`App is listening at ${PORT}`);
});
