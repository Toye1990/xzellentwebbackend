const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport(
    {
        service: "gmail",
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth:{
            user: process.env.MYEMAIL,
            pass: process.env.EMAILNEW_PASSWORD
        }
    }
)


function MailSending(option){
    const mailOptions = {
    from: "mailto-xzellent2079@gmail.com",
    to: option.email,
    subject: option.subject,
    text: option.message
    }

    transporter.sendMail(mailOptions, (error, info) =>{
    if(error){
        console.log("error sending mail", error)
    }else{
        console.log("Email sent: ", info.response)
    }
})

}


module.exports = {MailSending}