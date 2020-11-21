var express = require("express"),
    router  = express.Router();

router.get("/", function(req, res){
    res.render("index");
});

router.get("/acp", isLoggedIn, function(req, res){
    res.render("acp/index");
});

function isLoggedIn(req, res, next){
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/");
};

module.exports = router;