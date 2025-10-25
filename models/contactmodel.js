const mongoose = require('mongoose')

const contactSchema = new mongoose.Schema({
    firstname:{
        type: String,
        required: [true, "name is required"]
    },


      email:{
        type: String,
        required: [true, "email required"]
    },

    phone:{
        type: String,
        required: [true, "phone number is required"]
    },

        message:{
        type: String,
        required: [true, "message is required"]
    },

     createdAt: {
    type: Date,
    default: Date.now  // Automatically set the current date/time
  }

})


module.exports = mongoose.model("contactdataforclient", contactSchema)