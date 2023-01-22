const Koa = require('koa')

const app = new Koa()

app.listen(3000, () => {
  console.log('server is running on http://localhost:3000')
})

app.use((ctx, next) => {
  ctx.body = 'hello koa'
})
