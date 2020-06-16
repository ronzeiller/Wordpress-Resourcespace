<template>
  <div id="app">
    <SearchForm v-if='!modalCase' :onSelect='insertInto' :showTitle='true'/>
    <Modal v-if='modalCase' :show='show' :onSelect='insertInto' @close='show=false'/>
  </div>
</template>

<script>
import SearchForm from './components/SearchForm.vue';
import Modal from './components/Modal.vue';
export default {
  name: 'app',
  components: {
    SearchForm,
    Modal
  },
  props:['modalCase','insertInto'],
  data: () => ({
    show:true,
  }), 
}
</script>

<style>

</style>
