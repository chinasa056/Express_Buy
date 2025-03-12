const mongoose = require("mongoose")

const productDetailsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    size: {
        type: String,
    },
    color: {
        type: String
    },
    productImage: {
        imageUrl: {
            type: String,
            require: true
        },

        publicId: {
            type: String,
            require: true
        }
    },
    categoryId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Categories",
        require: true
    },
    categoryName: {
        type: String
    }

}, {timestamps: true})

const productModel = mongoose.model("Products", productDetailsSchema)

module.exports = productModel