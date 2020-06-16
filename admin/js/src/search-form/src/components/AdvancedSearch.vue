<template>
    <div class='advanced-search'>
        <tabs>
            <tab title="Main Fields">
                <CustomInput v-for="(field, index) in formFields.first_tab" :fieldDef='field' @input="update(field.name, $event)"  @inputDate="update(field.name, $event)" :key="index" :index='index'></CustomInput>
            </tab>
            <tab title="All Fields">
                <CustomInput v-for="(field, index) in formFields.second_tab" :fieldDef='field' @input="update(field.name, $event)"  @inputDate="update(field.name, $event)" :key="index" :index='index'></CustomInput>
            </tab>
        </tabs>
        <div style='clear:both'></div>

    </div>
</template>
<script>
    import { Tabs, Tab } from 'vue-slim-tabs';
    import CustomInput from './CustomInput.vue';
    export default {
        name: 'AdvancedSearch',
        components: { Tabs, Tab, CustomInput },
        props:['formFields'],
        mounted: function() {

        },
        methods:{
            update(key, keyValue) {
                this.$emit('input', {fieldName:key, value:keyValue} );
            },
        },
    }
</script>
<style src="vue-slim-tabs/themes/default.css"></style>
<style scoped>
.advanced-search{
    height:300px;
}
.vue-tabs{
    height:100%;

}
.vue-tabpanel{
    overflow-y: scroll;
    height:90%;
    float:left;
    width:100%;
}

</style>