const express = require('express');
const { registerUser, loginUser, logoutUser } =require('../controllers/userController');
const router = express.Router();
const { newUserValidation } = require('../middlewares/userValidate');

router.post('/registerUser', newUserValidation, registerUser);
router.post('/loginUser', loginUser);
router.post('/logoutUser', logoutUser);


module.exports = router;