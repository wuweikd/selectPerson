<style scoped>

</style>
<template>
  <div id="selectPerson"></div>
</template>

<script>
/*
* 说明：
* @date：2019/4/12 11:30
* */
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
      getListUrl: '',
      searchUrl: '',
      getListUrl1: baseURL + '/mwp/managementPlatform/api/mwpAlliance/getChildByEmpModel',
      searchUrl1: baseURL + '/mwp/managementPlatform/api/mwpAlliance/searchChildByEmpModel',
      getListUrl2: baseURL + '/mwp/orgStructure/api/cloudOrgStructure/selectEmp/mobile/emp',
      searchUrl2: baseURL + '/mwp/orgStructure/api/cloudOrgStructure/selectEmp/mobile/emp/search'
    }
  },
  methods: {
    initSelect () {
      let _this = this
      this.$selectPeople({
        allianceId: _this.allianceId,
        tenantId: _this.tenantId,
        bandId: 'selectPerson', // 绑定当前页面的id
        getListUrl: _this.getListUrl,
        searchUrl: _this.searchUrl,
        isMultiple: _this.isMultiple, // 是否多选，默认false
        pathList: _this.pathList, // 初始路径列表，可以不传
        chosedPersonList: _this.chosedPersonList, // 已经选中的人员列表
        choseEvent: (person) => {
          sessionStorage.setItem('selectPerson', JSON.stringify(person))
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
  },
  mounted () {
    alert(PRODUCT_URL)
    console.log('使用方式：', '(1)地址参数orgName表示初始医院名称，缺省组织架构',
      '(2)地址参数isMultiple为false或true，缺省false',
      '(3)sessionStorage：chosedPersonList为已选人员，缺省空',
      '(4)token可以地址参数方式或sessionStorage方式存储',
      '(5)地址参数tenantId缺省空',
      '(6)地址参数allianceId缺省空',
      '(7)地址参数isAlliance为false或true,缺省false，表示查询的是医联体还是组织架构')
    let query = this.$route.query
    this.tenantId = query.tenantId || ''
    this.allianceId = query.allianceId || ''
    let isAlliance = query.isAlliance ? (query.isAlliance !== 'false') : false
    this.isMultiple = query.isMultiple ? (query.isMultiple !== 'false') : false
    let orgName = query.orgName
    let chosedPersonList = sessionStorage.getItem('chosedPersonList')
    let mytoken = sessionStorage.getItem('token') || query.token
    this.getListUrl = isAlliance ? this.getListUrl1 : this.getListUrl2
    this.searchUrl = isAlliance ? this.searchUrl1 : this.searchUrl2
    if (orgName) {
      this.pathList = [{
        orgName: orgName,
        orgId: ''
      }]
    }
    if (chosedPersonList) {
      this.chosedPersonList = JSON.parse(chosedPersonList)
    } else {
      this.chosedPersonList = []
    }
    if (mytoken) {
      sessionStorage.setItem('selectPersonToken', mytoken)
      this.initSelect()
    } else {
      console.error('请加token在sessionStorage中或者参数方式拼接token')
    }
  },
  beforeRouteLeave (to, from, next) { // 处理返回
    if (this.needGoBack) {
      next()
    } else {
      next(false)
    }
  }
}
</script>
