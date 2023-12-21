const routesClient = require("./routes/client/index.route");
const express = require("express");
const app = express();
const PORT = 3000;
app.set("views", "./views");
app.set("view engine", "pug");

//routes client
routesClient(app);

app.listen(PORT, () => {
  console.log(`App is listening at ${PORT}`);
});
