const User = require('../models/User');
const { ClientError } = require('../utils/clientError');
const { catchAsyncErrors } = require('../middlewares/catchAsync');
const { ApiFeatures } = require('../utils/apiFeatures');

const allUsers = catchAsyncErrors(async(req, res, next)=>{

    const features = new ApiFeatures(User, req.query).search();

    const users = await features.query;

    return res.status(200).json({
        message:'All users retrieved',
        count:users.length,
        users
     });
});

module.exports = {
    allUsers,
}