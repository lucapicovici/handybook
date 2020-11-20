var express      = require("express"),
    mongoose     = require("mongoose"),
    passport     = require("passport"),
    bodyParser   = require("body-parser"),
    flash        = require("connect-flash"),
    validator    = require("express-validator"),
    app          = express();

var indexRoutes = require("./routes/index.js");

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

app.use("/", indexRoutes);

app.listen(process.env.PORT || 3000, () => {
    console.log("HandyBook server is now listening to port 3000.");
});