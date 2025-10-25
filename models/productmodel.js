const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
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
    
        producttype:{
        type: String,
        required: [true, "product type is required"]
    },

        description:{
        type: String,
        required: [true, "product type is required"]
    },

     createdAt: {
    type: Date,
    default: Date.now  // Automatically set the current date/time
  }

})


module.exports = mongoose.model("clientproductdata", productSchema)