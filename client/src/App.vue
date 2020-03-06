<template>
  <div>
    <div>{{test}}</div>
    <div @click="onClick">点击</div>
  </div>
</template>

<script>
  export default {
    name: 'App',
    created() {
      // server端只能执行created和beforeCreate
      // console.log(this);
      console.log(this.$options.created);
    },
    data() {
      return {
        test: 1
      }
    },
    // 没有this，传eventBus进去
    asyncData ({eventBus}) {
      return eventBus.getNav()
    },
    methods: {
      onClick() {
        this.test++
      }
    }
  };
</script>
