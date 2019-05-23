<style scoped lang="scss">
@import "css/select";
</style>
<template>
  <div class="select">
    <!-- 搜索部分 -->
    <div v-if=" !isChoseList" class="search">
      <form action="javascript:;">
        <img class="search-img width-14" :class="isSearch? 'search-img2' :''" src="./img/search.png">
        <input class="inputer" :class="isSearch? '' :'inputer2'" v-model.trim="keyword" @focus="onFocus" @keydown.enter="enter"
               placeholder="  搜索" type="search" ref="selectInputer">
        <img v-show="isSearch &&  keyword" @click="keyword = ''" class="clear-icon  width-14" src="./img/search-cancel.png">
        <span v-show="isSearch" class="cancel-text" @click="finalSearch">取消</span>
      </form>
    </div>
    <!-- 搜索列表 -->
    <div v-show="isSearch && !isChoseList" class="search-list">
      <div class="item">
        <div class="person" @click="chosePerson(person, personIndex)" v-for="(person, personIndex) in searchList" :key="personIndex">
          <img class="width-24" :src="person.isChosed? require('./img/multiple-select.png') : require('./img/default-select.png')" alt="">
          <img class="person-img width-40" :src="person.avatarUrl || require('./img/nan.png')" alt="">
          <div class="person-message">
            <div class="person-name">{{person.empName}}</div>
            <div class="person-job">{{person.jobBank}}</div>
          </div>
        </div>
      </div>
    </div>
    <!-- 面包屑导航栏 -->
    <div v-show="!isSearch && !isChoseList && pathList.length" class="header">
      <div class="bread-crumb" @click="chosePath(path, pathIndex)" v-for="(path, pathIndex) in pathList"
           :key="pathIndex">{{path.orgName}}</div>
    </div>
    <!-- 全选 -->
    <div class="chose-all">
    <div class="chose-all-in"  v-show="!isSearch && !isChoseList && isMultiple && personList.length">
        <div v-if="isChoseAll()" @click="choseAll(false)">
          <img class="width-24" src="./img/multiple-select.png" alt=""><span class="vm">全选</span>
        </div>
        <div v-else @click="choseAll(true)">
          <img class="width-24" src="./img/default-select.png" alt=""><span class="vm">全选</span>
        </div>
      </div>
    </div>
    <!-- 主要内容 -->
    <div v-show="!isSearch && !isChoseList" class="body">
      <!-- 人员列表 -->
      <div class="item">
        <div class="person" @click="chosePerson(person)" v-for="(person, personIndex) in personList" :key="personIndex">
          <img class="width-24" :src="person.isChosed? require('./img/multiple-select.png') : require('./img/default-select.png')" alt="">
          <img class="person-img width-40" :src="person.avatarUrl || require('./img/nan.png')" alt="">
          <div class="person-message">
            <div class="person-name">{{person.empName}}</div>
            <div class="person-job">{{person.jobBank}}</div>
          </div>
        </div>
      </div>
      <!-- 目录（部门）列表 -->
      <div class="item">
        <div class="catalog" @click="choseCategory(category)"  v-for="(category, categoryIndex) in categoryList" :key="categoryIndex">
          <span>{{category.orgName}}</span>
          <img class="right-img" src="./img/arrow-right.png" alt="">
          <span class="number">{{category.number}}</span>
        </div>
      </div>
    </div>
    <!-- 查看已选的人员列表 -->
    <div v-if="isChoseList" class="chosed-list">
      <div class="item">
        <div class="person"  v-for="(person, personIndex) in chosedPersonList" :key="personIndex">
          <img class="person-img width-40" :src="person.avatarUrl || require('./img/nan.png')" alt="">
          <div class="person-message">
            <div class="person-name">{{person.empName}}</div>
            <div class="person-job">{{person.jobBank || person.jobRank}}</div>
          </div>
          <img @click="delPerson(person, personIndex)" class="remove-img width-24" src="./img/remove.png" alt="删除">
        </div>
      </div>
    </div>
    <!-- 按钮 -->
    <div class="footer">
      <div class="fill-div"></div>
      <div class="button">
        <div class="button-number" @click="toShowChoseList">已选<span class="number">{{chosedPersonList.length}}</span>人</div>
        <div class="button-confirm" v-show="chosedPersonList.length" @click="confirmSelect">确定</div>
        <div class="button-confirm2" v-show="!chosedPersonList.length">确定</div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'newSelectPerson',
  data () {
    return {
      token: '',
      getListUrl: '',
      searchUrl: '',
      allianceId: '',
      tenantId: '',
      /* 是否多选 */
      isMultiple: false,
      /* 完成选人之后需要退出 */
      needBack: false,
      /* 判断是否在已选列表 */
      isChoseList: false,
      /* 判断是否在搜索操作 */
      isSearch: false,
      // 搜索内容
      keyword: '',
      // 搜索得到的结果
      searchList: [],
      // 路径列表
      pathList: [{
        orgName: '组织架构',
        orgId: ''
      }],
      // 人员列表
      personList: [],
      // 目录（科室）列表
      categoryList: [],
      // 已经选中的人员列表
      chosedPersonList: [],
      choseEvent: null,
      goBackEvent: null
    }
  },
  methods: {
    /* -------------------搜索框部分---↓--------------- */
    onFocus () {
      // this.$el.querySelector('.search-input').focus()
      this.isSearch = true
      this.keyword = ''
      this.searchList = []
    },
    async enter () {
      if (!this.keyword) return
      await axios.post(this.searchUrl, {
        keyword: this.keyword,
        tenantId: this.tenantId,
        allianceId: this.allianceId
      }, true).then(res => {
        let data = res.data
        if (data.success) {
          this.searchList = data.resultData
          for (let person of this.searchList) {
            for (let chosePerson of this.chosedPersonList) {
              let isChosed = (chosePerson.openId === person.openId)
              this.$set(person, 'isChosed', isChosed)
              if (isChosed) {
                break
              }
            }
          }
        } else {
          console.error(res)
        }
      }).catch(error => {
        console.error(error)
      })
    },
    finalSearch () {
      this.$refs.selectInputer.blur()
      this.isSearch = false
      this.keyword = ''
      this.initList()
    },
    /* -------------------搜索框部分-----↑------------- */
    /* -------------------请求数据部分-----↓------------- */
    /* 获取列表 */
    async getPersonList (orgId) {
      await axios.post(this.getListUrl, {
        orgId: orgId,
        tenantId: this.tenantId,
        allianceId: this.allianceId
      }).then(res => {
        let data = res.data
        if (data.success) {
          let list = data.resultData
          this.categoryList = []
          this.personList = []
          // 拆分两个列表
          for (let i of list) {
            i.isOrg ? this.categoryList.push(i) : this.personList.push(i)
          }
          this.initList()
        } else {
          console.error(res)
        }
      }).catch(error => {
        console.error(error)
      })
    },
    /* -------------------请求数据部分-------↑----------- */
    /* -------------------各种选择部分------↓------------ */
    /* 删除人员 */
    delPerson (person, index) {
      this.chosedPersonList.splice(index, 1)
      this.initList()
    },
    /* 选中人员 */
    chosePerson (person) {
      if (this.isMultiple) {
        // 多选=========
        if (person.isChosed) {
          // 取消选择
          this.$set(person, 'isChosed', false)
          for (let i = 0; i < this.chosedPersonList.length; i++) {
            if (person.openId === this.chosedPersonList[i].openId) {
              this.chosedPersonList.splice(i, 1)
              break
            }
          }
        } else {
          // 选择
          this.$set(person, 'isChosed', true)
          this.chosedPersonList.push(person)
        }
      } else {
        // 单选=========
        if (person.isChosed) {
          // 取消选择
          this.$set(person, 'isChosed', false)
          this.chosedPersonList = []
        } else {
          // 选择
          this.$set(person, 'isChosed', true)
          this.chosedPersonList = [person]
        }
        this.initList()
      }
    },
    /* 选中部门 */
    async choseCategory (item) {
      if (item.number === 0) {
        return
      }
      await this.getPersonList(item.orgId)
      this.pathList.push(item)
    },
    /* 选中路径 */
    chosePath (path, index) {
      this.pathList = this.pathList.slice(0, index + 1)
      this.getPersonList(path.orgId)
    },
    /* 全选 */
    choseAll (isChose) {
      if (isChose) {
        // 选中
        for (let i = 0; i < this.personList.length; i++) {
          if (!this.personList[i].isChosed) {
            this.$set(this.personList[i], 'isChosed', true)
            this.chosedPersonList.push(this.personList[i])
          }
        }
      } else if (!isChose) {
        // 取消选中
        for (let i = 0; i < this.personList.length; i++) {
          if (this.personList[i].isChosed) {
            this.$set(this.personList[i], 'isChosed', false)
            for (let j = 0; j < this.chosedPersonList.length; j++) {
              if (this.personList[i].openId === this.chosedPersonList[j].openId) {
                this.chosedPersonList.splice(j, 1)
                break
              }
            }
          }
        }
      }
    },
    /* -------------------各种选择部分------↑------------ */
    /* -------------------其他逻辑部分------↓------------ */
    toShowChoseList () {
      this.isChoseList = true
      this.isSearch = false
      this.keyword = ''
    },
    /* 初始化列表 */
    initList () {
      for (let person of this.personList) {
        this.$set(person, 'isChosed', false)
        for (let chosePerson of this.chosedPersonList) {
          let isChosed = (chosePerson.openId === person.openId)
          this.$set(person, 'isChosed', isChosed)
          if (isChosed) break
        }
      }
      if (!this.isMultiple && this.isSearch) {
        for (let person of this.searchList) {
          this.$set(person, 'isChosed', false)
          for (let chosePerson of this.chosedPersonList) {
            let isChosed = (chosePerson.openId === person.openId)
            this.$set(person, 'isChosed', isChosed)
            if (isChosed) break
          }
        }
      }
    },
    /* 判断是否全选 */
    isChoseAll () {
      let choseNum = 0
      for (let person of this.personList) {
        if (person.isChosed) choseNum++
      }
      return (choseNum === this.personList.length) && this.personList.length > 0
    },
    /* 提交 */
    confirmSelect () {
      this.needBack = true
      this.choseEvent(this.chosedPersonList)
      this.toBack(true)
    },
    /* 返回事件 */
    dealGoBack () {
      let len = this.pathList.length
      if (this.needBack) {
        this.toBack(true)
      } else if (this.isSearch) {
        this.$refs.selectInputer.blur()
        this.isSearch = false
        this.toBack(false)
      } else if (this.isChoseList) {
        this.isChoseList = false
        this.toBack(false)
      } else if (len === 1) {
        this.chosedPersonList = []
        this.toBack(true)
      } else {
        this.toBack(false)
        this.pathList.splice(len - 1, 1)
        this.pathList.length > 0 ? this.getPersonList(this.pathList[len - 2].orgId) : this.getPersonList('')
        this.toBack(false)
      }
    },
    toBack (bool) {
      if (bool) {
        window.removeEventListener('popstate', this.dealGoBack)
        setTimeout(() => {
          window.history.go(-1)
        }, 50)
      }
      this.goBackEvent(bool)
    }
  },
  mounted () {
    if (!Array.isArray(this.chosedPersonList)) {
      console.error('chosedPersonList must be Array')
      this.chosedPersonList = []
    }
    axios.defaults.headers.common['Authorization'] = this.token
    window.addEventListener('popstate', this.dealGoBack)
    this.getPersonList('')
  }
}
</script>
