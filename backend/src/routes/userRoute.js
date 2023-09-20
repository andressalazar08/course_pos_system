const express = require('express');
const { registerUser } =require('../controllers/userController');
const router = express.Router();
const { newUserValidation } = require('../middlewares/userValidate');

router.post('/registerUser', newUserValidation, registerUser);

module.exports = router;