const { getUserInfo } = require('../service/user.service')
const {
  userFormateError,
  userAlreadyExited,
  userDoesNotExist,
  inValidPassword,
} = require('../constant/err.type')
const bcrypt = require('bcryptjs')

const userValidator = async (ctx, next) => {
  const { user_name, password } = ctx.request.body
  //合法性
  if (!user_name || !password) {
    console.error('用户名或密码为空', ctx.request.body)
    ctx.app.emit('error', userFormateError, ctx)

    return
  }

  await next()
}

const verifyUser = async (ctx, next) => {
  const { user_name } = ctx.request.body
  //合理性
  if (await getUserInfo({ user_name })) {
    ctx.app.emit('error', userAlreadyExited, ctx)
    return
  }
  await next()
}

//密码加密
const cryptPassword = async (ctx, next) => {
  const { password } = ctx.request.body
  const salt = bcrypt.genSaltSync(10)
  const hash = bcrypt.hashSync(password, salt)
  ctx.request.body.password = hash
  await next()
}

const verifyLogin = async (ctx, next) => {
  //判断用户是否存在，如果不存在报错
  const { user_name, password } = ctx.request.body
  const res = await getUserInfo({ user_name })
  if (!res) {
    console.error('用户名不存在', user_name)
    ctx.app.emit('error', userDoesNotExist, ctx)
    return
  }

  //判断密码是否匹配
  if (!bcrypt.compareSync(password, res.password)) {
    ctx.app.emit('error', inValidPassword, ctx)
    return
  }
  await next()
}

module.exports = {
  userValidator,
  verifyUser,
  cryptPassword,
  verifyLogin,
}
