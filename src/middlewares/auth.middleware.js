const { promisify } = require('util');
const jwt = require('jsonwebtoken');

const catchAsync = require('../utils/catchAsync');
const appError = require('../utils/appError');
const User = require('../models/user.model');

exports.protect = catchAsync(async (req, res, next) => {
    let token;

    if (req.headers.authorization && 
        req.headers.authorization.startsWith('Bearer ')
    ) {
        token = req.headers.authorization.split(' ')[1]
    }

    if (!token) 
        next(new appError('You are not logged in!, please login to get access.', 401));

    const decode = await promisify(jwt.verify)(
        token,
        process.env.SECRET_JWT_SEED
    )

    const user = await User.findOne({
        where: {
            id: decode.id,
            status: 'active',
        }
    });

    if (!user) 
        next(new appError('the owner of this token it not longer available', 401));

    req.sessionUser = user;
    next();
});

exports.protectAccountOwner = catchAsync(async (req, res, next) => {
    const { user, sessionUser } = req;

    if (user.id === sessionUser.id) 
        next(new appError('You do not have permission to perfom this action!', 403));

    next()
});