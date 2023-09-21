const express = require('express');
const {
  registerUser,
  loginUser,
  logoutUser,
  getUserInfo,
} = require("../controllers/userController");
const router = express.Router();
const { newUserValidation } = require('../middlewares/userValidate');
const {isAuthenticatedUser} = require('../middlewares/auth');

//use api/v1

router.post('/registerUser', newUserValidation, registerUser);
router.post('/loginUser', loginUser);
router.post('/logoutUser', logoutUser);
//check if user is authenticated first
router.get('/me', isAuthenticatedUser, getUserInfo);


module.exports = router;