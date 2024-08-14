const Order = require("../Modals/orderModal")
const Product = require("../Modals/ProductModal");
const ErrorHandle = require("../utilis/errorHandaling");
const catchAsyncError = require("../middleware/catchAsyncError");

// Create New Order
exports.newOrder = catchAsyncError(async (req, res, next) => {

    const {
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
    } = req.body;

    const order = await Order.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt: Date.now(),
        user: req.user._id,
    })

    res.status(201).json({
        success: true,
        order
    })

})

// get Single Order
exports.getSingleOrder = catchAsyncError(async (req, res, next) => {
    const order = await Order.findById(req.params.id).populate("user", "name email")

    if (!order) {
        return next(new ErrorHandle("Order not found with this id", 404))
    }

    res.status(200).json({
        success: true,
        order
    })
})

// get loged in user order
exports.myOrders = catchAsyncError(async (req, res, next) => {
    const order = await Order.find({ user: req.user._id });
    if (!order) {
        return next(new ErrorHandle("Order not found with this id", 404))
    }

    res.status(200).json({
        success: true,
        order
    })
})


// Get all order ---> admin
exports.getAllOrders = catchAsyncError(async (req, res, next) => {

    const order = await Order.find();

    let totalAmount = 0;

    order.forEach(order => {
        totalAmount += order.totalPrice;
    })

    res.status(200).json({
        success: true,
        order,
        totalAmount
    })
})

// Update order Status ---> admin
exports.updateOrder = catchAsyncError(async (req, res, next) => {

    const order = await Order.findById(req.params.id);
    
    if (!order) {
        return next(new ErrorHandle("Order not found with this id", 404))
    }

    if(order.orderStatus === "Delivered"){
        return next(new ErrorHandle("You have already delivered this product", 404));

    }

    if(req.body.status === "Shipped"){
        order.orderItems.forEach(async (order)=>{
            await updateStock(order.product, order.quantity);
        })

    }

    order.orderStatus = req.body.status;
    if(req.body.status === "Delivered"){
        order.deliveredAt = Date.now();
    }

    await order.save({validateBeforeSave : false})

    res.status(200).json({
        success: true,
        order
    })
})

async function updateStock(id, quantity){
     const product = await Product.findById(id);

     product.Stock -= quantity;

     await product.save({validateBeforeSave: false})


}


// Delete Order
exports.deleteOrder = catchAsyncError(async (req, res, next) => {

    const order = await Order.findByIdAndDelete(req.params.id)

    if (!order) {
        return next(new ErrorHandle("Order not found with this id", 404))
    }

    res.status(200).json({
        success: true,
    })
})

