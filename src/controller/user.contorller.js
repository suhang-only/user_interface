const { createUser, getUserInfo } = require('../service/user.service')
const {} = require('../constant/err.type')

class UserController {
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
}

module.exports = new UserController()
