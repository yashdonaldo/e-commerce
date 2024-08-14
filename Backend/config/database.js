const mongoose = require("mongoose")

const ConectDatabase = async()=>{
    // mongoose.connect(process.env.DB_URI
    // ).then((data)=>{
    //     console.log(`Mongodb connected with server: ${data.connection.host}`)
    // })

    try {
        const data = await mongoose.connect(process.env.DB_URI)
        console.log(`Mongodb connected with server: ${data.connection.host}`)
        
    } catch (error) {
        console.log(error)
    }
}

module.exports = ConectDatabase
