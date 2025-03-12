const cartModel = require("../models/cart")
const productModel = require("../models/products")
const userModel = require("../models/user")

exports.addToCart = async (req, res) => {
    try {
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
};


exports.deleteCart = async (req, res) => {
  try {
    const { productId } = req.params;
    const { action } = req.body;
    const cart = await cartModel.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    switch (action) {
      case "deleteCart":
        await cartModel.findOneAndDelete({ user: userId });
        res.status(200).json({ message: "Cart deleted successfully" });
        break;

      case "deleteProduct":
        const productIndex = cart.products.findIndex(
          (product) => product.productId.toString() === productId.toString()
        );
        if (productIndex === -1) {
          return res.status(404).json({ message: "Product not found in cart" });
        }
        cart.products.splice(productIndex, 1);
        const subTotal = cart.products.reduce(
          (accumulator, product) => accumulator + product.unitTotal,
          0
        );
        cart.grandTotal = subTotal;
        await cart.save();
        res.status(200).json({ message: "Product deleted from cart" });
        break;

      case "reduceQuantity":
        const productIndexReduce = cart.products.findIndex(
          (product) => product.productId.toString() === productId.toString()
        );
        if (productIndexReduce === -1) {
          return res.status(404).json({ message: "Product not found in cart" });
        }
        if (cart.products[productIndexReduce].quantity === 1) {
          cart.products.splice(productIndexReduce, 1);
        } else {
          cart.products[productIndexReduce].quantity -= 1;
          cart.products[productIndexReduce].unitTotal =
            cart.products[productIndexReduce].quantity * cart.products[productIndexReduce].unitPrice;
        }
        const subTotalReduce = cart.products.reduce(
          (accumulator, product) => accumulator + product.unitTotal,
          0
        );
        cart.grandTotal = subTotalReduce;
        await cart.save();
        res.status(200).json({ message: "Product quantity reduced" });
        break;

      default:
        res.status(400).json({ message: "Invalid action" });
        break;
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
