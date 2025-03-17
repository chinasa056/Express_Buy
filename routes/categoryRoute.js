const { createCategory, deleteCategory, getProductsByCategory, getAllCategoryy } = require("../controllers/categoryController")
const { authenticate } = require("../middleware/authentication")

const router = require("express").Router()

router.post("/category", authenticate, createCategory);

router.get("/allCategories", authenticate, getAllCategoryy)

router.delete("/category/delete/:categoryId", authenticate, deleteCategory);

router.delete("/category/AllProducts/:categoryId", authenticate, getProductsByCategory);



module.exports = router