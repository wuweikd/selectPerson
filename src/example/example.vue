<style scoped>
</style>
<template>
  <div>
  </div>
</template>

<script>
/*
* 说明：
* @date：2019/4/12 11:17
* */
import Vue from 'vue'
export default {
  name: 'example',
  data () {
    return {
    }
  },
  methods: {
  /* ======事件部分===↓=== */
    goSelect () {
      this.$router.push({
        name: 'selectPerson',
        query: this.$route.query
      })
    },
    doSometing () {
    }
  /* ======逻辑处理部分===↓=== */
  /* ======请求接口部分===↓=== */
  },
  mounted () {
    if (!Vue.prototype.$needGoOut) {
      Vue.prototype.$needGoOut = true
      this.goSelect()
    } else {
      Vue.prototype.$needGoOut = false
      this.$router.go(-1)
    }
  }
}
</script>
