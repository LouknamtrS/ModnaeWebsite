const nodemailer = require("nodemailer");

module.exports = async(email, subject, text)=>{
    try{
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            service: 'gmail',
            port: 465,
            secure: true,
            auth: {
                user: 'capstone.modnae@gmail.com',
                pass: 'hgbtcujiapsnampi',
        },
        })
        await transporter.sendMail({
            from: 'capstone.modnae@gmail.com',
            to: email,
            subject: subject,
            text: text
        })
        console.log("Email sent Successfully",email);
    }catch(err){
        console.log("Email not send", err);
    }
}