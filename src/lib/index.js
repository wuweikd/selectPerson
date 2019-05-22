import selectPeople from './selectPerson'
import Vue from 'vue'

let ShowSelect = Vue.extend(selectPeople)
const select = {
  install () {
    let instance
    Vue.prototype.$selectPeople = function (options) {
      if (!options.bandId) {
        alert('你需要参数bandId为当前页面的id')
      }
      instance = new ShowSelect({
        data: options
      })
      instance.vm = instance.$mount()
      document.getElementById(options.bandId).appendChild(instance.vm.$el)
      return instance.vm
    }
  }
}
export default select
