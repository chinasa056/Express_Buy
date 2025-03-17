const checkoutModel = require("../models/checkout")
const cartModel = require("../models/cart")
const userModel = require("../models/user")
const formattedDate = new Date().toLocaleString()

exports.checkout = async (req, res) => {
    try {
        const { userId } = req.user
        const user = await userModel.findById(userId)
        if (!user) {
            return res.status(404).json({
                message: "User Not Found"
            })
        };

        const cart = await cartModel.findOne({ user: userId })
        if (!cart) {
            return res.status(404).json({
                message: "This User does not have a cart"
            })
        };

        // IMPLEMENT PAYMENT

        const products = cart.products.map((p) => p.productId)

        const newCheckout = new checkoutModel({
            userId,
            productIds: products,
            grandTotal: cart.grandTotal,
            paymentDate: formattedDate
        })

        cart.products = [];
        cart.grandTotal = 0
        await cart.save()

        await newCheckout.save()

    } catch (error) {

    }
}