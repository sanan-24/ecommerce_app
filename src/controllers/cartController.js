const {addToCartService, removeFromCartService, updateCartItemQuantityService, getCartItemsService} = require('../services/cartServices');
const ApiResponse = require('../utils/ApiResponse');

const addToCartController = async(req, res)=>{
    const {productId, quantity} = req.body;
    let userId = req.userId;
    const cartItem = await addToCartService(userId, productId, quantity);
    res.status(200).json(
        new ApiResponse(200, "Product added to cart successfully", cartItem)
    )
}

const removeFromCartController = async(req, res)=>{
    const {productId} = req.body;
    let userId = req.userId;
    await removeFromCartService(userId, productId);
    res.status(200).json(
        new ApiResponse(200, "Product removed from cart successfully")
    )
}

const updateCartItemQuantityController = async(req, res)=>{
    const {productId, quantity} = req.body;
    let userId = req.userId;
    const cartItem = await updateCartItemQuantityService(userId, productId, quantity);
    res.status(200).json(
        new ApiResponse(200, "Cart item quantity updated successfully", cartItem)
    )

}

const getCartItemsController = async(req, res)=>{
    let userId = req.userId;
    const cartItems = await getCartItemsService(userId);
    res.status(200).json(
        new ApiResponse(200, "Cart items retrieved successfully", cartItems)
    )
}

module.exports = {
    addToCartController,
    removeFromCartController,
    updateCartItemQuantityController,
    getCartItemsController
}