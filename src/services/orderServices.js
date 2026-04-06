const {Order, OrderItem, Cart, CartItem, Product, User} = require('../models');
const ApiError = require('../utils/ApiError');

// Create order service
const createOrderService = async (userId)=>{
    const cart = await Cart.findOne({
        where: {
            userId: userId
        },
        include: [
            {
                model: CartItem,
                as: 'items',
                include: [
                    {
                        model: Product,
                        as: 'product',
                        attributes: ['id', 'name', 'price', 'stock']
                    }
                ]
            }
        ]
    });

    if(!cart || cart.items.length === 0){
        throw new ApiError(400, "Cart is empty");
    }

    const user = await User.findOne({
        where: { id: userId },
        attributes: ['id', 'username', 'email'] 
    });

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    console.log("Cart Items:", cart.items.map(item => ({
        id: item.id,
        quantity: item.quantity,
        product: {
            id: item.product.id,
            name: item.product.name,
            price: item.product.price,
            stock: item.product.stock
        }
    }))); // Enhanced log to include product details
    // Fetch the cart items with product details
    const cartItems = await CartItem.findAll({
        where: { cartId: cart.id },
        include: [
            {
                model: Product,
                as: 'product',
                attributes: ['id', 'name', 'price', 'stock'] // Include product details
            }
        ]
    });

    const totalAmount = cartItems.reduce((total, item) => {
        const itemTotal = item.quantity * item.product.price;
        console.log(`Item ID: ${item.id}, Quantity: ${item.quantity}, Price: ${item.product.price}, Item Total: ${itemTotal}`); // Debug log for each item's total
        return total + itemTotal;
    }, 0);

    console.log(`Calculated Total Amount: ${totalAmount}`); // Debug log for the total amount

    // Check if an existing order exists for the user
    let order = await Order.findOne({
        where: { userId: userId, status: 'pending' } // Assuming 'pending' indicates an active order
    });

    if (order) {
        // Update the existing order
        order.totalAmount = totalAmount;
        await order.save();
    } else {
        // Create a new order
        order = await Order.create({
            userId: userId,
            totalAmount: totalAmount
        });
    }

    return {
        order,
        user,
        cartItems // Include cart items with product details in the response
    };
}

module.exports = {
    createOrderService
}