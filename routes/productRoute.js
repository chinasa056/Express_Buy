const { addProduct } = require("../controllers/productController.js")

const router = require("express").Router()

router.post("/product", authenticate, addProduct)


module.exports = router