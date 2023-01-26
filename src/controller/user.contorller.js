const { createUser, getUserInfo } = require('../service/user.service')
const {} = require('../constant/err.type')
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../config/config.default')

class UserController {
  //注册接口
  async register(ctx, next) {
    //1.获取数据
    // console.log(ctx.request.body)
    const { user_name, password } = ctx.request.body

    try {
      //2.操作数据库
      const res = await createUser(user_name, password)
      console.log(res)
      //3.返回结果
      ctx.body = {
        code: 0,
        message: '用户注册成功',
        result: {
          id: res.id,
          user_name: res.user_name,
        },
      }
    } catch (err) {
      console.log(err)
      ctx.app.emit('error', userRegisterError, ctx)
    }
  }

  //登录接口
  async login(ctx, next) {
    const { user_name } = ctx.request.body
    try {
      const { password, ...res } = await getUserInfo({ user_name })
      ctx.body = {
        code: 0,
        message: '用户登陆成功',
        result: {
          token: jwt.sign(res, JWT_SECRET, { expiresIn: '1d' }),
        },
      }
    } catch (err) {
      console.error('用户登陆失败', err)
    }
  }
}

module.exports = new UserController()
