var express = require("express"),
    router  = express.Router();

router.get("/", function(req, res){
    res.render("index");
});

router.get("/login", function(req, res){
    res.render("user/login");
});

router.get("/register", function(req, res){
    res.render("user/register");
});

router.get("/acp", function(req, res){
    res.render("acp/index");
});

module.exports = router;