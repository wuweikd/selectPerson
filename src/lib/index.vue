<style scoped>

</style>
<template>
  <div id="selectPerson">
    selectPerson
  </div>
</template>

<script>
/*
* 说明：
* @date：2019/4/12 11:30
* */
export default {
  name: 'selectPerson',
  data () {
    return {}
  },
  methods: {
    /* ======事件部分===↓=== */
    /* ======逻辑处理部分===↓=== */
    /* ======请求接口部分===↓=== */
  },
  mounted () {
  },
  beforeRouteLeave (to, from, next) {
    alert('退回到selectPerson')
    next()
  }
}
</script>
