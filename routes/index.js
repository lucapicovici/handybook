var express = require("express"),
    router  = express.Router();

router.get("/", function(req, res){
    res.render("index");
});

router.get("/acp", function(req, res){
    res.render("acp/index");
});

router.get("/ucp", function(req, res){
    res.render("ucp/index");
});

module.exports = router;