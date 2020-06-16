<template>
  <span class='img-wrapper'>
    <a href='#' @click.prevent='getDetais' class='img'><img :src='resource.url' class='rs-img'></a>
  </span>
</template>
<script>
    export default {
        name: 'ResourceList',
        props:['resource'],
        data: () => ({

        }),
        mounted() {
          this.$emit('resourceMounted', {} );
        },
        methods:{
            getDetais(){
              this.$emit('selectResource', { resourceId:this.resource.ref } );
            },
        },
    }
</script>
<style scoped>
  .resource-listing1{
    width:150px;
    height:150px;
    padding:10px;
    margin:10px;
    float:left;
  }
  .rs-img{
    width: 100% !important;
    height: auto !important;
    max-width: 600px;
    margin-bottom:2px;
  }
  .img-wrapper{
    border:0px;
    margin:0px;
    padding:0px;
    display:block;
  }
</style>