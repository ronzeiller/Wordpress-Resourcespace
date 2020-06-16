<template>
    <div id='api-credentials' v-if="credentials">
        <h3>API Details</h3>
        
        <p>ResourceSpace URL
        <input type="text" name="resourcespace_url" v-model="credentials.resourcespace_url" size="20" @blur="sendCredentials()"><br>
        like - https://codecide.trial.resourcespace.com/api/
        </p><hr />

        <p>ResourceSpace User 
            <input type="text" name="resourcespace_user" v-model="credentials.resourcespace_user" size="20" @blur="sendCredentials()">
        </p><hr />

        <p>ResourceSpace Key 
            <input type="text" name="resourcespace_key" v-model="credentials.resourcespace_key" size="20" @blur="sendCredentials()">
        </p><hr />

    </div>
</template>

<script>
export default {
    name: 'ApiCredentials',
    props:['credentials'],
    data: () => ({
    
    }),
    mounted:function () {
    },
    methods: {
        sendCredentials(){
            this.$emit('apiCredentialsUpdated', this.credentials)
        },
    }
}
</script>