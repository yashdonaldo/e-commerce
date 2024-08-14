const nodeMailer = require("nodemailer")

const sendEmail = async(options)=>{

    const transporter = nodeMailer.createTransport({
        host: process.env.SMPT_SERVICE,
        port:process.env.SMPT_PORT,
        auth:{
            user: process.env.SMPT_MAIL,
            pass: "aqrq weia qpqo pwou"
        }
    })

    const mailOptions = {
        from: process.env.SMPT_MAIL,
        to:options.email,
        subject:options.subject,
        text:options.message
    };

    await transporter.sendMail(mailOptions);
}

module.exports = sendEmail;