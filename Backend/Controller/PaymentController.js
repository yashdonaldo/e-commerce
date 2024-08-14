const Razorpay = require('razorpay');
const catchAsyncError = require("../middleware/catchAsyncError");
const { validatePaymentVerification } = require('razorpay/dist/utils/razorpay-utils');
const { isAuthenticateUser } = require("../middleware/auth");
const Payment  = require('../Modals/PaymentModal');

const instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_SECRET_KEY
})

exports.processPayment = catchAsyncError(async (req, res) => {
    try {
        const order = {
            amount: req.body.amount * 100,
            currency: "INR",
        };
        const myOrder = await instance.orders.create(order);

        res.status(200).json({
            success: true,
            myOrder,
        });
    } catch (error) {
        console.log(error)
    }
});

exports.paymentVarification = catchAsyncError(async (req, res) => {
    const {razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body
    const verify = validatePaymentVerification({ "order_id": razorpay_order_id, "payment_id": razorpay_payment_id }, razorpay_signature, process.env.RAZORPAY_SECRET_KEY);
    if(verify && isAuthenticateUser){
        await Payment.create({
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature
        })
        res.status(200).json({success: true, status: "succsss"})
    }else{
        res.status(400).json({
            success: false
        })
    }
})