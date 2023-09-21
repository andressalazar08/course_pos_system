const express = require('express');
const {
  registerUser,
  loginUser,
  logoutUser,
  getUserInfo,
  updateUserProfile,
  forgotPassword,
  changePassword,
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
router.put('/updateUser', isAuthenticatedUser, updateUserProfile);
router.post('/forgotPassword', forgotPassword);
router.put('/passwordReset/:resetToken', changePassword);

module.exports = router;