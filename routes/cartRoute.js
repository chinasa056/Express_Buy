const { addToCart, updateCart } = require("../controllers/cartController");
const { authenticate } = require("../middleware/authentication");

const router = require("express").Router()

router.post("/cart/:productId", authenticate, addToCart);

router.patch("/cart/update/:productId", authenticate, updateCart)


module.exports = router