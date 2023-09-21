const express = require('express');
const { registerUser, loginUser } =require('../controllers/userController');
const router = express.Router();
const { newUserValidation } = require('../middlewares/userValidate');

router.post('/registerUser', newUserValidation, registerUser);
router.post('/loginUser', loginUser);


module.exports = router;