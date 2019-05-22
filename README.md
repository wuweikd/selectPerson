# select-person

> 用于医联体选人

## 使用

``` bash
# 下载依赖
npm i select-person
-----------------
import selectPerson from 'select-person/src/lib'
Vue.use(selectPerson)
```

## 用法
#####新建一个承载选人控件的页面
```vue
<template>
  <div id="toSelectPerson">
  </div>
</template>

<script>
export default {
  name: 'to-select-person',
  data () {
    return {
      needGoBack: true // 控制是否跳出选人页面
    }
  },
  methods: {
    initSelect () {
      let _this = this
      this.$selectPeople({
        bandId: 'toSelectPerson',
        choseEvent: (person) => {
          console.log(person)
        },
        goBackEvent: (go) => { // 照着写
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
    this.initSelect() // 照着写
  },
  beforeRouteLeave (to, from, next) { // 照着写
    if (this.needGoBack) {
      next()
    } else {
      next(false)
    }
  }
}
</script>

```
#####参数
|构造参数  | 类型|必填 | 说明 |默认|
| --- | --- | --- | --- |---|
| bandId | String | true| 当前页面的id|无|
| choseEvent | Function | true| 选择人员的回调,参数为：人员|-|
| goBackEvent | Function | true| 返回事件的回调，参数为：是否可以退出|-|
|getListUrl|String|false|查询列表的Url|https://mock.mhealth100.com/mock/215/api/mwpAlliance/getChildByEmpModel|
|searchUrl|String|false|搜索的Url|您的域名+mwp/managementPlatform/api/mwpAlliance/searchChildByEmpModel|
| allianceId | String | false | 查询指定医联体信息 | ''|
| tenantId | String | false | 查询指定医院信息|''|
| isMultiple | Boolean | false| 是否多选|false|
| pathList | Array | false| 第一层级面包屑|pathList: [{orgName: '组织架构',orgId: ''}]|
| chosedPersonList | Array | false| 当前已选人员|[]|

#####说明
后台返回的数据结构需要为以下结构
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
