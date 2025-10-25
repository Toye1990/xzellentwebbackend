const Joi = require('joi')



const validateproduct = (data) =>{
  const schema = Joi.object({
    firstname: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.number().required(),
    producttype: Joi.string().required(),
    description: Joi.string().required()
  })

  return schema.validate(data, {abortEarly: false})
}



const validatecontact = (data) =>{
  const schema = Joi.object({
    firstname: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.number().required(),
    message: Joi.string().required()
  })

  return schema.validate(data, {abortEarly: false})
}

module.exports.validateproduct = validateproduct
module.exports.validatecontact = validatecontact