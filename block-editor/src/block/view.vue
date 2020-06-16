<template>
  <div>
    <div v-html="redered"></div>
  </div>
</template>
<script>
export default {
  
    data() {
        return {
            redered:'waiting',
            resourceId:'',
            resourceSize:'',
        };
    },
    mounted:function (){
        this.resourceId=this.attributes.attributes.resourceId;
        this.resourceSize=this.attributes.attributes.resourceSize;
        this.redered=this.attributes.attributes.htmlSource;
    },
    props: ['attributes'],
}
</script>