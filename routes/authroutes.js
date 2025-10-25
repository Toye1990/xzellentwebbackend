const express = require('express')
const router = express.Router()
const {productfunct, contactfunct} = require('../controllers/authcontroller')


router.route('/productrequest').post(productfunct)
router.route('/contact').post(contactfunct)


module.exports = router