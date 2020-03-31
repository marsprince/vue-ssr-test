vue ssr 搭建

使用：koa + vue + vue-server-renderer

1.避免交叉响应造成污染（比如不同的用户使用同一个vue）

2.删除响应式以提高性能

由于没有动态更新，所有的生命周期钩子函数中，只有 beforeCreate 和 created 会在服务器端渲染 (SSR) 过程中被调用。这就是说任何其他生命周期钩子函数中的代码（例如 beforeMount 或 mounted），只会在客户端执行。

DOM操作也要禁止，任何只适用于客户端不适用于node的api都要改造

3.结合webpack

server端打包要使用commonjs,配置VueSSRServerPlugin变成Json

client端：生成manifest

4.数据预取

如果没有数据预期，相当于渲染静态页面，关键在于数据的预期并让客户端接管

所有数据都需要预取？尽量是首屏

如何同步数据：采用vuex或者自己做数据，总体思想是将数据存在某一地方，在created里去取

似乎没什么好办法，只有用vuex或者统一的dataStore

结论: 巨坑
