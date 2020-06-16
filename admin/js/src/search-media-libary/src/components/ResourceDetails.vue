<template>
    <div class='resource-details' :id="'detail_container_'+resourceId">
        <div class="back">
            <a href='#' @click.prevent='doBack'>&lt; Back to Resources</a>
        </div>
        <div v-if="!resourceDetails">
            <div  class="fa-3x">
                <center><i class="fas fa-spinner fa-spin"></i></center>
            </div>
        </div>
        <div v-else>
            <div class="container">
                <div class="imgContainer">
                    <img :src="resourceDetails.images['pre'].url">
                    <div>
                        <div v-if="importing" class="fa-3x">
                            <center><i class="fas fa-spinner fa-spin"></i></center>
                        </div>
                        <template v-else>
                            <template v-if="resourceDetails.imported==0">
                                <button  type="button" class='blue-buttom' @click.prevent='inserInMediaLibrary' :disabled="disableImport">Copy to Media Library</button>
                            </template>
                            <template v-else>
                                <button  type="button" class='blue-buttom' id="inserted" :disabled="disableImport"> &#10004; Image in Media Library</button>
                            </template>
                        </template>
                        
                    </div>
                    <button type="button" class='blue-buttom' @click.prevent='copyToClipboard'>Copy Shortcode (size:{{selectedSizeText}})</button>
                </div>
                <div class="detailsContainer">
                    <h2 class='properties'>Resource Properties</h2>
                    <label>Size</label>
                    <select @change='doChangeSize($event)'>
                        <option :value="full">Full</option>
                        <template v-for="(imageObj,imgId) in resourceDetails.images" >
                            <option :value="imgId" :key='imgId'>{{imageObj['name']}}</option>
                        </template>
                    </select>
                    <hr />
                    <template v-for="(fieldArray,index) in Object.entries(resourceDetails.fields)">
                        <div class="row-details" :key='"field_"+index+"_"+resourceId'>
                            <label>{{fieldArray[0]}}:</label>
                            <span class='details'>{{fieldArray[1]}}</span>
                        </div>
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import $ from 'jquery';
    export default {
        name: 'ResourceDetails',
        props:['resourceId','onSelect'],
        data: () => ({
            disableImport:false,
            importing:false,
            resourceDetails:false,
            selectedSize:'full',
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
            selectedSizeText(){
                if(this.selectedSize=='full'){
                    return 'Full';
                }else{
                    return this.resourceDetails.images[this.selectedSize].name;
                }
            },
        },
        watch: {
            resourceDetails: function (val) {
                
            }
        },
        mounted() {
            this.getResourceDetails();
        },
        methods:{
            doChangeSize(event){
                this.selectedSize = event.target.value;
            },
            doBack(){
                this.$emit('hideDetails', {id:this.resourceId} );
            },
            getResourceDetails(){
                this.resourceDetails = false;
                var queryString = '?action=resourcespace_get_resource_details&resource_id=' + this.resourceId;
                var that = this;
                fetch(window.ajaxurl + queryString)
                    .then((response)=>{
                        return response.json()
                    })
                    .then((data)=>{
                        var queryString = '?action=resourcespace_check_media_library&resource_id=' + this.resourceId;
                        fetch(window.ajaxurl + queryString)
                            .then((response)=>{
                                return response.json()
                            })
                            .then((checkData)=>{
                                data.imported = checkData
                                that.resourceDetails = data;
                            })
                            .catch( (error) => {
                                data.imported = 0;
                                that.resourceDetails = data;
                            })
                    });
            },

            inserInMediaLibrary(){
                let resourceId = this.resourceId  
                var data = {
                    'action': 'resourcespace_insert_into_media_library',
                    'resource': this.resourceDetails,
                    'resourceId': resourceId,
                };
                
                var that = this;
                this.disableImport = true;
                this.importing = true;
                $.post(window.ajaxurl, data)
                .then((data)=>{ 
                    if(JSON.parse(data)['uploaded']){
                        this.resourceDetails.imported=1;
                    }else{
                        this.resourceDetails.imported=0;
                    }
                    that.disableImport = false;
                    that.importing = false;
                });
            },
            copyToClipboard(){
                let resourceId = this.resourceId
                let resourceSize = this.selectedSize
                var str = '[resourcespace id=' + resourceId + ']';
                if(resourceSize!='full'){
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
.container{
    display: -webkit-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -webkit-flex-wrap: wrap;
    flex-wrap: wrap;
}
.imgContainer{
    max-width:610px;
    width:610px;
    min-width:300px;
    overflow:hidden;
}
.imgContainer img{
    max-width:100%;
}
.detailsContainer{
    max-width:600px;
    padding-left:20px;
}
.resource-details{
    padding:20px;
}

.resource-details .row-details {
    float:left;
    width:95%;
    padding:5px 15px 5px 0px;
    margin-bottom:10px;
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
.detailsContainer label{
    color:#007aff;
    font-size: 1.4em;
    display:block;
    margin-bottom: 4px;
    font-weight:bold;
}
.blue-buttom{
    width:94%;
    color:white;
    background-color: #007aff;
    font-size: 1.5em;
    padding:8px;
    font-weight:bold;
    text-align: center;
    border-radius: 10px;
    margin: 5px;
    border: 0px;
    font-size: 1.4em;
}

#inserted1:before {
  content: " ";
  display: block;
  border: solid 0.8em #660a5e;
  border-radius: .8em;
  height: 0;
  width: 0;
  position: absolute;
  left: 0.5em;
  top: 40%; 
  margin-top: -0.5em;
}

h2.properties{
    color:#007aff;
    font-size: 2.0em;
    margin:0px 0px 10px 0px;
}
span.details{
    font-size:1.4em
}
.back{
    margin-bottom: 20px;
}
.back a{
    font-size: 1.5em;
    font-weight: bold;
    text-decoration: none;
}
.back a:hover{
    text-decoration: underline;
}
</style>