<style scoped>
</style>
<template>
  <div id="selectPerson"></div>
</template>

<script>
const PRODUCT_URL = window.location.protocol + '//' + window.location.host
const baseURL = PRODUCT_URL.indexOf('https') > -1 ? PRODUCT_URL : 'https://test3.mhealth100.com'
export default {
  name: 'selectPerson',
  data () {
    return {
      needGoBack: false,
      isMultiple: true,
      pathList: [{
        orgName: '组织架构',
        orgId: ''
      }],
      chosedPersonList: [],
      allianceId: '',
      tenantId: '',
      getListUrl: baseURL + '/mwp/orgStructure/api/cloudOrgStructure/selectEmp/mobile/emp',
      searchUrl: baseURL + '/mwp/orgStructure/api/cloudOrgStructure/selectEmp/mobile/emp/search'
    }
  },
  methods: {
    initSelect () {
      let _this = this
      this.$selectPeople({
        bandId: 'selectPerson', // 绑定当前页面的id
        token: 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJ0aWNrZXQiOiJBUFBVUkxXSVRIVElDS0VUZjlkYzkwMzRlMTg2Y2M0MDZkN2M3MzIzNDU0ZDgwZmQiLCJleHAiOjE1NTg1ODQwMTB9.Q6xweJ1x-oaSGYzUlyPuCwpe1goZp0Xrv4ZaZ8QyDQu5JJfvgEZCn9_U4C5j2MnXe_tfSdiS0WothZiqmae8Rw',
        allianceId: _this.allianceId,
        tenantId: _this.tenantId,
        getListUrl: _this.getListUrl,
        searchUrl: _this.searchUrl,
        isMultiple: _this.isMultiple,
        pathList: _this.pathList,
        chosedPersonList: _this.chosedPersonList, // 已经选中的人员列表
        choseEvent: (person) => {
          sessionStorage.setItem('selectPerson', JSON.stringify(person))
        },
        goBackEvent: (go) => {
          _this.needGoBack = go
        }
      })
    }
  },
  mounted () {
    this.initSelect()
  },
  beforeRouteLeave (to, from, next) {
    if (this.needGoBack) {
      next()
    } else {
      next(false)
    }
  }
}
</script>
