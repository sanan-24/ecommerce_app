const express = require('express');
const router = express.Router();
const asyncHandler = require('../utils/asyncHandler')
const verifyToken = require('../middlewares/authMiddleware');
const {createOrderController} = require('../controllers/orderController');
const {addToCartController, removeFromCartController, updateCartItemQuantityController, getCartItemsController} = require('../controllers/cartController');

router.post('/add-to-cart', verifyToken,  asyncHandler(addToCartController));

router.post('/create-order', verifyToken, asyncHandler(createOrderController));
router.delete('/remove-from-cart', verifyToken, asyncHandler(removeFromCartController));
router.put('/update-cart-item-quantity', verifyToken, asyncHandler(updateCartItemQuantityController));
router.get('/cart-items', verifyToken, asyncHandler(getCartItemsController));




module.exports = router;