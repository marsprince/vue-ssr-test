const Koa = require('koa')
const Router = require('koa-router')
const serverBundle = require('../dist/vue-ssr-server-bundle.json')
const clientManifest = require('../dist/vue-ssr-client-manifest.json')
const renderer = require('vue-server-renderer').createBundleRenderer(serverBundle, {
  template: require('fs').readFileSync('./static/index.html', 'utf-8'),
  clientManifest
})

const app = new Koa()
const router = new Router()
const path = require('path')

const send = require('koa-send')

// 引入/static/下的文件都通过koa-send转发到dist文件目录下
router.get('/static/*', async (ctx, next) => {
  await send(ctx, ctx.path, { root: path.join(__dirname, '..') + '/dist' });
})

// 第 2 步：路由中间件
router.get('*', async (ctx, next) => {
  const context = {
    title: ctx.url,
    meta: `
	<meta charset="UTF-8">
    <meta name="descript" content="基于webpack、koa搭建的SSR">
  `
  }

  // 有错误返回500,无错误返回html结构
  try {
    const html = await renderer.renderToString(context)
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
