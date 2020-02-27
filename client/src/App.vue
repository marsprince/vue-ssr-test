<template>
  <div>
    <div>{{test}}</div>
    <div @click="onClick">点击</div>
  </div>
</template>

<script>
  export default {
    name: 'App',
    data() {
      return {
        test: 1
      }
    },
    methods: {
      onClick() {
        this.test++
      }
    }
  };
</script>
