var mongoose = require("mongoose"),
    bcrypt   = require("bcrypt-nodejs");

var userSchema = mongoose.Schema({
    email: {type: String, required: true},
    password: {type: String, required: true},
    rating: {type: Number},
    username: {type: String},
    name: {type: String},
    phone: {type: String},
    profession: {type: String},
    skills: {name: String}
});

userSchema.methods.encryptPassword = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null);
}

userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
}

module.exports = mongoose.model("User", userSchema);