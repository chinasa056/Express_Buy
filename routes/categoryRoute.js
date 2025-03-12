const { createCategory } = require("../controllers/categoryController")

const router = require("express").Router()

router.post("/category", authenticate, createCategory)

module.exports = router