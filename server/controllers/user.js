const { generateAccessToken, generateRefreshToken } = require('../middlewares/jwt')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const sendMail = require('../utils/sendMail')
const asyncHandler = require('express-async-handler')
const register = asyncHandler(async(req, res)=>{
    const {email, password, firstname, lastname} = req.body
    if(!email || ! password || ! firstname || !lastname)
        return res.status(400).json({
            sucess: false,
            mes: 'Missing inputs'
        })
    const user = await User.findOne({email})
    if(user) 
        throw new Error('User has existed ! Try again ...')
    else{
        const newUser = await User.create(req.body)
        return res.status(200).json({
            sucess: newUser ? true : false,
            mes: newUser ? 'Register is successfully. Please go login': 'Something went wrong'
        })
    }
})
const getUsers = asyncHandler(async(req, res)=>{
    const response = await User.find().select('-refreshToken -password -role')
    return res.status(200).json({
        success: response ? true : false,
        users: response
    })
})
const deleteUser = asyncHandler(async(req, res)=>{
    const {_id} = req.query
    if(!_id) throw new Error('Missing inputs')
    // trả về dữ liệu xóa đi 
    const response = await User.findByIdAndDelete(_id)
    return res.status(200).json({
        success: response ? true : false,
        deletedUser: response ? `User with email ${response.email} deleted`: 'No user delete'
    })
})
const updateUser = asyncHandler(async(req, res)=>{
    // '' chuyển qua boolean => true
    const {_id} = req.user
    if(!_id || Object.keys(req.body).length === 0) throw new Error('Mising inputs')
    const response = await User.findByIdAndUpdate(_id, req.body,{new: true}).select('-password -role')
    return res.status(200).json({
        success: response ? true : false,
        updatedUser: response ? response :'Something went wrong'
    })
})
const updateUserByAdmin = asyncHandler(async(req, res)=>{
    const {uid} = req.params
    if(Object.keys(req.body).length === 0) throw new Error('Mising inputs')
    const response = await User.findByIdAndUpdate(uid, req.body,{new: true}).select('-password -role -refreshToken')
    return res.status(200).json({
        success: response ? true : false,
        updatedUser: response ? response :'Something went wrong'
    })
})
// RefreshToken dùng để cấp mới accessToken
// Access Token dùng để xác thực người dùng, phân quyền người dùng
const login = asyncHandler(async(req, res)=>{
    const {email, password} = req.body
    if(!email || ! password)
        return res.status(400).json({
            sucess: false,
            mes: 'Missing inputs'
        })
    const response = await User.findOne({email})
    if(response && await response.isCorrectPassword(password)){
        // tách password và role ra khỏi response
        const {password, role, refreshToken,...userData} = response.toObject()
        // tạo accessToken 
        const accessToken = generateAccessToken(response._id, role)
        // tạo refreshToken
        const newRefreshToken = generateRefreshToken(response._id)
        // Lưu refreshToken vào database 
        await User.findByIdAndUpdate(response._id, {refreshToken: newRefreshToken},{new: true})
        // lưu refreshToken vào cookie
        res.cookie('refreshToken', newRefreshToken,{httpOnly: true, maxAge: 7*24*60*60*1000})
        res.status(200).json({
            success: true,
            mess: 'Login successfully',
            accessToken,
            userData
        });
    }
    else{
        throw new Error('Invalid credentials!')
    }
})
const getCurrent = asyncHandler(async(req, res)=>{
    const {_id} = req.user
    const user = await User.findById(_id).select('-refreshToken -password ')
    return res.status(200).json({
        success: user ? true : false,
        mess: user ? user : 'User not found'
    })
})
const refreshAccessToken = asyncHandler(async(req, res)=>{
    // Lấy token từ cookies
    const cookie = req.cookies
    // check xem có token hay không
    if(!cookie && !cookie.refreshAccessToken) throw new Error('No refresh token is cookies')
    // check token có hợp lệ hay không
    const rs = await jwt.verify(cookie.refreshToken,process.env.JWT_SECRET)
    const response = await User.findOne({_id:rs._id, refreshToken: cookie.refreshToken})
        return res.status(200).json({
            success: response ? true : false,
            newAccessToken: response ? generateAccessToken(response._id, response.role):'Refresh token not matched'
        })
})
const logout = asyncHandler(async(req, res) => {
    const cookie = req.cookies
    if(!cookie || !cookie.refreshToken) throw new Error('No refresh token in cookies')
    // xóa refresh token ở db
    await User.findOneAndUpdate({refreshToken: cookie.refreshToken},{refreshToken: ''},{new: true})
    // Xóa refresh token ở cookie trình duyệt
    res.clearCookie('refreshToken',{
        httpOnly: true,
        secure: true
    })
    return res.status(200).json({
        success:true,
        mess:'Logout is done'
    })
})
// client gửi email
// server check email có hợp lệ hay không => gửi mail + kèm theo link (password change token)
// client check mail => click link
// client gửi api kèm theo token
// check xem token có giống với token mà server gửi mail hay không
// change password
const forgotPassword = asyncHandler(async(req, res)=>{
    const {email} = req.query
    if(!email) throw new Error('Missing email')
    const user = await User.findOne({email})
    if(!user) throw new Error('User not found')
    // method khi duoc model dung phai save lai
    const resetToken = user.createPasswordChangedToken()
    await user.save()
    const html = `Xin vui long click vao link duoi day de thay doi mat khau cua ban. Link nay se het han sau 15 phut ke tu bay gio <a href=${process.env.URL_SERVER}/api/user/reset-password/${resetToken}>Click here</a>`
    const data = {
        email,
        html
    }
    const rs = await sendMail(data)
    return res.status(200).json({
        success: true,
        rs
    })
})
const resetPassword= asyncHandler(async(req, res)=>{
    const {password, token} = req.body
    if(!password || !token) throw new Error('Missing inputs')
    const passwordResetToken = crypto.createHash('sha256').update(token).digest('hex')
    const user = await User.findOne({passwordResetToken, passwordResetExpires:{$gt: Date.now()}})
    if(!user) throw new Error('Invalid reset token')
    user.password = password
    user.passwordResetToken = undefined
    user.passwordChangeAt = Date.now()
    user.passwordResetExpires = undefined
    await user.save()
    return res.status(200).json({
        success: user ? true : false,
        mess: user ? 'Updated password' : 'Something went wrong'
    })
})
module.exports = {
    register,
    login,
    getCurrent,
    refreshAccessToken,
    logout,
    forgotPassword,
    resetPassword,
    getUsers,
    deleteUser,
    updateUser,
    updateUserByAdmin
}
// callback trong express hỗ trợ promise try catch