const User = require('../models/User');
const { ClientError } = require('../utils/clientError');
const { catchAsyncErrors } = require('../middlewares/catchAsync');


const allUsers = catchAsyncErrors(async(req, res, next)=>{

    const users = await User.findAll({
        attributes:['name', 'email', 'profile', 'imageUrl', 'isActive']
    });

    return res.status(200).json({
        message:'All users retrieved',
        users
     });
});

module.exports = {
    allUsers,
}