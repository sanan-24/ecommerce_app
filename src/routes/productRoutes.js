const express = require('express');
const router = express.Router();
const asyncHandler = require('../utils/asyncHandler')
const {createProductController, getAllProductsController, getProductByIdController, updateProductController, deleteProductController} = require('../controllers/productController');

router.post('/create-product', asyncHandler(createProductController));
router.get("/get-all-products", asyncHandler(getAllProductsController));
router.get("/get-product/:id", asyncHandler(getProductByIdController));
router.put("/update-product/:id", asyncHandler(updateProductController));
router.delete("/delete-product/:id", asyncHandler(deleteProductController));




module.exports = router;