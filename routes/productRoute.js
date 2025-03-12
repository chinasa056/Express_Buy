const { addProduct, getAllProducts, getOneProduct, getProductsByCategory, deleteProduct } = require("../controllers/productController.js")
const { authenticate, adminAuth } = require("../middleware/authentication.js")

const router = require("express").Router()

router.post("/product", adminAuth, addProduct)

router.get("/allProducts/:productId", authenticate, getAllProducts)

router.get("/product/:productId", authenticate, getOneProduct);

router.get("/product/category/:categoryId", authenticate, getProductsByCategory);

router.delete("/delete/:productId/:categoryId", adminAuth, deleteProduct)

module.exports = router