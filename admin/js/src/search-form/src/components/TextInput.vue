<template>
    <div class='text-input'>
        <label>{{fieldDef.label}}</label>
        <input type='text' :value='value' @input="update('value', $event.target.value)">
    </div>
</template>
<script>
    export default {
        name: 'TextInput',
        props:['fieldDef','value'],
        mounted: function() {
            this.fieldDef.value = this.value;
        },

        methods:{
            update(key, value) {
                this.value = value;
                this.$emit('input', value );
            },
        },
    }
</script>
<style scoped>
    .text-input{
        max-width:100%;
        width:300px;
    }
    .text-input input{
        max-width:98%;
        width:280px;
    }
</style>