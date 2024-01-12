const express = require("express");
const dotenv = require("dotenv");
const database = require("./config/database");
const methodOverride = require("method-override");
dotenv.config();
database.connectDatabase();
const routesClient = require("./routes/client/index.route");
const routesAdmin = require("./routes/admin/index.route");
const system = require("./config/system");
const bodyParser = require("body-parser");
const flash = require("express-flash");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const app = express();
const PORT = process.env.PORT;
app.set("views", `${__dirname}/views`);
app.set("view engine", "pug");
app.use(methodOverride("_method"));
app.use(express.static(`${__dirname}/public`));
app.use(bodyParser.urlencoded({ extended: false }));
//flash
app.use(cookieParser("Dat Gi cung duoc"));
app.use(session({ cookie: { maxAge: 60000 } }));
app.use(flash());
//end flash
// app Local
app.locals.prefixAdmin = system.prefixAdmin;
//routes admin
routesAdmin(app);
//routes client
routesClient(app);

app.listen(PORT, () => {
  console.log(`App is listening at ${PORT}`);
});
