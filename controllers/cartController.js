const cartModel = require("../models/cart")
const productModel = require("../models/products")
const userModel = require("../models/user")

exports.addToCart = async (req, res) => {
    try {
        const {userId} = req.user

        const {productId} = req.params

        const user = await userModel.findById(userId)
        if(!user) {
            return res.status(404).json({
                message: "User not found"
            })
        };

        const product = await productModel.findById(productId);
        if(!product) {
            return res.status(404).json({
                message: "Product Not Found"
            })
        };

        let cart = await cartModel.findOne({user: userId})
        if(!cart) {
            cart = new cartModel({
                user: userId,
                products: [],
                grandTotal
            })
        };
        const productExist = cart.products.find((item) => item.productId.toString() === productId.toString()) 
        if(productExist) {
            productExist.quantity += 1
            productExist.unitTotal = productExist.quantity * product.price
        } else{
            const newProduct = {
                productId: productId,
                quantity: product.quantity,
                price: product.price,
                unitTotal: product.price * product.quantity,
                productName: product.name,             
            }
            cart.products.push(newProduct._id)
        }
      const subTotal =  cart.products.reduce((accumulator, product) => accumulator + product.unitTotal, 0)
        cart.grandTotal = subTotal;
        await cart.save()

        res.status(201).json({
            message: "Products added to cart",
            data: cart
        })
    } catch (error) {
        
    }
} 