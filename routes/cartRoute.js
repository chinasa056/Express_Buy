const { addToCart, getcart, reduceProductQuantity, clearCart, deleteProductFromCart } = require("../controllers/cartController");
const { authenticate } = require("../middleware/authentication");

const router = require("express").Router()

router.post("/cart/:productId", authenticate, addToCart);

router.get("/allCart", authenticate, getcart)

router.patch("/cart/reduce/:productId", authenticate, reduceProductQuantity)

router.delete("/cart/delete/:productId", authenticate, deleteProductFromCart)

router.delete("/clearCart", authenticate, clearCart)


module.exports = router