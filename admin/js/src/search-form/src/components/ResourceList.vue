<template>
  <span>
    <div class='resource-listing' :style="{border: setBorderColor }" v-if="resource.url">
        <a href='#' @click='getDetais' class='img'><img :src='resource.url'></a>
    </div>
    <template v-if='displayOnIndex==index'>
      <div style='clear:both'></div>
      <div style="width:100%">
          <ResourceDetails v-if="index==displayOnIndex" 
            :resourceDetails='selectedResourceDetails'
            :resourceId="selectedResourceId" 
            :onSelect='onSelect' 
            @resourceSelected="resourceSelected($event)"></ResourceDetails>
      </div>
    </template>
  </span>
</template>
<script>
    import ResourceDetails from './ResourceDetails.vue' 
    export default {
        name: 'ResourceList',
        props:['resource','onSelect','selectedResourceId','index','displayOnIndex','selectedResourceDetails','selectedIndex'],
        components:{ResourceDetails},
        data: () => ({

        }),
        mounted() {
          this.$emit('resourceMounted', {} );
        },
        methods:{
            getDetais(){
              this.$emit('selectResource', { resourceId:this.resource.ref,selectedIndex:this.index } );
            },
            resourceSelected(value){
              this.$emit('resourceSelected', value );
            },
        },
        computed: {
          setBorderColor: function () {
            var color = '1px solid #ccc';
            if(this.selectedIndex == this.index ){
              color = '1px solid #ff0000';
            }
            return color;
          }
        }
    }
</script>
<style scoped>
  .resource-listing{
    width:150px;
    height:150px;
    padding:10px;
    margin:10px;
    float:left;
    overflow:hidden;
  }
  .resource-listing .img{
    max-width:150px;
    max-height:150px;
    display:block;
  }
  .resource-listing .img img{
    max-width:150px;
    max-height:150px;
  }
</style>