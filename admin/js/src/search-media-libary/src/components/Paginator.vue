<template>
    <div class='paginatorP'>
        <div class='wrapperP' :v-if="showPaginator">
            <div class='centerP'>
                <a href='#' @click.prevent="prev()" class='buttonP prev' :style='prevButtonStatus()'>Prev</a>
                <template v-if="searchResultsCounter>offsetStep">
                    <input :value='Math.round(resultsOffset/offsetStep)+1' ref='pagInput' class='inputPaginator'  @keyup.enter.prevent="doPaginate()"/>
                </template>
                <a href='#' @click.prevent="next()" class='buttonP next' :style='nextButtonStatus()'>Next</a>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props:['resultsOffset','offsetStep','searchResultsCounter'],
    data: () => ({
        showPaginator:true,
    }),
    methods: {
        prev(){
            if(this.resultsOffset!=0){
                this.$emit('paginate',-1);
            }
        },
        next(){
            if(this.resultsOffset*1+this.offsetStep*1 < this.searchResultsCounter*1){
                this.$emit('paginate',1)
            }
        },
        prevButtonStatus(){
            let style={};
            if(this.resultsOffset==0){
                style['background-color']='#d1d1d1';
            }
            return style;
        },
        nextButtonStatus(){
            let style={};
            if(this.resultsOffset*1 + this.offsetStep*1 >= this.searchResultsCounter*1){
                style['background-color']='#d1d1d1';
            }
            return style;
        },
        doPaginate(event){
            let currentPage = this.$refs.pagInput.value.trim();
            if( !Number.isInteger(currentPage*1) || currentPage*1<0 || currentPage*1>Math.round(this.searchResultsCounter/this.offsetStep + 1)){
                this.$refs.pagInput.value = Math.round(this.resultsOffset/this.offsetStep)+1; 
            }else{
                let newPageOffset = currentPage - Math.round(this.resultsOffset/this.offsetStep) -1;
                this.$emit('paginate',newPageOffset)
            }
        }
    },
}
</script>
<style scoped>
    div.paginatorP{
        width:100%;
        clear:both;
        height:30px;
    }
    .wrapperP{
        width:100%;
        height:30px;
    }
    .centerP{
        width:200px;
        margin:auto;
        height:30px;
    }
    a.buttonP{
        display:block;
        background-color:black;
        color:white;
        padding:5px;
        width:70px;
        text-align: center;
    }
    a.prev{
        float:left;
    }
    a.next{
        float:right;
    }
    .inputPaginator{
        width:30px;
        margin-left:5px;
        padding-left:5px;
    }
</style>