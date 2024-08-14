const mongoose = require("mongoose");
const validator = require("validator")
const bcrypt = require("bcryptjs")
const JWT = require("jsonwebtoken");
const crypto = require("crypto")

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter Your Name"],
        maxLength: [30, "Name Cannot be exceed 30 characters"],
        minLength: [4, "Name should have more than 4 characters"]
    },
    email: {
        type: String,
        required: [true, "Please Enter Your Email"],
        unique: [true, "Email is allready registerd"],
        validator: [validator.isEmail, "Please Enter a Valid Email"]
    },
    password: {
        type: String,
        required: [true, "Please Enter Your Password"],
        minLength: [8, "Password Should be greater than 8 characters"],
        select: false,
    },
    avatar: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    role:{
        type: String,
        default: "user"
    },
    createdAt:{
        type: Date,
        default: Date.now()
    },
    resetPasswordToken: String,
    resetPasswordExpired: Date,
});

UserSchema.pre("save", async function(next){

    if(!this.isModified("password")){
        next();
    }
    
    this.password = await bcrypt.hash(this.password, 10)
})

// JWT Towken
UserSchema.methods.getJWTToken = function () {
    return JWT.sign({id: this._id}, process.env.JWT_SECRET, {
        expiresIn:process.env.JWT_EXPIRE,
    })
}

// Compare Password
UserSchema.methods.comparePassword = async function (enterPassword){
    return await bcrypt.compare(enterPassword, this.password);
}

// Generating Password Reset Token
UserSchema.methods.getResetPasswordToken = function(){
    // Genarating Token
    const resetToken = crypto.randomBytes(20).toString("hex")

    // Hashing And adding resetPassword token to userSchema
    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    this.resetPasswordExpired = Date.now() + 15 * 60*1000;

    return resetToken;
}

module.exports = mongoose.model("User", UserSchema)