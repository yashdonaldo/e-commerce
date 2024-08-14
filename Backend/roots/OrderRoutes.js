const express = require("express");
const { newOrder, getSingleOrder, myOrders, getAllOrders, updateOrder, deleteOrder } = require("../Controller/OrderController");
const { isAuthenticateUser, authorizeRoles } = require("../middleware/auth");
const router = express.Router()

router.route("/order/new").post(isAuthenticateUser, newOrder)
router.route("/order/:id").get(isAuthenticateUser,authorizeRoles("admin"), getSingleOrder)
router.route("/orders/me").get(isAuthenticateUser, myOrders )


router.route("/admin/orders").get(isAuthenticateUser, authorizeRoles("admin"), getAllOrders )
router.route("/admin/order/:id").put(isAuthenticateUser, authorizeRoles("admin"), updateOrder ).delete(isAuthenticateUser, authorizeRoles("admin"), deleteOrder)






module.exports = router;