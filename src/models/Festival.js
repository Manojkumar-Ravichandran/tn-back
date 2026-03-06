const mongoose = require("mongoose");

const festivalSchema = new mongoose.Schema(
{
    name: {
        type: String,
        required: true
    },

    month: {
        type: String
    },

    description: String
},
{ timestamps: true }
);

module.exports = mongoose.model("Festival", festivalSchema);