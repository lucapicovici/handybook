var express  = require("express"),
    router   = express.Router(),
    passport = require("passport");

var User = require("../models/user.js");

// User profile - must be put before notLoggedIn middleware
router.get("/profile", isLoggedIn, function(req, res){
    console.log(req.session);
    res.render("ucp/index");
});

router.get("/profile/:id", isLoggedIn, function(req, res){
    User.findById(req.params.id, function(err, user){
        if (err) {
            console.log(err);
        } else {
            res.render("ucp/index", {user: user});
        }
    })
});

// EDIT
router.get("/profile/:id/edit", isLoggedIn, function(req, res){
    User.findById(req.params.id, function(err, user){
        if (err) {
            console.log(err);
        } else {
            res.render("ucp/edit", {user: user});
        }
    })
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
        res.redirect("/");
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
        res.redirect("/");
    }
});

function isLoggedIn(req, res, next){
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/user/login");
};

function notLoggedIn(req, res, next){
    if (!req.isAuthenticated()) {
        return next();
    }
    res.redirect("/");
};

module.exports = router;