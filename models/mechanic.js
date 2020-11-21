var mongoose = require("mongoose");

var mechanicSchema = mongoose.Schema({
    author: {
        id: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
        name: {type: String, required: true}
    },
    about: {type: String, required: true},
    hourlyRate: {type: String},
    rating: {type: Number, min: 0, max: 5},
    comments: [
        {type: mongoose.Schema.Types.ObjectId, ref: "Comment"}
    ],
    photo: [
        {src: {type: String, required: true}}
    ]
});

module.exports = mongoose.model("Mechanic", mechanicSchema);