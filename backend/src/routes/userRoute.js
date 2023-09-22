const express = require('express');
const {
  registerUser,
  loginUser,
  logoutUser,
  getUserInfo,
  updateUserProfile,
  forgotPassword,
  changePassword,
  updatePassword,
} = require("../controllers/userController");
const router = express.Router();
const { newUserValidation } = require('../middlewares/userValidate');
const {isAuthenticatedUser} = require('../middlewares/auth');

//use api/v1

router.post('/registerUser', newUserValidation, registerUser);
router.post('/loginUser', loginUser);//only active users can login
router.post('/logoutUser', logoutUser);
//check if user is authenticated first
router.get('/me', isAuthenticatedUser, getUserInfo);
router.put('/updateUser', isAuthenticatedUser, updateUserProfile);
router.post('/forgotPassword', forgotPassword);//only active users can request for a url on password forgot
router.put('/passwordReset/:resetToken', changePassword);
router.put('/updatePassword', isAuthenticatedUser, updatePassword);

module.exports = router;