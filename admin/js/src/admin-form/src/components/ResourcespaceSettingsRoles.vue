<template>
    <div class='roles-access'>
        <h3>Roles Access</h3>
        <div class='container'>
            <template v-for="(role,index) in roles">
                <div class='role_wrapper' :key='index'>
                    <div class='first-col-role'>{{role.role}}</div>
                    <div class='second-col-role'>
                        <label :for='radionName(role.role) + "enabled"'>Enable</label>
                        <input type='radio' :name='radionName(role.role)' :id='radionName(role.role,"")+"enabled"' value='1' :checked='radionChecked("enable",role.status)' @change='doOnChange(role.role,true)'/><br>

                        <label :for='radionName(role.role) + "disabled"'>Disable</label>
                        <input type='radio' :name='radionName(role.role)' :id='radionName(role.role) + "disabled"' value='0' :checked='radionChecked("diable",role.status)' @change='doOnChange(role.role,false)'/><br>
                    </div>
                </div>
                <div style='clear:both' :key='index'></div>
            </template>
        </div>
        <div style='clear:both'></div>
    </div>
</template>

<script>
export default {
    name: 'ResourcespaceSettingsRoles',
    props: ['roles'],
    methods: {
        radionName(roleName){
            return 'radio_' + roleName; 
        },
        radionChecked(inputCase,inputValue){
            if( inputCase == 'enable' && inputValue==true ){
                return true;
            }
            if( inputCase == 'diable' && inputValue==false ){
                return true;
            } 
            return false; 
        },
        doOnChange( role, newStatus ){
            for (var i = 0; i < this.roles.length; i++) {
                if(this.roles[i].role==role){
                    this.roles[i].status=newStatus;
                }
            }
            this.$emit('roleRightsUpdated', this.roles);
        },
    },
}
</script>

<style scoped>
    .roles-access{

    }
    .roles-access .container{
        float:left;
    }
    .roles-access .container .role_wrapper{
        float:left;
    }
    .roles-access .container .role_wrapper .first-col-role, .roles-access .container .role_wrapper .second-col-role{
        float:left;
        vertical-align: middle;
        height:42px;
    }
    .roles-access .container .role_wrapper .first-col-role{
        padding-top:11px;
        width:100px;
        font-weight: bold;
    }
</style>