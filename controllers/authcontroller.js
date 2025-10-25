const productmodel = require('../models/productmodel')
const contactmodel = require('../models/contactmodel')
const {validateproduct, validatecontact} = require('../middlewares/productverify')
const {MailSending} = require('../middlewares/email')


const productfunct = async(req, res) =>{
    try{
       const {error} = validateproduct(req.body)

       if(error){
        return res.status(400).json({error: error.details[0].message})
       }

       const emailsend = req.body.email

       const {firstname, email, phone, producttype, description} = req.body

       await productmodel.create({
        firstname,
        email,
        phone,
        producttype,
        description
       })

       
        const option ={
        email: email,
        subject: "Quick sales response",
        message: `Hello customer! Thanks for choosing us  
         \nwe have received your request, you will hear from us soon.`
       }

       await MailSending(option)


       res.status(200).json({message: "Request sent successfully, we would reach out to you shortly"})
    }catch(err){
        console.log(err)
        res.status(500).json({message: err.message, error: "error occurred" })
    }
}



const contactfunct = async(req, res) =>{
    try{
       const {error} = validatecontact(req.body)

       if(error){
        return res.status(400).json({error: error.details[0].message})
       }


        //const emailsend = req.body.email

       const {firstname, email, phone, message} = req.body

       await contactmodel.create({
        firstname,
        email,
        phone,
        message
       })

              
        const option ={
        email: email,
        subject: "Notification from xzellent",
        message: `Hello customer! Thanks for choosing us  
         \nwe have received your message, you will hear from us soon.`
       }

       await MailSending(option)

       res.status(200).json({message: "message sent successfully, we would reach out to you shortly"})
    }catch(err){
        console.log(err)
        res.status(500).json({message: err.message, error: "error occurred" })
    }
}


module.exports = {productfunct, contactfunct}