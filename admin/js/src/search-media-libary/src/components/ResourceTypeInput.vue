<template>
    <div id='resource-type-input'>
        <div style='clear:both'></div>
        <div class='resource-type-input-wrapper'>
            <template v-for="(inputDef,index) in fieldDef" >
                <div v-if="inputDef.hasOwnProperty('checked')" class='resource-type-item' :key='index'>
                    <input  type="checkbox" name="resource_id[]" :value="inputDef.resourceId" :id='"_"+inputDef.resourceId' :ref="'_' + inputDef.resourceId" :checked='inputDef.checked' @change='onChange(inputDef.resourceId)'>
                        <label :for='"_"+inputDef.resourceId'>{{inputDef.label}}
                    </label>
                    <br/>
                </div>
            </template>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'ResourceTypeInput',
        props:['fieldDef'],
        mounted: function() {
            for (var i in this.fieldDef) {
                this.selectedResources[ this.fieldDef[i].resourceId ] = this.fieldDef[i].checked;
            }
            this.$emit('input', {fieldName:'resource_id', value:this.selectedResources} );
        },
        watch:{
            fieldDef(newVal){
                for(let i=0;i<newVal.length;i++ ){
                    if(newVal[i].hasOwnProperty('checked')){
                        document.getElementById("_"+newVal[i].resourceId).checked = newVal[i].checked;
                    }
                }
            }
        },
        methods:{
            onChange( obj ){
                this.selectedResources[obj] = document.getElementById("_"+obj).checked;
                this.$emit('input', {fieldName:'resource_id', value:this.selectedResources} );
            }
        },

        data: () => ({
           selectedResources:{},
        }), 
    }
</script>
<style scoped>
    .resource-type-input-wrapper{
        float:left;
        padding:5px;
    }
    .resource-type-item{
        float:left;
        padding:5px 15px 5px 5px;
    }
    .resource-type-item label{
        position:relative;
        top:-3px;
    }
</style>