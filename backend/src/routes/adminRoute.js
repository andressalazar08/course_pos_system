const express = require('express');
const { isAuthenticatedUser, authorizedProfile } = require('../middlewares/auth');
const { allUsers } = require('../controllers/adminController');


const router = express.Router();


//use api/v1/admin

router.get('/users', isAuthenticatedUser, authorizedProfile, allUsers);

module.exports = router;