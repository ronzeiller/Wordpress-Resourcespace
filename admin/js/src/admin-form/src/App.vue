<template>
  <div id="settingsFrom">
    <SettingFormContainer :settings='settings'/>
  </div>
</template>

<script>
import SettingFormContainer from './components/SettingFormContainer.vue'


export default {
  name: 'settingsFrom',
  components: {
    SettingFormContainer
  },
  data: () => ({
    settings:{}
  }),
  mounted:function () {
    this.settings = window.settingsData
  },
}
</script>

<style>
  #ResourcespaceSettingsForm {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
