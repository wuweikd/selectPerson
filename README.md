# select-person

> 用于移动端选人的控件

## 使用

``` bash
# 下载依赖
npm i select-person
-----------------
import selectPerson from 'select-person/src/lib'
Vue.use(selectPerson)
```

## 用法
#### 新建一个承载选人控件的页面，业务页面跳转到此页面即可
###### 解释：由于需要监听路由的返回事件，所以挂载的选人页面只能挂载在当前页面的`<div id="selectPerson"></div>`上面
```vue
<style scoped>
</style>
<template>
  <div id="selectPerson"></div>
</template>

<script>
const baseURL = window.location.protocol + '//' + window.location.host
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
        token: '请求的token',
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

```
##### 参数

|构造参数  | 类型|必填 | 说明 |默认|
| --- | --- | --- | --- |---|
| bandId | String | true| 当前页面的id|无|
| token | String | true| 请求接口的token|无|
| choseEvent | Function | true| 选择人员的回调,参数为：人员|-|
| goBackEvent | Function | true| 返回事件的回调，参数为：是否可以退出|-|
|getListUrl|String|true|查询列表的Url|组织架构的地址|
|searchUrl|String|true|搜索的Url|组织架构的地址|
| allianceId | String | false | 查询指定医联体信息 | ''|
| tenantId | String | false | 查询指定医院信息|''|
| isMultiple | Boolean | false| 是否多选|false|
| pathList | Array | false| 第一层级面包屑|pathList: [{orgName: '组织架构',orgId: ''}]|
| chosedPersonList | Array | false| 当前已选人员|[]|

##### 后台：后台返回的数据结构需要为以下结构
```json

{"resultData":
  [{
    "avatarUrl":"头像地址",
    "empId":"用户唯一id",
    "empName":"用户姓名",
    "hasChild":true,
    "isOrg":true,
    "jobBank":"职位",
    "orgId":"部门id",
    "orgName":"部门名称"
  }]
}
```
> 示例图片
![Image text](https://raw.githubusercontent.com/wuweikd/selectPerson/master/%E7%A4%BA%E4%BE%8B2.png)
