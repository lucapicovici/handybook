var express  = require("express"),
    router   = express.Router(),
    passport = require("passport");

// User profile - must be put before notLoggedIn middleware
router.get("/profile", isLoggedIn, function(req, res){
    res.send("User profile page");
});

// Logout
router.get("/logout", isLoggedIn, function(req, res){
    req.logout();
    res.redirect("/");
});

// Middleware for route protection
router.use("/", notLoggedIn, function(req, res, next){
    next();
});

// Sign up
router.get("/register", function(req, res){
    res.render("user/register", {errMsg: req.flash("error")});
});

router.post("/register", passport.authenticate("local.signup", {
    failureRedirect: "/user/register",
    failureFlash: true
}), function(req, res){
    if (req.session.oldUrl) {
        var oldUrl = req.session.oldUrl;
        req.session.oldUrl = null;
        res.redirect(oldUrl);
    } else {
        res.redirect("/user/profile");
    }
});

// Login
router.get("/login", function(req, res){
    res.render("user/login", {errMsg: req.flash("error")});
});

router.post("/login", passport.authenticate("local.signin", {
    failureRedirect: "/user/login",
    failureFlash: true
}), function(req, res){
    if (req.session.oldUrl) {
        var oldUrl = req.session.oldUrl;
        req.session.oldUrl = null;
        res.redirect(oldUrl);
    } else {
        res.redirect("/user/profile");
    }
});

function isLoggedIn(req, res, next){
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/");
};

function notLoggedIn(req, res, next){
    if (!req.isAuthenticated()) {
        return next();
    }
    res.redirect("/");
};

module.exports = router;