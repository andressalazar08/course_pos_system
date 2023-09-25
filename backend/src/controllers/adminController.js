const User = require('../models/User');
const { ClientError } = require('../utils/clientError');
const { catchAsyncErrors } = require('../middlewares/catchAsync');
const ApiFeatures = require('../utils/apiFeatures');

const allUsers = catchAsyncErrors(async(req, res, next)=>{

    const features = new ApiFeatures(User, req.query);
    
    const users = await Promise.all([
        features.search(),
        features.filter(),

    ]);
    // const areObjectsEqual = (obj1, obj2) => obj1.email === obj2.email;

    // //console.log(searchResults[0])
    // //const concatenatedResults = new Set([...searchResults, ...filterResults]);
    // //const users = await features.query;
    // //const users = searchResults.concat(filterResults);
    // //const users = [...concatenatedResults]

    //  const users = searchResults.concat(filterResults).filter((item, index, self) =>
    //         self.findIndex((t) => areObjectsEqual(t, item)) === index
    //     );



    return res.status(200).json({
        message:'All users retrieved',
        count:users.length,
        users
    });
});

module.exports = {
    allUsers,
}