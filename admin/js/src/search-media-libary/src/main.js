import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false


window.displaySearchMediaLibraryFrom = function ( displayModal, toInsert ){
  var vueApp =  new Vue({
    render: h => h(App, {props:{ modalCase:displayModal, insertInto:toInsert}}),
  }).$mount('#searchFrom');
  return vueApp;
}

//toInsert: mediaLibrary,classicInsert,copyClipboard