<style scoped>
.block {
  background-color: lavenderblush;
  margin-bottom: 20px;
  height: 40px;
  vertical-align: middle;
  text-align: center;
  line-height: 40px;
}
</style>
<template>
  <div>
    <div class="block" @click="goSelect('1')">普通选人(单选)</div>
    <div  class="block" >选部门</div>
  </div>
</template>

<script>
/*
* 说明：
* @date：2019/4/12 11:17
* */
export default {
  name: 'example',
  data () {
    return {
      goSelect () {
        this.$router.push({name: 'selectPerson'})
      }
    }
  },
  methods: {
  /* ======事件部分===↓=== */
  /* ======逻辑处理部分===↓=== */
  /* ======请求接口部分===↓=== */
  },
  mounted () {
  }
}
</script>
