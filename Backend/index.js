const app = require("./app")
const cloudnary = require("cloudinary")
const dotenv = require("dotenv")
const ConectDatabase = require("./config/database")
// const cors = require("cors")

// app.use(cors({
//     origin: "http://localhost:5173/"
// }))

// Handling Uncaught Exception
process.on("uncaughtException",(err)=>{
    console.log(`Error: ${err.message}`)
    console.log("Shutting down the Server due to Uncaught Exeption")
    process.exit(1)
})

dotenv.config({path:"backend/config/config.env"})

// connecting to Databse
ConectDatabase()

cloudnary.config({
    cloud_name: process.env.CLOUDNARY_NAME,
    api_key: process.env.CLOUDNARY_API_KEY,
    api_secret: process.env.CLOUDNARY_API_SECRET
})

const port = process.env.PORT || 4000

const server = app.listen(port, ()=>{
    console.log(`Server start at http://localhost:${process.env.PORT} `)
})


// Unhandled promise Rejection
process.on("unhandledRejection", err=>{
    console.log(`Error: ${err.message}`)
    console.log(`Shutting down the server due to Unhandled Promise Rejection`)

    server.close(()=>{
        process.exit(1)
    })
})