const { where } = require("sequelize");
const { Cart, CartItem, Product } = require("../models");
const ApiError = require("../utils/ApiError");

// get cart by user id

const getAndCreateCart = async (userId) => {
  let cart = await Cart.findOne({
    where: {
      userId: userId,
    },
  });
  if (!cart) {
    cart = await Cart.create({ userId: userId });
  }
  return cart;
};

// Get cart items by user id
const getCartItemsService = async (userId) => {
  const cart = await getAndCreateCart(userId);
  const cartItems = await CartItem.findAll({
    where: {
      cartId: cart.id,
    },
    include: [
      {
        model: Product,
        as: "product",
        attributes: ["id", "name", "price", "stock", "description"],
      },
    ],
  });
  return cartItems;
};


// add to cart service
const addToCartService = async (userId, productId, quantity) => {
  const cart = await getAndCreateCart(userId);
  const product = await Product.findOne({
    where: {
      id: productId,
    },
  });
  if (!product) {
    throw new ApiError(404, "Product not found");
  }
  if (quantity <= 0) {
    throw new ApiError(400, "Quantity must be greater than zero");
  }
  let cartItem = await CartItem.findOne({
    where: {
      cartId: cart.id,
      productId: productId,
    },
  });
  if (cartItem) {
    if (cartItem.quantity + quantity > product.stock) {
      throw new ApiError(400, "Quantity exceeds available stock");
    }

    cartItem.quantity += quantity;
    await cartItem.save();
  } else {
    if (quantity > product.stock) {
      throw new ApiError(400, "Quantity exceeds available stock");
    }
    cartItem = await CartItem.create({
      cartId: cart.id,
      productId: productId,
      quantity: quantity,
    });
  }

  //YAHAN INCLUDE LAGAO (IMPORTANT)
  const updatedCartItem = await CartItem.findOne({
    where: { id: cartItem.id },
    include: [
      {
        model: Product,
        as: "product",
        attributes: ["id", "name", "price", "stock", "description"],
      },
    ],
  });

  return updatedCartItem;
};

// remove from cart service
const removeFromCartService = async (userId, productId) => {
  const cart = await Cart.findOne({
    where: {
      userId: userId,
    },
  });
  if (!cart) {
    throw new ApiError(404, "Cart not found");
  }
  const cartItem = await CartItem.findOne({
    where: {
      cartId: cart.id,
      productId: productId,
    },
  });
  if (!cartItem) {
    throw new ApiError(404, "Cart item not found");
  }
  await cartItem.destroy();
};

// update cart item quantity service
const updateCartItemQuantityService = async (userId, productId, quantity) => {
  const cart = await Cart.findOne({
    where: {
      userId: userId,
    },
  });
  if (!cart) {
    throw new ApiError(404, "Cart not found");
  }
  const product = await Product.findOne({
    where: {
      id: productId,
    },
  });
  if (!product) {
    throw new ApiError(404, "Product not found");
  }
  const cartItem = await CartItem.findOne({
    where: {
      cartId: cart.id,
      productId: productId,
    },
  });
  if (!cartItem) {
    throw new ApiError(404, "Cart item not found");
  }

  if (quantity <= 0) {
    throw new ApiError(400, "Quantity must be greater than zero");
  }
  if (quantity > product.stock) {
    throw new ApiError(400, "Quantity exceeds available stock");
  }
  cartItem.quantity = quantity;
  await cartItem.save();
  //YAHAN INCLUDE LAGAO (IMPORTANT)
  const updatedCartItem = await CartItem.findOne({
    where: { id: cartItem.id },
    include: [
      {
        model: Product,
        as: "product",
        attributes: ["id", "name", "price", "stock", "description"],
      },
    ],
  });
  return updatedCartItem;
};

module.exports = {
  addToCartService,
  removeFromCartService,
  updateCartItemQuantityService,
  getCartItemsService,
};
