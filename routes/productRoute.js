const { addProduct, getAllProducts, getOneProduct, getProductsByCategory, deleteProduct } = require("../controllers/productController.js")
const { authenticate, adminAuth } = require("../middleware/authentication.js")

const router = require("express").Router()

const upload = require("../utils/multer.js")

router.post("/product/:categoryId", adminAuth, upload.single("productImage"),addProduct)

router.get("/allProducts", authenticate, upload.single("productImage"),getAllProducts)

router.get("/product/:productId", authenticate, upload.single("productImage"),getOneProduct);

router.delete("/product/delete/:productId/:categoryId", adminAuth,upload.single("productImage"), deleteProduct)

module.exports = router