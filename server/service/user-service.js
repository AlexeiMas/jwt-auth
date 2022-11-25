const User = require('../models/user-model')
const ResetToken = require('../models/reset-token-model')
const bcrypt = require('bcrypt')
const uuid = require('uuid')
const mailService = require('./mail-service')
const tokenService = require('./token-service')
const UserDto = require('../dtos/user-dto')
const ApiError = require('../exceptions/api-error')
const crypto = require('crypto')

class UserService {
  async registration(email, password) {
    const candidate = await User.findOne({email})
    if (candidate) {
      throw ApiError.BadRequest(`User with the same email ${email} is already exists!`)
    }
    const hashPassword = await bcrypt.hash(password, 3)
    const activationLink = uuid.v4()
    const user = await User.create({email, password: hashPassword, activationLink})
    await mailService.sendEmail(email, `${process.env.API_URL}/api/activate/${activationLink}`)

    const userDto = new UserDto(user)
    const tokens = tokenService.generateTokens({...userDto})
    await tokenService.saveToken(userDto.id, tokens.refreshToken)

    return {
      ...tokens,
      user: userDto
    }
  }

  async activate(activationLink) {
    const user = await User.findOne({activationLink})
    if (!user) {
      throw ApiError.BadRequest('Incorrect link')
    }
    user.isActivated = true;
    await user.save()
  }

  async login(email, password) {
    const user = await User.findOne({email})
    if (!user) {
      throw ApiError.BadRequest('User with such email is not found')
    }
    const isPassEquals = await bcrypt.compare(password, user.password)
    if (!isPassEquals) {
      throw ApiError.BadRequest('Wrong password')
    }
    // if (!user.isActivated) {
    //   throw ApiError.BadRequest('Your account is not activated! \nFollow the activation link in your email, please')
    // }
    const userDto = new UserDto(user)
    const tokens = tokenService.generateTokens({...userDto})
    await tokenService.saveToken(userDto.id, tokens.refreshToken)

    return {
      ...tokens,
      user: userDto
    }
  }

  async logout(refreshToken) {
    const token = await tokenService.removeToken(refreshToken)
    return token
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError()
    }
    const userData = tokenService.validateRefreshToken(refreshToken)
    const tokenFromDb = await tokenService.findToken(refreshToken)
    if (!userData || !tokenFromDb) {
      throw ApiError.UnauthorizedError()
    }
    const user = await User.findById(userData.id)
    const userDto = new UserDto(user)
    const tokens = tokenService.generateTokens({...userDto})
    await tokenService.saveToken(userDto.id, tokens.refreshToken)

    return {
      ...tokens,
      user: userDto
    }
  }

  async getAllUsers() {
    const users = await User.find()
    return users
  }

  async forgotPassword(email) {
    const currentUser = await User.findOne({email})
    console.log(currentUser)
    if (!currentUser) {
      throw ApiError.BadRequest('User with such email is not found')
    }
    let token = await ResetToken.findOne({userId: currentUser._id})
    if (!token) {
      token = await ResetToken.create({
        userId: currentUser._id,
        token: crypto.randomBytes(32).toString("hex")
      })
    }
    const link = `${process.env.CLIENT_URL}/password-reset/${currentUser._id}/${token.token}`
    await mailService.sendEmail(email, link, 'Password reset', 'Follow this link for reset your password:')

    return "Password reset link sent to your email account."
  }

  async resetPassword(userId, tokenParam, password) {
    const user = await User.findById(userId)
    if (!user) {
      throw ApiError.BadRequest('Invalid link or expired')
    }
    const token = await ResetToken.findOne({
      userId,
      token: tokenParam
    })
    if (!token) {
      throw ApiError.BadRequest('Invalid link or expired')
    }
    const hashPassword = await bcrypt.hash(password, 3)
    user.password = hashPassword;
    await user.save();
    await token.delete();

    return "Password reset successfully"
  }
}

module.exports = new UserService()