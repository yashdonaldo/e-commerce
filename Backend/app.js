const express = require("express")
const app = express();
const errorMiddleware = require("./middleware/error");
const cookieParser = require("cookie-parser")
const bodyParser = require("body-parser")
const fileUpload = require("express-fileupload")
const dotenv = require("dotenv")
const path = require("path")
const cors = require("cors")


app.use(cors({
    origin: "https://e-commerce-frontend-i5di.onrender.com/",
    methods: ["GET", "POST", "PUT", "DELETE"]
}))
app.use(express.json({limit: "50mb"}))
app.use(cookieParser())
app.use(express.urlencoded({extended:true, limit:"500mb", parameterLimit: 50000}))
app.use(fileUpload())

dotenv.config({path:"backend/config/config.env"})


// Route Exports
const product = require("./roots/ProductRoot");
const user = require("./roots/UserRoot");
const Order = require("./roots/OrderRoutes");
const RazorpayPayment = require("./roots/PaymentRoutes")

app.use("/api/v1", product)
app.use("/api/v1", user)
app.use("/api/v1", Order)
app.use("/api/v1", RazorpayPayment)

app.use(express.static(path.join(__dirname, "./dist")));

app.get("*", (req,res)=> {
    res.sendFile(path.resolve(__dirname, "./dist/index.html"));
})

// Middleware for error
app.use(errorMiddleware)

app.get("/api/v1/getkey",(req, res)=>{
    res.status(200).json({
        key: process.env.RAZORPAY_KEY_ID
    })
})

module.exports = app;
