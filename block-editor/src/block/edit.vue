<template>
  <div>

    <div v-if="attributes.attributes.resourceId=='-'"> 
      <button @click='showHide'>Search ResourceSpace</button>
      <modal  :show='showModal' :onSelect='onSelect' @close='doOnClose' @resourceSelected='resourceSelected($event)'> </modal>
    </div>
    <div v-else v-html="redered"></div>

  </div>
</template>
<script>
/*
    <block-controls>
      <block-alignment-toolbar :value="attributes.align"
          :onChange="align => setAttributes( { align } )"
          :controls="[ 'wide', 'full' ]"
       />
    </block-controls>
import { ReactInVue } from 'vuera';
const {
  BlockControls,
  BlockAlignmentToolbar,
} = wp.editor;
*/
    //import Modal from './resourcespace-adra-search-form.js';
    import Modal from '../../../admin/js/src/search-form/src/components/Modal.vue';
    import $ from 'jquery';
    //import Modal from './tmp.vue';
export default {
  
  data() {
    return {
      showModal:false,
      onSelect:'blockEditor',
      redered:'waiting',
      resourceId:'',
      resourceSize:'',
    };
  },
  components:{Modal},
  mounted:function (){
    this.resourceId=this.attributes.attributes.resourceId;
    this.resourceSize=this.attributes.attributes.resourceSize;
    this.renderResource();
  },
  props: ['attributes'],
//   components: {
//     'block-controls': ReactInVue(BlockControls),
//     'block-alignment-toolbar': ReactInVue(BlockAlignmentToolbar),
//   },
    methods:{
        renderResource(){
          var attributes = {id:this.resourceId, size_id:this.resourceSize};
          if(this.resourceId!=''){
            var that = this
            $.ajax({
              url: "/wp-admin/admin-ajax.php?action=resourcespace_get_rendered_shortcode",
              async: false,
              data: attributes,
              success: function(result){
                  that.redered = JSON.parse(result).html;
                  that.saveAttributes();
              }
            })
          }else{
            this.redered = "&nbsp;";
            this.saveAttributes();
          }
        },
        saveAttributes(){
          this.attributes['setAttributes']({'resourceId':this.resourceId,'resourceSize':this.resourceSize,'htmlSource':this.redered});
        },
        doOnClose(){
            this.showModal = false;
        },
        showHide(){
            this.showModal = !this.showModal;
        },
        resourceSelected( value ){
          if( typeof value.id != 'undefined' ){
            //this.attributes['setAttributes']({'resourceId':value.id,'resourceSize':value.size,htmlSource:''});
            this.resourceId = value.id;
            this.resourceSize = value.size;
            this.renderResource();
            
          }
        },
    }
}
</script>