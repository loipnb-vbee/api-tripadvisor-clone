require("dotenv").config(); // read env file, must above require(dotenv) to read first
require("./models");

const { PORT } = require("./configs");

var express = require("express");
var app = express();

require("./routes")(app);

app.listen(PORT, function () {
  console.log("App listen on port", PORT);
});
