<template>
    <div class='custom-select'>
        <label>{{fieldDef.label}} {{value}}</label>
        <select :name='fieldDef.name' @input="update(fieldDef.name, $event.target.value)" ref="selectBox">
            <template v-for="(option,index) in fieldDef.options">
                <option :value="option.key" :key='index' :selected='(option.key==value)'>{{option.value}}</option>
            </template>
        </select>
    </div>
</template>
<script>
    export default {
        name: 'CustomSelect',
        props:['fieldDef','value'],
        methods:{
            update(key, value) {
                this.$emit('input', value );
            },
        },
        watch: {
            value(newVal,oldVal){
                this.$refs.selectBox.value = newVal;
            }
        },
        data: () => ({
            hasBeenSelected:false,           
        }),
    }
</script>
<style scoped>
    .custom-select{
        max-width:100%;
        width:300px;
    }
    .custom-select select{
        max-width:98%;
        width:280px;
    }
</style>