<template>
    <div>
        <div id='form-fields-setup'  v-if="settings">
            <h3 style='margin-bottom:0px;'>Search Form Setup</h3>
            <div class='firstCol'>
                <h3 style='margin-top:5px;'>Important Fields</h3>
                <draggable class="list-group" :list="list1" group="fields" @change="onChange">
                    <div v-for="element in list1" :key="element.name" class="drag-item">
                        {{element.label}}
                    </div>
                </draggable>
            </div>
            <div class='secondCol'>
                <h3 style='margin-top:5px;'>All Fields</h3>
                <draggable class="list-group" :list="list2" group="fields" @change="onChange">
                    <div v-for="element in list2" :key="element.name" class="drag-item">
                        {{element.label}}
                    </div>
                </draggable>
            </div>
        </div>
        <div style='clear:both'></div>
    </div>
</template>

<script>
import draggable from 'vuedraggable';
export default {
    name: 'SearchFieldsSetup',
    components: {
        draggable,
    },
    props:['settings','first_tab','second_tab'],
    data: () => ({
        list1:[],
        list2:[],
    }),
    mounted(){
        if( this.settings ){
            if(this.first_tab){
                this.list1 = Array.from(this.first_tab);
            }
            if(this.second_tab){
                this.list2 = Array.from(this.second_tab);
            }
        }
    },
    watch:{
        first_tab(newVal){
            this.list1 = Array.from(newVal);
        },
        second_tab(newVal){
            this.list2 = Array.from(newVal);
        }
    },
    methods:{
        onChange(){
            this.$emit('searchFormFieldsUpdated', {first_tab:this.list1,second_tab:this.list2});
            //this.$emit('searchFormFieldsUpdated', this.settings)
        },
    }
}
</script>

<style scoped>
    #form-fields-setup{
        width:100%;
        max-width:600px;
        float:left;
        height:350px;
        overflow:hidden;
    }
    #form-fields-setup .firstCol, #form-fields-setup .secondCol{
        width:40%;
        max-width:260px;
        float:left;
        padding:0px 10px 10px 0px;
        margin:0px 5px 5px 0px;
        height:300px;
    }
    .drag-item{
        font-weight:bold;
        padding:5px 5px 5px 0px;
        cursor: grab;
    }
    #form-fields-setup .list-group{
        border:2px solid black;
        padding:4px;
        height: 215px;
        overflow-y: scroll;
    }
</style>