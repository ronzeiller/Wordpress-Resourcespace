<template>
    <div>
        <transition name="modal" >
          <div class="modal-mask" @click1="close" v-show="show">
              <div class="modal-container" @click.stop>
                <div class="modal-header">
                    <div class='modal-title'><h1>Search ResourceSpace</h1></div>
                    <div class='modal-close'><i class="fas fa-times" @click='close(false)'></i></div>
                </div>
                <div class="modal-body">
                    <SearchForm :onSelect='onSelect' @resourceSelected="close($event)" :showTitle='false' :clean='show'></SearchForm>
                </div>
              </div>
          </div>
        </transition>
    </div>
</template>
<script>
    import SearchForm from './SearchForm.vue'
    export default {
        name: 'VueModal',
        components:{SearchForm},
        data: () => ({
            resourceDetails:false,
            resourceFields:[],
            resourceImages:[],
            
        }),
        props: ['show','onSelect'],
        methods: {
            close( value ) {
                this.$emit('close');
                //if(value && this.onSelect.indexOf('widgetInsert')!==0){
                if(value && this.onSelect.indexOf('widgetInsert')!==0){
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
        },
        watch: {
            show: function(newVal, oldVal)  {
                var wpAdminBar = document.getElementsByClassName("edit-post-header");
                if( wpAdminBar.length ){
                    if(newVal){
                        wpAdminBar[0].style.zIndex = "auto";
                    }else{
                        wpAdminBar[0].style.zIndex = "30";
                    }
                }
            }
        },
    }
</script>
<style scoped>
.modal-backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index:100;
}

.modal {
    background: #FFFFFF;
    box-shadow: 2px 2px 20px 1px;
    overflow-x: auto;
    display: flex;
    flex-direction: column;
    max-width:80%;
    min-width:300px;
    min-height:200px;
}

.modal-header, .modal-footer {
    padding: 0px 0px 0px 15px;
    display: flex;
}

.modal-header {
    border-bottom: 1px solid #eeeeee;
    color: #4AAE9B;
    justify-content: space-between;
    font-size:16px;
}

.modal-footer {
    border-top: 1px solid #eeeeee;
    justify-content: flex-end;
}

.modal-body {
    position: relative;
    max-height:100%;
    height:100%;
    font-size:16px;
/*    padding: 20px 10px;*/
}

.modal-mask {
    position: fixed;
    z-index: 99999;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    transition: opacity .3s ease;
}
.modal-wrapper{
    z-index: 99999;
    display: block;
    top: 0;
    left: 0;
    right: 0;
    width:100%;
    height:100%;
    background-color: rgba(0, 0, 0, .5);
}
.modal-container {
    z-index: 99999;
    left: 420px;

    width: 50%;
    max-width:100%;
    margin: 40px auto 0;
    padding: 20px 30px;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
    transition: all .3s ease;
    font-family: Helvetica, Arial, sans-serif;
    height:85%;

    border:5px solid black;
}


.modal-header h3 {
    margin-top: 0;
    color: #42b983;
}

.text-right {
    text-align: right;
}

.form-label {
    display: block;
    margin-bottom: 1em;
}

.form-label > .form-control {
    margin-top: 0.5em;
}

.form-control {
    display: block;
    width: 100%;
    padding: 0.5em 1em;
    line-height: 1.5;
    border: 1px solid #ddd;
}

/*
* The following styles are auto-applied to elements with
* transition="modal" when their visibility is toggled
* by Vue.js.
*
* You can easily play with the modal transition by editing
* these styles.
*/

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
.modal-title{
    float:left;
}
.modal-close{
    float:right;
    cursor: pointer;
}
.modal-title h1{
    font-size: 1.3em;
    padding:0px;
    margin-block-start: 0px;
    margin-block-end: 0px;
}
.modal-title h1::before {
  content: none;
}
@media only screen and (max-width: 600px) {
    .modal-container {
        width: 70%;
    }
}

</style>