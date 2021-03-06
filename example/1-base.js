const Vue = require('vue')
const Koa = require('koa')
const Router = require('koa-router')
const renderer = require('vue-server-renderer').createRenderer({
  template: require('fs').readFileSync('./static/index.html', 'utf-8')
})

const app = new Koa()
const router = new Router()

// 第 2 步：路由中间件
router.get('*', async (ctx, next) => {
  // 创建Vue实例
  const app = new Vue({
    data: {
      url: ctx.url
    },
    template: `<div>访问的 URL 是： {{ url }}</div>`
  })

  const context = {
    title: ctx.url,
    meta: `
	<meta charset="UTF-8">
    <meta name="descript" content="基于webpack、koa搭建的SSR">
  `
  }

  // 有错误返回500,无错误返回html结构
  try {
    const html = await renderer.renderToString(app, context)
    ctx.status = 200
    ctx.body =html
  } catch (error) {
    console.log(error)
    ctx.status = 500
    ctx.body = 'Internal Server Error'
  }
})

app
.use(router.routes())
.use(router.allowedMethods())

// 第 3 步：启动服务，通过http://localhost:3000/访问
app.listen(3000, () => {
  console.log(`server started at localhost:3000`)
})
