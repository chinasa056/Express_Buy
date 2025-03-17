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
        await newCategory.save()

        res.status(201).json({
            message: "New Category Added",
            data: newCategory
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        })
        
    }
};

exports.getAllCategoryy = async (req, res) => {
  try {
    const allCategory = await categoryModel.find()

    res.status(200).json({
      message: "All Categories Available",
      data: allCategory
    })
    console.log(allCategory);
    
  } catch (error) {
    console.log(error);
        res.statu(500).json({
            message: "Internal Server Error",
            error: error.message
        })
    
  }
}

exports.deleteCategory = async (req, res) => {
    try {
      const {categoryId} = req.params;

      const category = await categoryModel.findById(categoryId);
  
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }

      await categoryModel.findByIdAndDelete(categoryId);
  
      res.status(200).json({
         message: "Category deleted successfully" 
        });

    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
  };
  
exports.getProductsByCategory = async (req, res) => {
    try {
      const categoryId = req.params.id;

      const category = await categoryModel.findById(categoryId)
      if(!category) {
        return res.status(404).json({
            message: "Category not found"
        })
      };

      const products = await productModel.find({ categoryId: categoryId });
      if(products.length === 0) {
        return res.status(404).json({
            message: "Products has not been added to this category"
        })
      };

      res.status(200).json({
        message: "All Products",
        data: products
      });

    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
  

