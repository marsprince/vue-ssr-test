import { createApp } from './app'
import App from "./App.vue"

export default context => {
  return new Promise((resolve, reject) => {
    const { app, eventBus } = createApp()
    // 这里笔者的demo比较简单，仅app组件需要预取数据，复杂业务可以递归遍历哈；
    const matchedComponents = [App]

    Promise.all(matchedComponents.map(({ asyncData }) => asyncData && asyncData({
      eventBus
    }))).then(() => {
      context.state = eventBus._data
      resolve(app)
    }).catch(reject)
  })

}
