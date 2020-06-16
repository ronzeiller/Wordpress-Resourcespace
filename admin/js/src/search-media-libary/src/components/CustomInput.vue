<template>
    <span>
        <div class='custom-input'>
            <TextInput v-if="fieldDef.type=='text'" :fieldDef="fieldDef" :value='fieldDef.value' @input="update(fieldDef.name, $event)"></TextInput>
            <CustomSelect v-if="fieldDef.type=='select'" :fieldDef="fieldDef" :value='fieldDef.value' @input="update(fieldDef.name, $event)"></CustomSelect>
            <CustomMonthlyPicker v-if="fieldDef.type=='date'" :fieldDef="fieldDef" :v-model="selectedMonth" :value="tmp" @input="updateDate(fieldDef.name, $event)"></CustomMonthlyPicker>
        </div>
        <div v-if="index % 2 == 1" style='clear:both'></div>
    </span>
</template>
<script>
    import TextInput from './TextInput.vue';
    import CustomSelect from './CustomSelect.vue';
    import CustomMonthlyPicker from './CustomMonthlyPicker.vue' 
    export default {
        name: 'CustomInput',
        components: {CustomSelect,TextInput,CustomMonthlyPicker},
        props:['fieldDef','index'],
        methods:{
            update( _key,value) {
                this.$emit('input', value );
            },
            updateDate( _key,value) {
              this.$emit('inputDate', { 'value':value, 'type':'date'} );
            },

        },
        data: () => ({
          selectedMonth:moment(),
          tmp:moment(null),
        }),
    }
</script>
<style scoped>
.custom-input{
    float:left;
    height:50px;
    margin:5px 10px 10px 0px;
}
.custom-input input, .adra-advanced-search-form .custom-input select{
    line-height:30px;
    height:30px;
}
.custom-input label{
    display: block;
}
</style>