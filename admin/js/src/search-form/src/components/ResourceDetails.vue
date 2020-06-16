<template>
    <div class='resource-details' :id="'detail_container_'+resourceId">
        <div v-if="!resourceDetails">
            <div  class="fa-3x">
                <center><i class="fas fa-spinner fa-spin"></i></center>
            </div>
        </div>
        <div v-else>
            <div class="row-details" v-if="resourceDetails.hasOwnProperty('orig_file')">
                <a :href="resourceDetails.orig_file" target='_blank' class="link-details"> <b>Original File</b> &nbsp;&nbsp; <i class="fas fa-expand-arrows-alt"></i></a> 
                
                <div v-if="importing && onSelect=='mediaLibrary'">
                    <div  class="fa-3x">
                        <center><i class="fas fa-spinner fa-spin"></i></center>
                    </div>
                </div>
                <template v-if="onSelect!='mediaLibrary'" >
                    <button :ref_id="resourceId" size_id="" @click.prevent="selectSize(resourceId,'')" class="button-details ">{{buttonText}}</button>
                </template>
                <template v-else>
                    <template v-if="resourceDetails.imported==0">
                        <button :disabled="disableImport" :ref_id="resourceId" size_id="" @click.prevent="selectSize(resourceId,'')" class="button-details ">{{buttonText}}</button>
                    </template>
                    <template v-else>
                        <span class='imported'>imported</span>
                    </template>
                </template>
            </div>

            <template v-if="onSelect!='mediaLibrary'" >
                <div class="row-details" v-for="(imageObj,index) in Object.entries(resourceDetails.images)" :key='"image_"+index+"_"+resourceId'>
                    <a :href="imageObj[1]['url']" target='_blank' class="link-details"> {{imageObj[1]['name']}} &nbsp;&nbsp; <i class="fas fa-expand-arrows-alt"></i></a> 
                    <button :ref_id="resourceId" :size_id="imageObj[0]" @click.prevent="selectSize(resourceId,imageObj[0])" class="button-details">{{buttonText}}</button>
                    <!-- <span>[resourcespace :id={{resourceId}} :size_id={{imageObj[0]}}]</span><br>-->
                </div>
            </template>
            <div style="clear:both"></div>
            <template v-for="(fieldArray,index) in Object.entries(resourceDetails.fields)">
                <div class="row-details" :key='"field_"+index+"_"+resourceId'>
                    <b>{{fieldArray[0]}}:</b> {{fieldArray[1]}}
                </div>
            </template>
        </div>
    </div>
</template>
<script>
    import $ from 'jquery';
    export default {
        name: 'ResourceDetails',
        props:['resourceId','onSelect','resourceDetails'],
        data: () => ({
            disableImport:false,
            importing:false,
        }),
        computed: {
            buttonText(){
                if(this.onSelect=='copyClipboard'){
                    return 'copy shortcode';
                }else if(this.onSelect=='mediaLibrary'){
                    return 'insert into media library';
                }else{
                    return 'insert shortcode';
                }
            },
        },
        watch: {
            resourceDetails: function (val) {
 
            }
        },
        mounted() {

        },
        methods:{
            selectSize(resourceId,resourceSize){
                if(this.onSelect=='copyClipboard'){
                    this.copyToClipboard(resourceId,resourceSize);
                }
                if(this.onSelect=='classicInsert'){
                    this.insertInClassicEditor(resourceId,resourceSize);
                    //this.$emit('resourceSelected', {id:resourceId,size:resourceSize} );
                }
                if(this.onSelect=='mediaLibrary'){
                    this.inserInMediaLibrary(resourceId,resourceSize);
                }
                if(this.onSelect.indexOf('widgetInsert')===0 ){
                    var timestamp = this.onSelect.substring(13);
                    this.widgetInsert(resourceId,resourceSize,timestamp);
                }
                this.$emit('resourceSelected', {id:resourceId,size:resourceSize} );      
            },
            inserInMediaLibrary(resourceId,resourceSize){
                
                var data = {
                    'action': 'resourcespace_insert_into_media_library',
                    'resource': this.resourceDetails,
                    'resourceId': resourceId,
                    'resourceSize': resourceSize
                };
                
                var that = this;
                this.disableImport = true;
                this.importing = true;
                $.post(window.ajaxurl, data)
                .then((data)=>{ 
                    //that.searchResults = JSON.parse(data);
                    if(JSON.parse(data)['uploaded']){
                        this.resourceDetails.imported=1;
                    }else{
                        this.resourceDetails.imported=0;
                    }
                    //console.log( data );
                    that.disableImport = false;
                    that.importing = false;
                });
            },
            insertInClassicEditor(resourceId,resourceSize){
                var str = '[resourcespace id=' + resourceId + ']';
                if(resourceSize!=''){
                    str = '[resourcespace id=' + resourceId + ' size_id=' + resourceSize + ']';
                }
                wp.media.editor.insert(str);
            },
            widgetInsert(resourceId,resourceSize,timestamp){
                var input = document.getElementsByClassName("resource-id-"+timestamp);
                input[0].value = resourceId;
                input = document.getElementsByClassName("resource-size-"+timestamp);
                input[0].value = resourceSize;
                // if ("createEvent" in document) {
                //     var evt = document.createEvent("HTMLEvents");
                //     evt.initEvent("change", false, true);
                //     input[0].dispatchEvent(evt);
                // }
                // else{
                //     input[0].fireEvent("onchange");
                // }
                var keyboardEvent = new KeyboardEvent('keydown', {
                    code: 'Enter',
                    key: 'Enter',
                    charKode: 13,
                    keyCode: 13,
                    view: window
                });
                input[0].dispatchEvent(keyboardEvent);

            },
            copyToClipboard(resourceId,resourceSize){
                var str = '[resourcespace id=' + resourceId + ']';
                if(resourceSize!=''){
                    str = '[resourcespace id=' + resourceId + ' size_id=' + resourceSize + ']';
                }
                var el = document.createElement('textarea');
                el.value = str;
                el.setAttribute('readonly', '');
                el.style = {position: 'absolute', left: '-9999px'};
                document.body.appendChild(el);
                el.select();
                document.execCommand('copy');
                document.body.removeChild(el);
                alert("Copied the text: " + str);
            }
        },

    }
</script>
<style scoped>
.resource-details .row-details {
    float:left;
    width:95%;
    padding:5px 15px 5px 15px;
    border-top:1px solid #ccc;
}
.resource-details .row-details .link-details{
    float:left;
}
.resource-details .row-details .button-details{
    float:right;
}
.imported{
    font-weight: bold;
    color:red;
    float:right;
}
</style>