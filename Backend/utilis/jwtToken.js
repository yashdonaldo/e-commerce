
// Creating Token And Saving in cookie
const sendToken = (user, statusCode, res)=>{
    const token = user.getJWTToken();

    // Options for Cookie
    const option = {
        httpOnly:true,
        expires:new Date(
            Date.now() + process.env.COOKIE_EXPIRE *24*60*60*3600
        )

    }
    res.status(statusCode).cookie("token", token, option).json({
        success: true,
        user,
        token
    })
}

module.exports = sendToken;