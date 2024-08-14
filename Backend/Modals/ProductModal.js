const mongoose = require("mongoose")

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter Product Name"],
        trim: true
    },
    description: {
        type: String,
        required: [true, "Please Enter Product Description"]
    },
    Price: {
        type: Number,
        required: [true, "Please Enter Product Price"],
        maxLength: [8, "Price Cannot be greater than 8 character"]
    },
    MRPRate: {
        type: Number,
        required: [true, "Please Enter MRP Price"],
        maxLength: [8, "Price Should not be greater than 8 Character"]
    },
    ratings: {
        type: Number,
        default: 0
    },
    images: [
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            }
        }
    ],
    category:{
        type: String,
        required: [true, "Please Enter Product Category"]
    },
    Stock : {
        type: Number,
        required:[true, "Please Enter Product Stock"],
        maxLength: [4, "Stock Cant exceed 4 characters"],
        default: 1
    },
    numOfReviews: {
        type: Number,
        default: 0
    },
    reviews: [
        {
            name: {
                type:String,
                required: true
            },
            user: {
                type: mongoose.Schema.ObjectId,
                ref:"User",
                required: true
            },
            rating:{
                type:Number,
                required : true
            },
            comment: {
                type: String,
                required: [true, "Please Enter Your Thoughts"]
            }
        }
    ],
    createdAt:{
        type: Date,
        default: Date.now
    }

})


module.exports = mongoose.model("product", ProductSchema)