<template>
    <div class='resourcespace-adra'>
      <div class="resourcespace-adra-search-form">
        <h1 v-if='showTitle'>Search ResourceSpace</h1>
        
        <div class='adra-main-search-form'>
            <div class='main-input'>
              <input type='text' @input.prevent='update( {fieldName:"resourcespace_search", value:$event.target.value} )' @keyup.enter.prevent="submitSearch" v-model='searchValue'>
            </div>
            <div class='search-button-wrapper'>
              <a href="#" @click="submitSearch" class="button-primary1"><i class="fa fa-search search-button" ></i></a>
            </div>
            <div class='advanced-search-wrapper'>
              <a  v-if="showAdvancedForm" @click="advancedSerchFormIsExpanded = !advancedSerchFormIsExpanded" class='advanced-search'>Advanced Search</a>
              <a  v-if="showAdvancedForm" @click="resetSearchForm" class='advanced-search advanced-search-reset'>Reset</a>
            </div>
            <div>
              <ResourceTypeInput v-if='formFields["main_form"]' :fieldDef='formFields["main_form"]' @input='update'/>
            </div>
        </div>
        <div style='clear:both'></div>

        <div class='adra-advanced-search-form' v-if="advancedSerchFormIsExpanded">
          <AdvancedSearch :formFields='formFields' @input='update'/>
        </div>
        <div style='clear:both'></div>
      </div>    
      <div v-if="searchResultsCounter>offsetStep">
        {{ (resultsOffset*1+1) + '-' + (resultsOffset*1+offsetStep*1) + ' of ' +  searchResultsCounter + 'results in ' + Math.ceil(searchResultsCounter/offsetStep) + 'pages' }}
      </div>
      <div class="wrap resourcespace-adra-search-results">
        <ResourceList v-for="(resource,index) in searchResults" :key="'resourceList_'+resource.ref" 
          :resource=resource
          :index='index' 
          :selectedIndex='selectedIndex'
          :displayOnIndex='displayOnIndex'
          :selectedResourceDetails='selectedResourceDetails'
          :onSelect="onSelect" 
          :selectedResourceId="selectedResourceId"  
          @selectResource="setSelectedResource" 
          @resourceSelected="resourceSelected($event)" 
          @resourceMounted='getContainerWidth'></ResourceList>
        <div v-if="showNoResults"><h2 style='color:red'>No results</h2></div>
      </div>
      <div style='clear:both'></div>
      <Paginator v-if='searchResults.length>0' :resultsOffset="resultsOffset" :offsetStep="offsetStep" :searchResultsCounter="searchResultsCounter" @paginate='doPaginate($event)'></Paginator>
      <div style='clear:both'></div>

    </div>
</template>
<script>
    import ResourceList from './ResourceList.vue';
    import ResourceTypeInput from './ResourceTypeInput.vue';
    import AdvancedSearch from './AdvancedSearch.vue';
    import Paginator from './Paginator.vue';
    import $ from 'jquery';

    export default {
      name: 'SearchForm',
      props:['onSelect','showTitle','clean'],
      components:{ ResourceList, ResourceTypeInput, AdvancedSearch, Paginator},
      data: () => ({
        resultsOffset:0,
        offsetStep:20,
        searchedTerm:'',
        formFields:[],
        searchFormSelectedValues:{},
        searchResults:[],
        searchResultsCounter:0,
        currentResource:0,
        showAdvancedForm:false,
        advancedSerchFormIsExpanded:false,
        searchValue:'',
        showNoResults:false,
        containerWidth:0,
        displayOnIndex:-1,
        selectedIndex:-1,
        selectedResourceDetails:false,
        defaultResources:false,
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
        window.addEventListener('resize', this.getContainerWidth);
      },
      methods:{
        doPaginate(value){
          this.resultsOffset += value*this.offsetStep;
          if(this.resultsOffset<0){
            this.resultsOffset = 0;
          }
          this.getSearchResults();
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
        getContainerWidth(){
          var container = document.getElementsByClassName("resourcespace-adra-search-results");
          if(container[0]){
            this.containerWidth = container[0].offsetWidth;
          }
          this.onResizeSetContainer();
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
        getSearchResults() {
          this.selectedResourceDetails = false;
          this.selectedIndex = -1;
          this.advancedSerchFormIsExpanded = false;
          this.searchResults = [];
          var data = {
              'action': 'resourcespace_get_search_results',
              'offset': this.resultsOffset,
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
              that.searchResults = JSON.parse(data);
              if( that.searchResults.length==0 ){
                that.showNoResults = true;
              }
            });
        },
        getSearchResultsCounter() {
            this.searchResults = [];
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
            that.searchResultsCounter = 0;
            $.post(window.ajaxurl, data)
              .then((data)=>{ 
                that.searchResultsCounter = JSON.parse(data);
              });
        },
        setSearchValues(){
            //this.formFields.forEach( this.setSearchValue );
        },
        setSearchValue(fieldDef, _index){
            this.searchFormSelectedValues[fieldDef.name] = fieldDef.default_value;
        },
        submitSearch(){
          this.resultsOffset = 0;
          this.getSearchResults();
          this.getSearchResultsCounter();
        },
        onResizeSetContainer(){
          if(this.selectedResourceId>0 && this.containerWidth>0 ){
            var colsPerRow = Math.floor(this.containerWidth/197);
            var selectedRow = Math.floor(this.selectedIndex/colsPerRow) + 1;
            var containterDetailIndex = selectedRow * colsPerRow;
            if( containterDetailIndex > this.searchResults.length){
              containterDetailIndex = this.searchResults.length;
            }
            this.displayOnIndex = containterDetailIndex-1;
          }
        },
        setSelectedResource(value){
          this.selectedIndex = value.selectedIndex;

          var colsPerRow = Math.floor(this.containerWidth/197);
          var selectedRow = Math.floor(value.selectedIndex/colsPerRow) + 1;
          var containterDetailIndex = selectedRow * colsPerRow;
          if( containterDetailIndex > this.searchResults.length){
            containterDetailIndex = this.searchResults.length;
          }
          if(this.selectedResourceId != value.resourceId){
            this.selectedResourceId = value.resourceId;
            this.displayOnIndex = containterDetailIndex-1;
            this.getResourceDetails();
          }else{
            this.selectedResourceId = 0;
            this.displayOnIndex = -1;
          }
        },
        hideDetails(value){
            this.currentResource = 0;
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
        getResourceDetails(){
          if( this.displayOnIndex>=0 ){
            this.selectedResourceDetails = false;
            var queryString = '?action=resourcespace_get_resource_details&resource_id=' + this.selectedResourceId;
            var that = this;
            fetch(window.ajaxurl + queryString)
                .then((response)=>{
                    return response.json()
                })
                .then((data)=>{
                  if(this.onSelect!='mediaLibrary'){
                    that.selectedResourceDetails = data;
                  }else{
                    var queryString = '?action=resourcespace_check_media_library&resource_id=' + this.selectedResourceId;
                    fetch(window.ajaxurl + queryString)
                        .then((response)=>{
                            return response.json()
                        })
                        .then((checkData)=>{
                          data.imported = checkData
                          that.selectedResourceDetails = data;
                        })
                        .catch( (error) => {
                            data.imported = 0;
                            that.selectedResourceDetails = data;
                        })
                  }
                });
          }
        }
      }
    }
</script>

<style scoped>
  .resourcespace-adra h1{
    font-size:1.5em;
    font-weight:bold;
  }
  .search-button-wrapper{
      float:left;
      padding-top:10px;
      padding-left:5px;
  }
  .search-button{
      font-size:25px;
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
</style>
