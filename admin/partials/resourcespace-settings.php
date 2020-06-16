
<script>
    window.settingsData = {
        apiCredentials:<?php print json_encode($this->get_api_credentials_json());?>,
        roles:<?php print json_encode($this->get_roles_rights_json());?>,
        mediaLibaryFields:<?php print json_encode($this->get_media_library_fields_json());?>,
        searchFormSettings:false,
    }

    jQuery(document).ready(function($) {
        vueApp = window.displaySettingFrom();
    });
</script>
<div class="wrap">
    <div id=ResourcespaceSettingsForm></div>
</div>


