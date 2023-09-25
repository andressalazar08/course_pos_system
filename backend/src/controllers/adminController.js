const User = require('../models/User');
const { ClientError } = require('../utils/clientError');
const { catchAsyncErrors } = require('../middlewares/catchAsync');
const op = require('sequelize').Op;

const allUsers = catchAsyncErrors(async(req, res, next)=>{

    const { keyword, isActive, page, limit } = req.query;

    const whereClause={};

    if(keyword){
        whereClause.name={
            [op.like]:`%${keyword}%`
        }
    }

    if(isActive){
        whereClause.isActive=isActive
    }
    
    //console.log(whereClause);
    const offset = (page-1)*limit;

    const users = await User.findAll({
        attributes:['name', 'email', 'profile', 'imageUrl', 'isActive'],
        where:whereClause,
        limit:parseInt(limit),
        offset:offset,

    });

    return res.status(200).json({
        message:'Filtered and paginated users retrieved',
        count:users.length,
        users
    });
});

module.exports = {
    allUsers,
}