const catchAsyncError = require("../middleware/catchAsyncError");
const ErrorHandle = require("../utilis/errorHandaling");
const User = require("../Modals/UserModal");
const Product = require("../Modals/ProductModal");
const Order = require("../Modals/orderModal")
const sendToken = require("../utilis/jwtToken");
const sendEmail = require("../utilis/sendEmail")
const crypto = require("crypto");
const Cloudinary = require("cloudinary")

// Register a User
exports.registerUser = catchAsyncError(async (req, res, next) => {
    const myCloud = await Cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: "avatars",
        width: 150,
        crop: "scale"
    })
    const { name, email, password } = req.body;
    const user = await User.create({
        name, email, password,
        avatar: {
            public_id: myCloud.public_id,
            url: myCloud.secure_url
        }
    });

    const token = user.getJWTToken()

    sendToken(user, 201, res)
})

// Login User 
exports.loginUser = catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body;

    // checking if user has given password and emial both

    if (!email || !password) {
        return next(new ErrorHandle("Please Enter Email or password", 400));
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
        return next(new ErrorHandle("Invalid Email or Password", 401));
    }

    const isPasswordMatch = await user.comparePassword(password);

    if (!isPasswordMatch) {
        return next(new ErrorHandle("Invalid Email or Password", 401));
    }

    const token = user.getJWTToken();

    sendToken(user, 200, res)
});

// Logout User
exports.logoutUser = catchAsyncError(async (req, res, next) => {
    res.cookie("token", null, {
        httpOnly: true,
        expires: new Date(Date.now()),
    })

    res.status(200).json({
        success: true,
        message: "Logout Sucessfully"
    })
})


// Forgot Password
exports.forgotPassword = catchAsyncError(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return next(new ErrorHandle("User not found", 404))
    }

    // Get ResetPassword Token 
    const resetToken = user.getResetPasswordToken()

    await user.save({ validateBeforeSave: false });


    const resetPasswordUrl = `${process.env.FRONTEND_URL}/api/v1/password/reset/${resetToken}`

    const message = `To Forgot Your Password Click on Link :- \n\n ${resetPasswordUrl} \n\n If You Not Requested this email than, ignore it`;

    try {
        await sendEmail({
            email: user.email,
            subject: "Ecommerce Password Recovery",
            message
        })

        res.status(200).json({
            success: true,
            message: `Email Sent to ${user.email} sucessfully `
        })
    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpired = undefined;

        await user.save({ validateBeforeSave: false });
        return next(new ErrorHandle(error.message, 500))
    }

})


// Reset Password
exports.resetPassword = catchAsyncError(async (req, res, next) => {

    // Creating token hash
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex");

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpired: { $gt: Date.now() },
    })
    if (!user) {
        return next(new ErrorHandle("Reset Password token is Invalid or has been expired", 400))
    }
    if (req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHandle("Password does not match", 400))
    }

    user.password = req.body.password;

    user.resetPasswordToken = undefined;
    user.resetPasswordExpired = undefined;

    await user.save()

    sendToken(user, 200, res);

})

// Get User Detail 
exports.getUserDetails = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.user.id);

    res.status(200).json({
        success: true,
        user,
    })
})
// Update User Password 
exports.updateUserPassword = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.user.id).select("+password");

    const isPasswordMatch = await user.comparePassword(req.body.oldPassword);

    if (!isPasswordMatch) {
        return next(new ErrorHandle("Old Password is Incorrect", 401));
    }

    if (req.body.newPassword !== req.body.confirmPassword) {
        return next(new ErrorHandle("Password does not match", 401));
    }

    user.password = req.body.newPassword;

    await user.save()

    sendToken(user, 200, res)
})

// Update User Profile
exports.updateUserProfile = catchAsyncError(async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
    }
    // We Will add Cloudinary later
    if(req.body.avatar !== ""){
        const user = await User.findById(req.user.id);
        const imageId = user.avatar.public_id;

        await Cloudinary.v2.uploader.destroy(imageId);

        const myCloud = await Cloudinary.v2.uploader.upload(req.body.avatar, {
            folder: "avatars",
            width: 150,
            crop: "scale"
        })
        newUserData.avatar = {
            public_id: myCloud.public_id,
            url : myCloud.secure_url,
        }
    }



    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    })

    if (!user) {
        return next(new ErrorHandle("Please Enter Your Details"))
    }

    res.status(200).json({
        success: true,
    })
})

// Get All User(admin)
exports.getAllUser = catchAsyncError(async (req, res, next) => {
    const user = await User.find();

    res.status(200).json({
        success: true,
        user,
    })
})

// Get Single User Detail(admin)
exports.getSingleUserDetailAdmin = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        return next(new ErrorHandle(`User Not Exist with id ${req.params.id}`, 400))
    }

    res.status(200).json({
        success: true,
        user,
    })
})

// update User role (admin)
exports.updateUserRole = catchAsyncError(async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role,
    }
    const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    })

    if (!user) {
        return next(new ErrorHandle("Please Enter Your Details"))
    }

    res.status(200).json({
        success: true,
    })
})

// Delete User (admin)
exports.deleteUser = catchAsyncError(async (req, res, next) => {
    
    const user = await User.findById(req.params.id);

    if (!user) {
        return next(new ErrorHandle(`User doesn't exist with id ${req.params.id}`))
    }

    const imageId = user.avatar.public_id;

    await Cloudinary.v2.uploader.destroy(imageId);

    await user.deleteOne()

    res.status(200).json({
        success: true,
        message: "User Delete Sucessfully"
    })
})

// Create New Review or Update the review
exports.createProductReview = catchAsyncError(async (req, res, next) => {
    const { rating, comment, productId } = req.body
    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment,
    }

    const product = await Product.findById(productId);
    const isReviewed = product.reviews.find(rev => rev.user.toString() === req.user._id.toString())
    if (isReviewed) {
        product.reviews.forEach(rev => {
            if (rev.user.toString() === req.user._id.toString()) {
                rev.rating = rating,
                    rev.comment = comment
            }
        })
    } else {
        product.reviews.push(review);
        product.numOfReviews = product.reviews.length
    }

    let avg = 0;
    product.reviews.forEach((rev) => {
        avg += rev.rating
    })
    product.ratings = avg / product.reviews.length;

    await product.save({ validateBeforeSave: false });

    res.status(200).json({
        success: true,
    })
})

// Get all reviews of a product
exports.getProductReviews = catchAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.query.id);

    if (!product) {
        return next(new ErrorHandle("Product not found", 404))
    }

    res.status(200).json({
        success: true,
        reviews: product.reviews,
    })
})

// Delete Review
exports.deleteReview = catchAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.query.productId);

    if (!product) {
        return next(new ErrorHandle("Product not found", 404))
    }

    const reviews = product.reviews.filter((rev) => {
        return rev._id.toString() !== req.query.id.toString()
    })
    let avg = 0;
    reviews.forEach((rev) => {
        avg += rev.rating
    })

    let ratings = 0;
    if(reviews.length === 0){
        ratings = 0
    } else{
        ratings = avg / reviews.length;
    }

    const numOfReviews = reviews.length;

    await Product.findByIdAndUpdate(req.query.productId,
        {
            reviews,
            ratings,
            numOfReviews
        },
        {
            new: true,
            runValidators: true,
            useFindAndModify: false
        }
    )


    res.status(200).json({
        success: true
    })

})


