const categoryModel = require("../models/categories")

exports.createCategory = async(req, res) => {
    try {
        const {name} = req.body

        const category = await categoryModel.findOne({name: name})
        if (category) {
            return res.status(400).json({
                message: "Category already exists"
            })
        }
        const newCategory = new categoryModel({
            name
        })

        res.status(201).json({
            message: "New Category Added",
            data: newCategory
        })
    } catch (error) {
        console.log(error);
        res.statu(500).json({
            message: "Internal Server Error",
            error: error.message
        })
        
        
    }
}