<template>
        <transition name="modal">
          <div class="modal-mask" @click="close" v-show="show">
              <div class="modal-container" @click.stop>
                  <div class="modal-body">
                   <input type='text' value=''>
                  </div>
              </div>
          </div>
        </transition>
</template>
<script>

    //import Modal from './resourcespace-adra-search-form.js';
export default {
  
      data: () => ({
        //onSelect:'classicInsert',
      }),
      props: ['show','onSelect'],
      methods: {
        close( value ) {
          //this.show = false     
          this.$emit('close');
          if(value){
            this.$emit('resourceSelected',value);  
          }
        },
      },
      mounted: function () {
        document.addEventListener("keydown", (e) => {
          if (this.show && e.keyCode == 27) {
            this.close( false );
          }
        });
      }
}
</script>