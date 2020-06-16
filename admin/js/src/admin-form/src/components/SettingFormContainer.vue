<template>
  <div class="settings-form">
    <h1>ResourceSpace Settings</h1>
    
    <ApiCredentials :credentials='settings.apiCredentials' @apiCredentialsUpdated='apiCredentialsUpdated'/>
    
    <ResourcespaceSettingsRoles :roles='settings.roles'  @roleRightsUpdated='roleRightsUpdated'/>
    <hr />
    <MediaLibraryMap :first_tab='first_tab' :second_tab='second_tab' :mediaLibaryFields="mediaLibaryFields" @mediaLibaryFieldsUpdated='mediaLibaryFieldsUpdated'/>
    <hr />
    <SearchFieldsSetup v-if='searchFormSettings' :settings='searchFormSettings' :first_tab='first_tab' :second_tab='second_tab' @searchFormFieldsUpdated='searchFormFieldsUpdated'/>

    <div v-if='loading'>
      <div  class="fa-3x">
          <center><i class="fas fa-spinner fa-spin"></i></center>
      </div>
    </div>

    <div v-if='showError'>
      <h2 style='color:red'>Cannot connect to server!</h2>
    </div>

    <p class="submit">
        <input type="submit" name="Submit" class="button-primary" value="Save Changes" @click='doSubmit'/>
    </p>

  </div>
</template>

<script>
import ApiCredentials from './ApiCredentials.vue';
import ResourcespaceSettingsRoles from './ResourcespaceSettingsRoles.vue';
import SearchFieldsSetup from './SearchFieldsSetup.vue';
import MediaLibraryMap from './MediaLibraryMap.vue';
import $ from 'jquery'
//import axios from 'axios'

export default {
  name: 'SettingFormContainer',
  props: ['settings'],
  components: {
    ResourcespaceSettingsRoles,
    SearchFieldsSetup,
    ApiCredentials,
    MediaLibraryMap,
  },
  data: () => ({
    loading:false,
    showError:false,

    roles:[],
    mediaLibaryFields:{},
    apiCredentials:{},
    searchFormSettings:false,
    first_tab:{},
    second_tab:{},
  }),
  mounted() {
    this.apiCredentials = window.settingsData.apiCredentials;
    this.roles = window.settingsData.roles;
    if( typeof window.settingsData.mediaLibaryFields != 'undefined'){
      this.mediaLibaryFields = window.settingsData.mediaLibaryFields;
    }
    this.getSearchFormFields();
  },
  methods: {
    getSearchFormFields() {
      this.searchFormSettings = false;


      this.loading = true;
      this.showError = false;
      var queryString = '?action=resourcespace_get_form_fields';
      var that = this;
      fetch(window.ajaxurl + queryString)
          .then((response)=>{
              return response.json()
          })
          .then((data)=>{
              that.searchFormSettings = true;
              that.first_tab = data.first_tab;
              that.second_tab = data.second_tab;
              that.loading = false;
              if( data == 'false' || !data ){
                that.showError = true;
              }
              //that.showAdvancedForm=true
          })
          .catch(function() {
            that.searchFormSettings = false;
            that.loading = false;
            that.showError = true;
          });
    },
    apiCredentialsUpdated( value ){
      this.apiCredentials = value;
    },
    searchFormFieldsUpdated( value ){
      this.first_tab = value.first_tab;
      this.second_tab = value.second_tab;
    },
    roleRightsUpdated( value ){
      this.roles = value;
    },
    mediaLibaryFieldsUpdated( value ){
      this.mediaLibaryFields = value;
    },
    doSubmit(){
      var data_obj = {action:'resourcespace_save_plugin_settings'};
      data_obj.roles = this.roles;
      data_obj.apiCredentials = this.apiCredentials;
      data_obj.first_tab = this.first_tab;
      data_obj.second_tab = this.second_tab;
      data_obj.mediaLibaryFields = this.mediaLibaryFields;
      var that = this;
      $.post(window.ajaxurl, data_obj)
        .then((data)=>{ 
          that.getSearchFormFields();
        })
        .catch(function() {
          that.getSearchFormFields();
        });
      }
  }

  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>