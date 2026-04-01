const {createProductService, getAllProductsService, getProductByIdService, updateProductService, deleteProductService} = require('../services/productService');
const ApiResponse = require('../utils/ApiResponse');

// Create a new product
const createProductController = async(req, res)=>{
     const product = await createProductService(req.body);
     res.status(201).json(
        new ApiResponse(201, "Product created successfully", product)
     );
}

// Get all products
const getAllProductsController = async(req, res)=>{
    const products = await getAllProductsService();
    res.status(200).json(
        new ApiResponse(200, "Products retrieved successfully", products)
    );
}

// Get product by id
const getProductByIdController = async(req, res)=>{
    const {id} = req.params;
    const product = await getProductByIdService(id);
    res.status(200).json(
        new ApiResponse(200, "Product retrieved successfully", product)
    );
}

// update product by id
const updateProductController = async(req, res)=>{
    const {id} = req.params;
    const data = req.body;
    const updatedProduct = await updateProductService(id, data);
    res.status(200).json(
        new ApiResponse(200, "Product updated successfully", updatedProduct)
    );

}

// delete product by id
const deleteProductController = async(req, res)=>{
    const {id}= req.params;
    const deletedProduct = await deleteProductService(id);
    res.status(200).json(
        new ApiResponse(200, "Product deleted successfully", deletedProduct)
    )
}

module.exports = {
    createProductController,
    getAllProductsController,
    getProductByIdController,
    updateProductController,
    deleteProductController
}