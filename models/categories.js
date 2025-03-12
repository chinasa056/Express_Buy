const { required } = require("joi")
const mongoose = require("mongoose")

const categoriesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },

    productIds : [{
        type: String,
    }]
}, {timestamps: true})

const categoriesModel = mongoose.model("Categories", categoriesSchema)

module.exports = categoriesModel