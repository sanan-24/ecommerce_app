const ApiResponse = require('../utils/ApiResponse');
const {createOrderService} = require('../services/orderServices');

const createOrderController = async(req,res)=>{
    let userId = req.userId;
    const order = await createOrderService(userId);
    return res.status(201).json(new ApiResponse(201, order, "Order created successfully"));

}

module.exports = {
    createOrderController
}