const Router = require('koa-router')
const router = new Router({ prefix: '/users' })
const { register, login } = require('../controller/user.contorller')
const {
  userValidator,
  verifyUser,
  cryptPassword,
  verifyLogin,
} = require('../middleware/user.middleware')
const { author } = require('../middleware/author.middleware')

//注册接口
router.post('/register', userValidator, verifyUser, cryptPassword, register)
router.post('/login', userValidator, verifyLogin, login)
router.patch('/', author, (ctx, next) => {
  ctx.body = '修改密码成功'
})
module.exports = router
