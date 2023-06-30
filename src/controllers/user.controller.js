const catchAsync = require("../utils/catchAsync");

exports.updateUser = catchAsync(async (req, res, next) => {
    const { user } = req
    const { name, email } = req.body

    await user.update({name, email})

    res.status(200).json({
        status: 'success',
        user
    })
});

exports.deleteUser = catchAsync(async (req, res, next) => {
    const { user } = req

    await user.update({status: 'cancelled'})

    res.status(200).json({
        status: 'success',
        user
    })
});