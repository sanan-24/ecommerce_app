const {Product} = require('../models');
const product = require('../models/product');
const ApiError = require('../utils/ApiError');

// Create a new product
const createProductService = async(productData)=>{
    const product = await Product.create(productData);
    if(!product){
        throw new ApiError(500, "Failed to create product");
    }
    return product;
}

// get all products
const getAllProductsService = async()=>{
    const products = await Product.findAll();
    if(!products){
        throw new ApiError(404, "No products found");
    }
    return products;
}

// get product by id
const getProductByIdService = async(productId)=>{
    const product = await Product.findOne({
        where: {
            id: productId
        }
    });
    if(!product){
        throw new ApiError(404, "Product not found");
    }
    return product;
}

// update product by id
const updateProductService = async(productId, updateData)=>{
    const product = await Product.findOne({
        where: {
            id: productId
        }
    });
    if(!product){
        throw new ApiError(404, "Product not found");
    }
    const updatedProduct = await product.update(updateData);
    if(!updatedProduct){
        throw new ApiError(500, "Failed to update product");
    }
    return updatedProduct;
}

// delete product by id
const deleteProductService = async(productId)=>{
    const product = await Product.findOne({
        where: {
            id: productId
        }
    });
    if(!product){
        throw new ApiError(404, "Product not found");
    }
    const deleted = await product.destroy();
    if(!deleted){
        throw new ApiError(500, "Failed to delete product");
    }
    return true;
}

module.exports = {
    createProductService,
    getAllProductsService,
    getProductByIdService,
    updateProductService,
    deleteProductService
}