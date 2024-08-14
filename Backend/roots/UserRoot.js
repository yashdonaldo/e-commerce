const express = require("express");
const {registerUser, loginUser, logoutUser, forgotPassword, resetPassword, getUserDetails, updateUserPassword, updateUserProfile, getSingleUserDetailAdmin, getAllUser, updateUserRole, deleteUser, newOrder} = require("../Controller/UserController");
const { isAuthenticateUser, authorizeRoles } = require("../middleware/auth");
const router = express.Router();

router.route("/register").post(registerUser);

router.route("/login").post(loginUser)

router.route("/logout").get(logoutUser)

router.route("/password/forgot").post(forgotPassword)
router.route("/password/reset/:token").put(resetPassword)

router.route("/me").get(isAuthenticateUser, getUserDetails)
router.route("/password/update").put(isAuthenticateUser, updateUserPassword)
router.route("/me/update").put(isAuthenticateUser, updateUserProfile)
router.route("/admin/users").get(isAuthenticateUser, authorizeRoles("admin"), getAllUser);
router.route("/admin/users/:id").get(isAuthenticateUser, authorizeRoles("admin"), getSingleUserDetailAdmin).put(isAuthenticateUser, authorizeRoles("admin"), updateUserRole).delete(isAuthenticateUser, authorizeRoles("admin"), deleteUser)

module.exports = router;