const nodemailer = require("nodemailer");

module.exports = async(email, subject, text)=>{
    try{
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            service: 'gmail',
            port: 465,
            secure: true,
            auth: {
                user: process.env.USER,
                pass: process.env.PASSWORD_EMAIL,
        },
        })
        await transporter.sendMail({
            from: process.env.USER,
            to: email,
            subject: subject,
            text: text
        })
        console.log("Email sent Successfully",email);
    }catch(err){
        console.log("Email not send", err);
    }
}