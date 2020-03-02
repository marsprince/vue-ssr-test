export default {
  install (Vue) {
    const EventBus = new Vue({
      data () {
        return {
          list: [],
          nav: []
        }
      },
      methods: {
        getList () {
          // get list
          setTimeout(()=>{
            this.list = [1,2]
          },1000)
        },
        getNav () {
          // get nav
          const that = this
          return new Promise(resolve => {
            setTimeout(()=>{
              that.nav = [1,2]
              resolve()
            },1000)
          })
        }
      }
    })

    Vue.prototype.$events = EventBus
    Vue.$events = EventBus
  }
}
