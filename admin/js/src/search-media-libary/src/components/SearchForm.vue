<template>
    <div class='resourcespace-adra'>
      <div v-if='!selectedResourceId'>
        <div class="resourcespace-adra-search-form" >
          <h1 v-if='showTitle'>Search ResourceSpace</h1>
          
          <div class='adra-main-search-form'>
              <div class='main-input'>
                <input type='text' @input.prevent='update( {fieldName:"resourcespace_search", value:$event.target.value} )' @keyup.enter.prevent="submitSearch" v-model='searchValue'>
              </div>
              <div class='search-button-wrapper'>
                <a href="#" @click.prevent="submitSearch" class="default-button"><i class="fa fa-search" ></i></a>
                <a href="#" @click.prevent="resetSearchForm" class="default-button"><i class="far fa-window-close"></i></a>
                <a href="#" @click.prevent="showResourceType = !showResourceType" class="default-button" v-if='formFields["main_form"]'>Options</a>
                <a href="#" @click.prevent="advancedSerchFormIsExpanded = !advancedSerchFormIsExpanded" class='default-button' v-if='formFields["main_form"]'>Advanced Search</a>
              </div>
              <div>
                <ResourceTypeInput v-if='formFields["main_form"] && showResourceType' :fieldDef='formFields["main_form"]' @input='update'/>
              </div>
          </div>
          <div style='clear:both'></div>

          <div class='adra-advanced-search-form' v-if="advancedSerchFormIsExpanded">
            <AdvancedSearch :formFields='formFields' @input='update'/>
          </div>
          <div style='clear:both'></div>
        </div>    
        <div v-if="searchResultsCounter>0">
          {{ searchResultsCounter + ' results' }}
        </div>
        <div id="rs-results">
          <ResourceList v-for="resource in searchResults" 
            :key="'resourceList_'+resource.ref" 
            :resource=resource
            @selectResource="setSelectedResource" ></ResourceList>
          </div>       
          <infinite-loading  v-if="searchResultsCounter>0" @infinite="loadMore">
            <div slot="no-more">No more resources.</div>
            <div slot="no-results">No more resources.</div>
          </infinite-loading>
          <div v-else>
            <h2 v-if="searchResultsCounter!=-1" style='color:red'>No results</h2>
          </div>
      </div>
      <div v-else>
        <ReseourceDetails :resourceId='selectedResourceId' @hideDetails='doHideDetails'/>
      </div>
    </div>

