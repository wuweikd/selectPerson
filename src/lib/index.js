import selectPeople from './selectPeople'
import Vue from 'vue'

let ShowSelect = Vue.extend(selectPeople)
const select = {
  install (Vue, options) {
    let instance
    Vue.prototype.$selectPeople = function (options) {
      instance = new ShowSelect({
        data: options
      })
      instance.vm = instance.$mount()
      document.getElementById('selectPerson').appendChild(instance.vm.$el)
      return instance.vm
    }
  }
}
export default select
