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
    return {
      needGoBack: false
    }
  },
  methods: {
  /* ======事件部分===↓=== */
  /* ======逻辑处理部分===↓=== */
    initSelect () {
      let _this = this
      this.$selectPeople({
        choseEvent: (person) => {
          console.log(person)
        },
        goBackEvent: (go) => {
          if (go) {
            _this.needGoBack = true
          } else {
            _this.needGoBack = false
          }
        }
      })
    }
  /* ======请求接口部分===↓=== */
  },
  mounted () {
    this.initSelect()
  },
  beforeRouteLeave (to, from, next) {
    if (this.needGoBack) {
      this.needGoBack = false
      next()
    } else {
      next(false)
    }
  }
}
</script>
