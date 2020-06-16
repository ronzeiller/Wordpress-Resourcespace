<template>
    <div>
        <h2>Media Library Fields Map</h2>
        <div v-for='(index,field) in media_library_fields' :key='index'>
            <label>{{index}}</label>
            <select :name="field" :ref="field"  :wp_field="index"  @change="doOnChangeField">
                <option value='-'>-</option>
                <template v-for='(field_def,field_name) in fields'>
                    <template v-if="field_def.display_condition==''">
                        <option :value='field_name' :key="field_name" :selected="checked(field,field_name)">{{field_def.label}}</option>
                    </template>
                </template>
            </select>
        </div>
    </div>    
</template>
<script>
export default {
    props: ['first_tab','second_tab','mediaLibaryFields'],
    data: () => ({
        media_library_fields:{
            'post_title': 'Title',
            'post_content': 'Description',
            'post_author': 'Author',
            'post_excerpt': 'Caption',
            '_wp_attachment_image_alt': 'Alternative Text',
        },
        not_used_fields:['limit'],
        local_current_values:{}
    }),
    computed: {
        fields: function () {
            let all_fields = {...this.first_tab, ...this.second_tab};
            let return_object = {};
            for(var key in all_fields){
                if( all_fields[key].name!='collection_id' ){
                    return_object[all_fields[key].name]={'label':all_fields[key].label,'display_condition':all_fields[key].display_condition};
                }
            }
            return return_object
        }
    },
    methods: {
        doOnChangeField(){
            for( let select_name in this.$refs){
                this.local_current_values[select_name] = this.$refs[select_name][0].value;
            }
            this.$emit('mediaLibaryFieldsUpdated', this.local_current_values);
        },
        checked(field_name,field_option){
            if( this.mediaLibaryFields[field_name]==field_option ){
                return true;
            } else{
                return false
            }
        }
    },

}
</script>
<style scoped>
    label{
        padding:10px;
    }
</style>