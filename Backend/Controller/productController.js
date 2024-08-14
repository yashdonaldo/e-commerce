const Product = require("../Modals/ProductModal");
const catchAsyncError = require("../middleware/catchAsyncError");
const ApiFeatures = require("../utilis/apiFeatures");
const ErrorHandle = require("../utilis/errorHandaling");
const cloudinary = require("cloudinary");


// Create Product
exports.createProduct = catchAsyncError(async (req, res, next) => {
    let images = [];
    if (typeof req.body.images === "string") {
        images.push(req.body.images)
    } else {
        images = req.body.images;
    }
    const imagesLink = [];
    for (let i = 0; i < images.length; i++) {
        const result = await cloudinary.v2.uploader.upload(images[i], {
            folder: "products",
        });

        imagesLink.push({
            public_id: result.public_id,
            url: result.secure_url
        })

    }

    req.body.images = imagesLink

    req.body.user = req.user.id

    const product = await Product.create(req.body);

    res.status(201).json({
        sucess: true,
        product
    })
});

// Get All Products
exports.getAllProduct = catchAsyncError(async (req, res) => {
    const resultPerPage = 8;
    const productCount = await Product.countDocuments()
    const apiFeatures = new ApiFeatures(Product.find(), req.query).search().filter().pagination(resultPerPage)
    let product = await apiFeatures.query;
    let filteredProductsCount = product.length;
    // apiFeatures.pagination(resultPerPage) 
    res.status(200).json({ sucess: true, product, productCount, resultPerPage, filteredProductsCount })
})

// Get All Products {Admin}
exports.getAllAdminProduct = catchAsyncError(async (req, res) => {
    const products = await Product.find()
    res.status(200).json({ sucess: true, products })
})

// Get Product details
exports.getProductDetails = catchAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        return next(new ErrorHandle("Product not found", 404))
    }
    res.status(200).json({
        sucess: true,
        product
    })
})


// update product ---> admin
exports.updateProduct = catchAsyncError(async (req, res, next) => {
    let product = await Product.findById(req.params.id);

    let images = [];
    if (typeof req.body.images === "string") {
        images.push(req.body.images)
    } else {
        images = req.body.images;
    }

    if (images !== undefined) {
        for (let i = 0; i < product.images.length; i++) {
            await cloudinary.v2.uploader.destroy(product.images[i].public_id)
        }
    }
    const imagesLink = [];
    if (images) {
        for (let i = 0; i < images.length; i++) {
            const result = await cloudinary.v2.uploader.upload(images[i], {
                folder: "products",
            });

            imagesLink.push({
                public_id: result.public_id,
                url: result.secure_url
            })

        }
        req.body.images = imagesLink
    }

    if (!product) {
        return res.status(500).json({
            sucess: false,
            msg: "Product not found"
        })
    }
    product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true, useFindAndModify: false, msg: "Product Update Sucessfully" })
    res.status(200).json({
        sucess: true,
        product
    })
})

// Delete product ---> admin
exports.deleteProduct = catchAsyncError(async (req, res, next) => {
    const product = await Product.findByIdAndDelete(req.params.id)

    if (!product) {
        return res.status(500).json({ sucess: false, msg: "Product not found" })
    }

    // Deleteing image from clodinary
    for (let i = 0; i < product.images.length; i++) {
        await cloudinary.v2.uploader.destroy(product.images[i].public_id)
    }
    res.status(200).json({
        sucess: true,
        msg: "Product Deleted sucessfully"
    })
}
)
