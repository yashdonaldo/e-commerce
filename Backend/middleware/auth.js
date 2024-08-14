const ErrorHandle = require("../utilis/errorHandaling");
const catchAsyncErrors = require("./catchAsyncError")
const jwt = require("jsonwebtoken")
const User = require("../Modals/UserModal")

exports.isAuthenticateUser = catchAsyncErrors(async (req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
        return next(new ErrorHandle("Please first login to access resource", 401))
    }

    const decodeData = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decodeData.id)

    next()
})

exports.authorizeRoles = (...roles) => {
    return (req, res, next) => {
        // console.log(req.user.name)
        if (!roles.includes(req.user.role)) {
            return next(
                new ErrorHandle(`Role: ${req.user.role} is not allow to access this resource`, 403)

            )

        }
        next()
    }
}
