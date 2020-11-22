var express  = require("express"),
    router   = express.Router(),
    passport = require("passport");

var User = require("../models/user.js");

// User profile - must be put before notLoggedIn middleware
// router.get("/profile", isLoggedIn, function(req, res){
//     console.log(req.session);
//     res.render("ucp/index");
// });

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
router.get("/profile/:id/edit", isLoggedIn, checkProfileOwnership, function(req, res){
    User.findById(req.params.id, function(err, user){
        if (err) {
            console.log(err);
        } else {
            res.render("ucp/edit", {user: user});
        }
    })
});

// UPDATE (checkProfileOwnership later)
router.put("/profile/:id", isLoggedIn, checkProfileOwnership, function(req, res){
    var tempPassword = "", tempRating = 0;
    User.findById(req.params.id, function(err, user){
        if (err) {
            console.log(err);
        } else {
            tempPassword = user.password;
            tempRating = user.rating;
        }
    });
    
    setTimeout(function(){ 
        var formData = req.body.profile;
        var newProfile = {
            email: req.user.email,
            password: tempPassword,
            rating: tempRating,
            username: formData.username,
            name: formData.name,
            phone: formData.phone,
            profession: formData.profession,
            skills: formData.skills
        };
        
        User.findByIdAndUpdate(req.params.id, newProfile, function(err, user){
            if (err) {
                console.log(err);
            } else {
                res.redirect("/user/profile/" + req.user._id);
            }
        })
    }, 1500);
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

function checkProfileOwnership(req, res, next) {
    if (req.isAuthenticated()) {
		User.findById(req.params.id, function(err, user){
			if (err || !user) {
				console.log(err);
				console.log("User not found");
				res.redirect("back");
			} else {
				// Does user own this profile?
				if (req.params.id == req.user._id) {
					next();
				} else {
					console.log("You don't have permission to do that!");
					res.redirect("/");
				}
			}
		});
	} else {
		console.log("You need to be logged in to do that.");
		res.redirect("back");
	}
}

module.exports = router;