</template>
<script>
    import ResourceList from './ResourceList.vue';
    import ResourceTypeInput from './ResourceTypeInput.vue';
    import AdvancedSearch from './AdvancedSearch.vue';
    import ReseourceDetails from './ResourceDetails.vue';
    import InfiniteLoading from 'vue-infinite-loading';
    import $ from 'jquery';

    export default {
      name: 'SearchForm',
      props:['onSelect','showTitle','clean'],
      components:{ ResourceList, ResourceTypeInput, AdvancedSearch, InfiniteLoading, ReseourceDetails},
      data: () => ({
        resultsOffset:0,
        offsetStep:20,
        searchedTerm:'',
        formFields:[],
        searchFormSelectedValues:{},
        searchResults:[],
        searchResultsCounter:-1,
        currentResource:0,
        //selectedMonth:moment(),
        showAdvancedForm:false,
        advancedSerchFormIsExpanded:false,
        //tmp:moment(null),       
        
        searchValue:'',
        showNoResults:false,

        containerWidth:0,
        displayOnIndex:-1,
        selectedIndex:-1,
        selectedResourceDetails:false,
        defaultResources:false,

        busy: false,

        currentPage:0,
        selectedResourceId:false,
        canSearch:true,
        showResourceType:false,

      }), 
      watch:{
        clean: function (val) {
          if(val){
            this.searchValue = '';
            this.searchResults = false;
            this.searchFormSelectedValues = {};
          }
        },
      },
      mounted: function() {
        this.getSerchForm();
      },
      methods:{
        doHideDetails( resourceId ){
          this.selectedResourceId=false
        },
        loadMore( $state ){
          if(!this.canSearch){
            $state.complete();
            return false;
          }
          if( this.currentPage < this.searchResultsCounter/this.offsetStep ){
            this.getSearchResults( $state );
          }
          
        },
        resetSearchForm(){
          this.searchValue='';
          this.searchResults='';

          if(this.showAdvancedForm){
            let idx = 0;
            for(idx=0;idx<this.formFields.second_tab.length;idx++){
              this.formFields.second_tab[idx].value = this.formFields.second_tab[idx].default_value;
            }
            for(idx=0;idx<this.formFields.first_tab.length;idx++){
              this.formFields.first_tab[idx].value = this.formFields.first_tab[idx].default_value;
            }
            this.defaultResources.push([]);
            this.formFields.main_form = this.defaultResources;
          }
          this.searchFormSelectedValues=[];
        },
        update(objValue){
          this.searchFormSelectedValues[objValue.fieldName] = objValue.value;
          if(this.formFields.hasOwnProperty('first_tab')){
            for(let i=0;i<this.formFields.first_tab.length;i++ ){
              if(this.formFields.first_tab[i].name==objValue.fieldName){
                this.formFields.first_tab[i].value = objValue.value;
              }
            }
            for(let i=0;i<this.formFields.second_tab.length;i++ ){
              if(this.formFields.second_tab[i].name==objValue.fieldName){
                this.formFields.second_tab[i].value = objValue.value;
              }
            }
          }
        },
        getSerchForm() {
            var queryString = '?action=resourcespace_get_form_fields';
            var that = this;
            fetch(window.ajaxurl + queryString)
                .then((response)=>{
                    return response.json()
                }).then((data)=>{
                    that.formFields = data;
                    if( !this.defaultResources ){
                      that.defaultResources=[];
                      for(let i=0;i<data.main_form.length;i++ ){
                        that.defaultResources.push(data.main_form[i]);
                      }
                    }
                    that.showAdvancedForm=true
                })
        },
        getSearchResults( state = false ) {
          if(state && this.canSearch){
            var data = {
                'action': 'resourcespace_get_search_results',
                'offset': this.resultsOffset,
                'size':'pre',
            };
            for (var p in this.searchFormSelectedValues) {
                if( this.searchFormSelectedValues.hasOwnProperty(p) ) {
                    if( p == 'limit' ){
                      this.offsetStep = this.searchFormSelectedValues[p];
                    }
                    data[p] = this.searchFormSelectedValues[p];
                }
            }
            this.showNoResults = false;
            var that = this;
            $.post(window.ajaxurl, data)
              .then((data)=>{ 
                let dataPart = JSON.parse(data);
                that.searchResults.push( ...dataPart );
                that.currentPage += 1;
                that.resultsOffset += that.offsetStep;
                if(state){
                  if( dataPart.length<that.offsetStep ){
                    state.complete();
                    this.canSearch = false;
                  }else{
                    state.loaded();
                  }
                }
              });
          }else{
            if(state)state.loaded();
          }
        },
        getSearchResultsCounter() {
            var data = {
                'action': 'resourcespace_get_search_results_counter',
            };
            for (var p in this.searchFormSelectedValues) {
                if( this.searchFormSelectedValues.hasOwnProperty(p) ) {
                    if( p != 'limit' ){
                      data[p] = this.searchFormSelectedValues[p];
                    }
                }
            }
            var that = this;
            that.searchResultsCounter = -1;
            $.post(window.ajaxurl, data)
              .then((data)=>{ 
                that.searchResultsCounter = JSON.parse(data);
              });
        },
        submitSearch(){
          this.resultsOffset = 0;
          this.currentPage = 0;
          this.searchResults = [];
          this.canSearch = true;
          this.getSearchResultsCounter();
        },
        setSelectedResource(value){
          if(this.selectedResourceId != value.resourceId){
            this.selectedResourceId = value.resourceId;
            //this.getResourceDetails();
          }
        },
        selectedDate(value){
          if( value ){
            this.searchFormSelectedValues['month_interval'] = value.format('YYYY|MM')+'|01';
          }else{
            this.searchFormSelectedValues['month_interval'] = null;
          }
        },
        resourceSelected( value ){
          this.currentResource = 0;
          this.$emit('resourceSelected', value );
        },
      }
    }
</script>

<style scoped>

  .search-button-wrapper{
      float:left;
      padding-top:10px;
      padding-left:5px;
  }

  .advanced-search-wrapper{
      padding-top:7px;
      float:left;
      padding-left: 9px;
  }
  .advanced-search-wrapper a{
      cursor: pointer;
      font-size:20px;
      margin-left:10px;
  }
  .adra-main-search-form .main-input{
    float:left;
    width:230px;
}
.adra-main-search-form .main-input input{
    height:2.25em;
    padding:2px 9px 2px 9px;
    font-size: 18px;
    max-width:230px;
}
.resourcespace-adra-search-results{
    width:99%;
    overflow-y: scroll;
    float:left;
}

.resourcespace-adra{
    max-height:92%;
    display:flex;
    flex-direction: column;
    padding:10px 20px 10px 20px;
}
.resourcespace-adra h1{
  font-size:1.5em;
  font-weight:bold;
}
.resourcespace-adra-search-form{
  margin-right:5px;
}
.resourcespace-adra-search-form h1::before {
  content: none;
}
a.advanced-search{
  color:black;
  font-size:14px;
  line-height: 14px;
  margin-bottom:5px;
  display:block;
}
a.advanced-search-reset{
  color:black;
  font-size:14px;
  line-height: 14px;
  display:block;
}
#rs-results{
  line-height: 0 ;
  -webkit-column-count: 5 ;
  -webkit-column-gap:   2px ;
  -moz-column-count:    5 ;
  -moz-column-gap:      2px ;
  column-count:         5 ;
  column-gap:           2px ; 
}
.adra-main-search-form .default-button{
  color:#007aff;
  font-size: 1.6em;
  margin-right:7px;
}
.adra-main-search-form .default-button i{
  color:#007aff;
}

@media (max-width: 1400px) {
  #rs-results {
  -moz-column-count:    4;
  -webkit-column-count: 4;
  column-count:         4;
  }
}
@media (max-width: 1000px) {
  #rs-results {
  -moz-column-count:    3;
  -webkit-column-count: 3;
  column-count:         3;
  }
}
@media (max-width: 800px) {
  #rs-results {
  -moz-column-count:    2;
  -webkit-column-count: 2;
  column-count:         2;
  }
}
@media (max-width: 400px) {
  #rs-results {
  -moz-column-count:    1;
  -webkit-column-count: 1;
  column-count:         1;
  }
}
</style>
