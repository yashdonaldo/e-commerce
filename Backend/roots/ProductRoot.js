const express = require("express");
const { getAllProduct, createProduct, updateProduct, deleteProduct, getProductDetails, getAllAdminProduct } = require("../Controller/productController");
const { isAuthenticateUser, authorizeRoles } = require("../middleware/auth");
const { createProductReview, getProductReviews, deleteReview } = require("../Controller/UserController");
const router = express.Router();

router.route("/product").get( getAllProduct);
router.route("/admin/products").get( isAuthenticateUser,authorizeRoles("admin"), getAllAdminProduct)
router.route("/admin/product/new").post(isAuthenticateUser,authorizeRoles("admin"),createProduct)
router.route("/admin/product/:id").put(isAuthenticateUser, authorizeRoles("admin"),updateProduct).delete(isAuthenticateUser, authorizeRoles("admin"),deleteProduct).get(isAuthenticateUser, authorizeRoles("admin"),getProductDetails)
router.route("/product/:id").get(getProductDetails);

router.route("/review").put(isAuthenticateUser, createProductReview);
router.route("/reviews").get(getProductReviews).delete(isAuthenticateUser,deleteReview)

module.exports = router;