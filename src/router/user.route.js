const Router = require('koa-router')
const router = new Router({ prefix: '/users' })
const { register } = require('../controller/user.contorller')
const { userValidator, verifyUser } = require('../middleware/user.middleware')

//注册接口
router.post('/register', userValidator, verifyUser, register)
module.exports = router
