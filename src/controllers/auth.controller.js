const bcrypt = require('bcryptjs');

const User = require('./../models/user.model');
const appError = require('./../utils/appError');
const catchAsync = require('./../utils/catchAsync');
const generateJWT = require('./../utils/jwt');

exports.signup = catchAsync(async (req, res, next) => {
    const { name, email, password } = req.body;

    const salt = await bcrypt.genSalt(16);
    const encryptedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
        name: name.toLowerCase(),
        email: email.toLowerCase(),
        password: encryptedPassword
    })

    const token = await generateJWT(user.id);

    res.status(200).json({
        status: 'success',
        message: 'The user has been created',
        token,
        user:{
            id: user.id,
            name: user.name,
            email: user.email,
        }
    });
});

exports.login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;

    const user = await User.findOne({
        where: {
            email: email.toLowerCase(),
            status: 'active',
        }
    });

    if (!user) 
        next(new appError(`User with email ${email} not found`, 404));

    if (!(await bcrypt.compare(password, user.password)))
        next(new appError(`Incorrect email or password`, 401));
    
    const token = await generateJWT(user.id);

    res.status(200).json({
        status: 'success',
        token,
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
        }
    })
});
