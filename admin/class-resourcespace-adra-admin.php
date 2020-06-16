<?php

/**
 * The admin-specific functionality of the plugin.
 *
 * @link       https://adrian.com
 * @since      1.0.0
 *
 * @package    Resourcespace_Adra
 * @subpackage Resourcespace_Adra/admin
 */

/**
 * The admin-specific functionality of the plugin.
 *
 * Defines the plugin name, version, and two examples hooks for how to
 * enqueue the admin-specific stylesheet and JavaScript.
 *
 * @package    Resourcespace_Adra
 * @subpackage Resourcespace_Adra/admin
 * @author     Adrian <adrian@codecide.net>
 */
class Resourcespace_Adra_Admin
{

    /**
     * The ID of this plugin.
     *
     * @since    1.0.0
     * @access   private
     * @var      string    $plugin_name    The ID of this plugin.
     */
    private $plugin_name;

    /**
     * The version of this plugin.
     *
     * @since    1.0.0
     * @access   private
     * @var      string    $version    The current version of this plugin.
     */
    private $version;

    /**
     * Initialize the class and set its properties.
     *
     * @since    1.0.0
     * @param      string    $plugin_name       The name of this plugin.
     * @param      string    $version    The version of this plugin.
     */
    public function __construct($plugin_name, $version)
    {

        $this->plugin_name = $plugin_name;
        $this->version = $version;

    }

    /**
     * Register the stylesheets for the admin area.
     *
     * @since    1.0.0
     */
    public function enqueue_styles()
    {

        /**
         * This function is provided for demonstration purposes only.
         *
         * An instance of this class should be passed to the run() function
         * defined in Resourcespace_Adra_Loader as all of the hooks are defined
         * in that particular class.
         *
         * The Resourcespace_Adra_Loader will then create the relationship
         * between the defined hooks and the functions defined in this
         * class.
         */

        //wp_enqueue_style( $this->plugin_name, plugin_dir_url( __FILE__ ) . 'css/resourcespace-adra-admin.css', array(), $this->version, 'all' );
        //wp_enqueue_style( $this->plugin_name.'_selector', plugin_dir_url( __FILE__ ) . 'css/resourcespace-adra-admin-month-selector.css', array(), $this->version, 'all' );

        $wp_scripts = wp_scripts();
        wp_enqueue_style(
            'jquery-ui-theme-smoothness',
            sprintf('//ajax.googleapis.com/ajax/libs/jqueryui/%s/themes/smoothness/jquery-ui.css', // working for https as well now
                $wp_scripts->registered['jquery-ui-core']->ver
            )
        );

    }

    /**
     * Register the JavaScript for the admin area.
     *
     * @since    1.0.0
     */
    public function enqueue_scripts()
    {

        /**
         * This function is provided for demonstration purposes only.
         *
         * An instance of this class should be passed to the run() function
         * defined in Resourcespace_Adra_Loader as all of the hooks are defined
         * in that particular class.
         *
         * The Resourcespace_Adra_Loader will then create the relationship
         * between the defined hooks and the functions defined in this
         * class.
         */

        wp_enqueue_script('moment', 'https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.24.0/moment.min.js', [], '2.24.0');
        //wp_enqueue_script('vue', 'https://cdn.jsdelivr.net/npm/vue@2.5.17/dist/vue.js', [], '2.5.17');
        wp_enqueue_style('font-awesome-free', '//use.fontawesome.com/releases/v5.2.0/css/all.css');

        wp_enqueue_style($this->plugin_name . '_setting_form', plugin_dir_url(__FILE__) . 'js/admin-form/css/app.css', array(), $this->version . '-' . filemtime(dirname(__FILE__) . '/js/admin-form/css/app.css'), 'all');
        wp_enqueue_script($this->plugin_name . "_setting_form_protected_vendors", plugin_dir_url(__FILE__) . 'js/admin-form/js/chunk-vendors.js', [], $this->version . '-' . filemtime(dirname(__FILE__) . '/js/admin-form/js/chunk-vendors.js'), true);
        wp_enqueue_script($this->plugin_name . "_setting_form_protected", plugin_dir_url(__FILE__) . 'js/admin-form/js/app.js', [], $this->version . '-' . filemtime(dirname(__FILE__) . '/js/admin-form/js/app.js'), true);

        //wp_enqueue_style( $this->plugin_name.'_setting_form', plugin_dir_url( __FILE__ ) . 'css/resourcespace-setting-form.css', array(), $this->version.'-'.filemtime (dirname( __FILE__ ).'/css/resourcespace-setting-form.css'), 'all' );

        //search form page
        wp_enqueue_style($this->plugin_name . '_wp_search_form_chunk', plugin_dir_url(__FILE__) . 'js/search-form/css/chunk-vendors.css', array(), $this->version . '-' . filemtime(dirname(__FILE__) . '/js/search-form/css/chunk-vendors.css'), 'all');
        wp_enqueue_style($this->plugin_name . '_wp_search_form', plugin_dir_url(__FILE__) . 'js/search-form/css/app.css', array(), $this->version . '-' . filemtime(dirname(__FILE__) . '/js/search-form/css/app.css'), 'all');
        wp_enqueue_script($this->plugin_name . "_wp_search_form_protected_vendors", plugin_dir_url(__FILE__) . 'js/search-form/js/chunk-vendors.js', [], $this->version . '-' . filemtime(dirname(__FILE__) . '/js/search-form/js/chunk-vendors.js'), true);
        wp_enqueue_script($this->plugin_name . "_wp_search_form_protected", plugin_dir_url(__FILE__) . 'js/search-form/js/app.js', [], $this->version . '-' . filemtime(dirname(__FILE__) . '/js/search-form/js/app.js'), true);

        //search form Media Library
        wp_enqueue_style($this->plugin_name . '_wp_search_media_library_form_chunk', plugin_dir_url(__FILE__) . 'js/search-media-libary/css/chunk-vendors.css', array(), $this->version . '-' . filemtime(dirname(__FILE__) . '/js/search-media-libary/css/chunk-vendors.css'), 'all');
        wp_enqueue_style($this->plugin_name . '_wp_search_media_library_form', plugin_dir_url(__FILE__) . 'js/search-media-libary/css/app.css', array(), $this->version . '-' . filemtime(dirname(__FILE__) . '/js/search-media-libary/css/app.css'), 'all');
        wp_enqueue_script($this->plugin_name . "_wp_search_form_media_library_protected_vendors", plugin_dir_url(__FILE__) . 'js/search-media-libary/js/chunk-vendors.js', [], $this->version . '-' . filemtime(dirname(__FILE__) . '/js/search-media-libary/js/chunk-vendors.js'), true);
        wp_enqueue_script($this->plugin_name . "_wp_search_form_media_library_protected", plugin_dir_url(__FILE__) . 'js/search-media-libary/js/app.js', [], $this->version . '-' . filemtime(dirname(__FILE__) . '/js/search-media-libary/js/app.js'), true);

        //media library tab
        wp_enqueue_script($this->plugin_name . "_wp_search_form_medialibrary_tab", plugin_dir_url(__FILE__) . 'js/media-library/index.js', [], $this->version . '-' . filemtime(dirname(__FILE__) . '/js/media-library/index.js'), true);
    }

    public function enque_scripts_elementor()
    {
        $ver_id = $this->version . '-' . filemtime(dirname(__FILE__) . '/js/search-media-libary/js/app.js');
        print "
			<link rel='stylesheet' id='resourcespace-adra_wp_search_media_library_form_chunk-css'  href='" . plugin_dir_url(__FILE__) . "js/search-media-libary/css/chunk-vendors.css?ver=$ver_id' media='all' />
			<link rel='stylesheet' id='resourcespace-adra_wp_search_media_library_form-css'  href='" . plugin_dir_url(__FILE__) . "js/search-media-libary/css/app.css?ver=$ver_id' media='all' />

			<script src='" . plugin_dir_url(__FILE__) . "js/search-media-libary/js/chunk-vendors.js?ver=$ver_id'></script>
			<script src='" . plugin_dir_url(__FILE__) . "js/search-media-libary/js/app.js?ver=$ver_id'></script>
			<script src='" . plugin_dir_url(__FILE__) . "js/media-library/index.js?ver=$ver_id'></script>
		";
    }

    public function enqueue_media_library_scripts()
    {
        wp_enqueue_script($this->plugin_name . "_wp_search_form_medialibrary_tab", plugin_dir_url(__FILE__) . 'js/media-library/index.js', [], $this->version . '-' . filemtime(dirname(__FILE__) . '/js/media-library/index.js'), true);
    }

    public function do_admin_init()
    {
        if (is_plugin_active('private-repository/private-repository.php')) {
            new \PrivateRepository\Updater\WpGetUpdater(
                [
                    'WPGET_REPO_SLUG' => 'resourc',
                    'WPGET_PACKAGE_NAME' => 'resourcespace',
                    'WPGET_API_URL' => 'http://thepluginfactory.xyz:3000/web/',
                    'WPGET_TOKEN_READ' => 'xO1s5hprKE4xfjxbaZlwSqjCaAjX30',
                    'WPGET_PLUGIN_FILE' => 'resourcespace.php',
                    'WPGET_PLUGIN_DIR' => 'resourcespace',
                ]
            );
        } else {
            add_action('admin_notices', array($this, 'resourcespace_updater_missing'));
        }
    }
    public function resourcespace_updater_missing()
    {
        ?>
		<div class="error notice">
			<p><?php _e("ResourceSpace Plugin - plugin's updater missing. Please activate 'Private Repository' plugin ");?></p>
		</div>
<?php
}

    public function create_admin_menu()
    {

        add_menu_page('ResourceSpace', 'ResourceSpace', RESOURCESPACE_SEARCH_CAPACITY, 'resourcespace-top-level', array($this, 'resourcespace_list'));
        add_submenu_page('resourcespace-top-level', 'ResourceSpace Options', 'ResourceSpace Options', RESOURCESPACE_SEARCH_CAPACITY, 'resourcespace-options', array($this, 'resourcespace_options'));

    }

    public function resourcespace_list()
    {
        include 'partials/resourcespace-list.php';
    }

    public function resourcespace_options()
    {
        include 'partials/resourcespace-settings.php';
    }

    public function create_admin_end_points()
    {
        add_action('wp_ajax_resourcespace_get_form_fields', [$this, 'get_form_fields']);
        add_action('wp_ajax_resourcespace_get_search_results', [$this, 'get_search_results']);
        add_action('wp_ajax_resourcespace_get_search_results_counter', [$this, 'get_search_results_counter']);
        add_action('wp_ajax_resourcespace_get_resource_details', [$this, 'get_resource_details']);

        add_action('wp_ajax_resourcespace_save_plugin_settings', [$this, 'save_plugin_settings']);

        add_action('wp_ajax_resourcespace_insert_into_media_library', [$this, 'insert_into_media_library']);
        add_action('wp_ajax_resourcespace_check_media_library', [$this, 'check_media_library']);
    }

    public function create_media_libary_custom_fields()
    {
        add_filter('attachment_fields_to_edit', [$this, 'custom_media_add_media_custom_field'], null, 2);
        add_action('edit_attachment', [$this, 'custom_media_save_attachment']);
    }

    public function create_classic_editor_button()
    {
        //elementor

        if (!$this->check_user_capacity()) {
            return false;
        }

        wp_enqueue_script('jquery-ui-widget');
        wp_enqueue_script('jquery-ui-dialog');
        wp_enqueue_script('media_button', plugin_dir_url(__FILE__) . 'js/adra-classic.js', array('jquery'), '1.0', true);
        add_action('media_buttons', [$this, 'add_classic_editor_button']);
        wp_enqueue_style($this->plugin_name . '-selector', plugin_dir_url(__FILE__) . 'css/resourcespace-classic-editor.css', array(), $this->version, 'all');

        add_filter("mce_external_plugins", array($this, 'mce_plugin'));
        //add_filter("mce_buttons", array($this, 'mce_button'));
        add_action('admin_head', array($this, 'admin_head'));
        add_action('wp_ajax_resourcespace_get_rendered_shortcode', [$this, 'get_rendered_shortcode']);

    }

    public function get_search_results_counter()
    {
        $opt_val = $this->get_config_values();
        $resourcespace = new resourcespace($opt_val['api_credentials']);
        $search_params = $resourcespace->create_search_array($_REQUEST);
        if ($search_params['param5']) {
            unset($search_params['param5']);
        }
        $search_results = $resourcespace->advanced_search($search_params);
        exit(json_encode(count($search_results)));
    }

    public function get_search_results()
    {
        $opt_val = $this->get_config_values();
        $resourcespace = new resourcespace($opt_val['api_credentials']);
        $search_params = $resourcespace->create_search_array($_REQUEST);
        // $tmp = $resourcespace->advanced_search($search_params);
        // $search_results = $tmp['results'];
        $search_results = $resourcespace->advanced_search($search_params);

        //$search_results['params'] = $search_params;
        //$search_results['efective_params'] = $tmp['params'];
        //$return_array =['search_params'=>$search_results];
        $return_array = [];
        $tmp = [];
        $image_size = isset($_REQUEST['size']) ? $_REQUEST['size'] : 'thm';
        if ($search_results) {
            $refs = array_column($search_results, 'ref'); //php array with arrays
            $refs = '[' . implode(",", $refs) . ']'; //convert to string json array
            $resource_urls = $resourcespace->get_resource_path($refs, $image_size); //object with images urls
            foreach ($search_results as $resource) {
                if (isset($resource->ref) && $resource->ref > 0) {
                    $resource_url = isset($resource_urls->{$resource->ref}) ? $resource_urls->{$resource->ref} : $this->get_resource_path($result->ref, $image_size);
                    $return_array[] = [
                        'ref' => $resource->ref,
                        'url' => $resource_url,
                        'filename' => pathinfo($resource_url, PATHINFO_BASENAME),
                    ];
                }
            }

        }
        //$return_array['search_results'] = $search_results;
        //$return_array ['resource_urls'] = $resource_urls;
        exit(json_encode($return_array));
    }
    public function get_resource_details()
    {
        $resource_id = $_REQUEST['resource_id'];
        $opt_val = $this->get_config_values();
        $resourcespace = new resourcespace($opt_val['api_credentials']);
        $details = $resourcespace->get_resourcespace_details($resource_id);
        exit(json_encode($details));
    }

    public function create_block_editor_button()
    {
        if (!$this->check_user_capacity()) {
            return false;
        }

        wp_enqueue_style($this->plugin_name . '_block_form_style', plugin_dir_url(__FILE__) . '../block-editor/dist/blocks.style.build.css', array(), $this->version . '-' . filemtime(dirname(__FILE__) . '/../block-editor/dist/blocks.style.build.css'), 'all');
        wp_enqueue_style($this->plugin_name . '_block_form_editor', plugin_dir_url(__FILE__) . '../block-editor/dist/blocks.editor.build.css', array(), $this->version . '-' . filemtime(dirname(__FILE__) . '/../block-editor/dist/blocks.editor.build.css'), 'all');

        // Register block editor script for backend.
        wp_register_script(
            'resourcespace-search-block-js', // Handle.
            plugins_url('/block-editor/dist/blocks.build.js', dirname(__FILE__)), // Block.build.js: We register the block here. Built with Webpack.
            array('wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor'), // Dependencies, defined above.
            null, // filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.build.js' ), // Version: filemtime — Gets file modification time.
            true// Enqueue the script in the footer.
        );

        // Register block editor styles for backend.
        wp_register_style(
            'resourcespace-search-block-editor-css', // Handle.
            plugins_url('block-editor/dist/blocks.editor.build.css', dirname(__FILE__)), // Block editor CSS.
            array('wp-edit-blocks'), // Dependency to include the CSS after it.
            null// filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.editor.build.css' ) // Version: File modification time.
        );

        // WP Localized globals. Use dynamic PHP stuff in JavaScript via `cgbGlobal` object.
        wp_localize_script(
            'resourcespace-search-block-js',
            'resourcespaceGlobal', // Array containing dynamic data for a JS Global.
            [
                'pluginDirPath' => plugin_dir_path(__DIR__) . '/block-editor',
                'pluginDirUrl' => plugin_dir_url(__DIR__) . '/block-editor',
                // Add more data here that you want to access from `cgbGlobal` object.
            ]
        );

        register_block_type(
            'resourcespace/block-search', array(
                'style' => 'resourcespace-search-style-css',
                'editor_script' => 'resourcespace-search-block-js',
                'editor_style' => 'resourcespace-search-block-editor-css',
            )
        );

    }
    public function register_adra_button()
    {
        wp_register_script(
            'resroucespace_block_button',
            plugin_dir_url(__FILE__) . 'js/adra-block.js',
            array('wp-blocks', 'wp-element', 'wp-editor')
        );

        register_block_type('resrourcespace-adra/browser', array(
            'editor_script' => 'resroucespace_block_button',
        ));

    }
    public function add_classic_editor_button()
    {
        echo '<a href="#" id="insert-my-media" class="button">ResourceSpace</a>';
    }

    public function admin_head()
    {
        $current_screen = get_current_screen();
        if (!isset($current_screen->id) || $current_screen->base !== 'post') {
            return;
        }
        wp_enqueue_script($this->plugin_name . '-classic-admin', plugin_dir_url(__FILE__) . 'js/resource-editor-view.js', array('shortcode', 'wp-util', 'jquery'), false, true);
    }

    public function mce_plugin($plugin_array)
    {
        $plugin_array['resourcespace_mce'] = plugin_dir_url(__FILE__) . 'js/mce-button-resourcespace-inline.js';
        return $plugin_array;
    }
    public function mce_button($buttons)
    {
        array_push($buttons, 'resourcespace_mce_button');
        return $buttons;
    }
    public function get_rendered_shortcode()
    {
        $html = '';
        if (isset($_REQUEST['action']) && $_REQUEST['action'] == 'resourcespace_get_rendered_shortcode') {
            $attributes = $_REQUEST;
            unset($attributes['action']);
            $html = $this->shortcode_resourcespace_img_private($attributes);
        }
        exit(json_encode(['html' => $html]));
    }
    public function shortcode_resourcespace_img_private($atts)
    {
        $opt_val = $this->get_config_values();
        $resourcespace = new resourcespace($opt_val['api_credentials']);
        $unprocessed_atts = "";
        $resource_id = isset($atts['id']) ? $atts['id'] : '';
        $size_id = isset($atts['id']) ? $atts['size_id'] : '';
        if (is_array($atts)) {
            foreach ($atts as $key => $value) {
                if ($key != 'id' && $key != 'size_id') {
                    $unprocessed_atts .= " " . $key . "='$value'";
                }
            }
        }
        $return = '';
        if ($resource_id != '') {
            if ($size_id != '') {
                $return = "<img src='" . $resourcespace->get_resource_path($resource_id, $size_id) . "' $unprocessed_atts>";
            } else {
                $original_file = $resourcespace->get_original_file($resource_id);
                $ext = pathinfo($original_file, PATHINFO_EXTENSION);
                $array_images = array('jpg', 'gif', 'png');
                $array_video = array('mp4');
                if (in_array($ext, $array_images)) {
                    $return = "<img src='$original_file' $unprocessed_atts>";
                } elseif (in_array($ext, $array_video)) {
                    $return = "
						<video class='video' controls='' $unprocessed_atts>
							<source src='$original_file' type='video/mp4'>
					 		Your browser does not support HTML5 video.
						</video>";
                } else {
                    $return = "<a href='$original_file' target='_blank'>Download</a>";
                }
            }
        };
        return $return;
    }

    public function check_user_capacity()
    {
        $user = wp_get_current_user();
        $have_capacity = false;
        foreach ($user->roles as $role) {
            if ($GLOBALS['wp_roles']->role_objects[$role]->has_cap(RESOURCESPACE_SEARCH_CAPACITY)) {
                $have_capacity = true;
            }
        }

        //
        return $have_capacity;
    }

    private function get_roles_rights_json()
    {
        $roles_array = array();
        $roles = get_editable_roles();
        foreach ($GLOBALS['wp_roles']->role_objects as $key => $role) {
            $has_rights = false;
            if ($role->has_cap(RESOURCESPACE_SEARCH_CAPACITY)) {
                $has_rights = true;
            }
            $roles_array[] = array('role' => $key, 'status' => $has_rights);
        }
        return $roles_array;
    }
    private function get_media_library_fields_json()
    {
        $opt_val = $this->get_config_values();
        if (!isset($opt_val['media_libary_fields'])) {
            return array();
        } else {
            return $opt_val['media_libary_fields'];
        }
    }

    private function get_config_values()
    {
        $opt_val = unserialize(get_option(RESOURCESPACE_OPTION));

        if (!$opt_val || !isset($opt_val['api_credentials'])) {
            $opt_val = array(
                'api_credentials' => array('resourcespace_user' => '', 'resourcespace_key' => '', 'resourcespace_url' => ''),
                'search_form_settings' => array(
                    'first_tab' => array(),
                    'second_tab' => array(),
                    'main_form' => array(),
                ),
            );
        };
        if (!isset($opt_val['search_form_settings']) || !isset($opt_val['search_form_settings']['first_tab']) || !isset($opt_val['search_form_settings']['second_tab'])) {
            $opt_val['search_form_settings'] = array(
                'first_tab' => array(),
                'second_tab' => array(),
                'main_form' => array(),
            );
        }
        return $opt_val;
    }

    private function get_api_credentials_json()
    {
        $opt_val = $this->get_config_values();
        return $opt_val['api_credentials'];
    }

    private function get_form_fields_json()
    {
        $opt_val = $this->get_config_values();

        $resourcespace = new resourcespace($opt_val['api_credentials']);
        $form_fields = $resourcespace->search_form_fields();
        if (!$form_fields) {
            return $form_fields;
        }

        $search_form_settings = $opt_val['search_form_settings'];
        //$search_form_settings['second_tab'] = $form_fields;
        $this->merge_fields($search_form_settings, $form_fields);
        return $search_form_settings;
    }

    private function merge_fields(&$search_form_settings, $form_fields)
    {
        $form_fields[] = array(
            'type' => 'text',
            'name' => 'limit',
            'label' => 'Limit',
            'default_value' => '20',
            'value' => '',
            'display_condition' => '-',
        );

        $main_form_fields = array('resource_id');
        $not_setup_fields = array();
        $search_form_settings['main_form'] = array();
        for ($idx = 0; $idx < count($form_fields); $idx++) {
            if (in_array($form_fields[$idx]['name'], $main_form_fields)) { //set resource_id field
                $search_form_settings['main_form'] = array();
                $default_checked = array('photo', 'image', 'images', 'video', 'img');
                foreach ($form_fields[$idx]['options'] as $option) {
                    $checked = false;
                    if (in_array(strtolower($option['value']), $default_checked)) {
                        $checked = true;
                    }
                    if ($option['key'] != 'all_values') {
                        $search_form_settings['main_form'][] = array(
                            'resourceId' => $option['key'],
                            'label' => $option['value'],
                            'checked' => $checked,
                        );
                    }
                }
            } else { // update main/second tab  fields values
                $not_exists = true;
                for ($jdx = 0; $jdx < count($search_form_settings['first_tab']); $jdx++) {
                    if ($form_fields[$idx]['name'] == $search_form_settings['first_tab'][$jdx]['name']) {
                        $not_exists = false;
                        $search_form_settings['first_tab'][$jdx] = $form_fields[$idx];
                    }
                }
                for ($jdx = 0; $jdx < count($search_form_settings['second_tab']); $jdx++) {
                    if ($form_fields[$idx]['name'] == $search_form_settings['second_tab'][$jdx]['name']) {
                        $not_exists = false;
                        $search_form_settings['second_tab'][$jdx] = $form_fields[$idx];
                    }
                }

                if ($not_exists) {
                    $not_setup_fields[] = $form_fields[$idx];
                }
            }
        }

        $search_form_settings['second_tab'] = array_merge($search_form_settings['second_tab'], $not_setup_fields); //add created metadata fields which has not been defined on setting moment
        //remove deleted metafields which are defined
        $this->remove_deleted_metafields($search_form_settings, $form_fields, 'first_tab');
        $this->remove_deleted_metafields($search_form_settings, $form_fields, 'second_tab');
        $search_form_settings['first_tab'] = array_values($search_form_settings['first_tab']);
        $search_form_settings['second_tab'] = array_values($search_form_settings['second_tab']);

    }

    public function remove_deleted_metafields(&$search_form_settings, $form_fields, $tab)
    {
        $idx = 0;
        $delete_index = 0;
        foreach ($search_form_settings[$tab] as $idx => $current_field) {
            $defined = false;
            for ($jdx = 0; $jdx < count($form_fields); $jdx++) {
                if ($current_field['name'] == $form_fields[$jdx]['name'] || $current_field['name'] == 'limit') {
                    $defined = true;
                }
            }
            if (!$defined) {
                //unset( $search_form_settings[$tab][$idx] );
            }
        }

    }

    public function get_form_fields()
    {
        exit(json_encode($this->get_form_fields_json()));
        $opt_val = $this->get_config_values();
        $resourcespace = new resourcespace($opt_val['api_credentials']);
        $form_fields = $resourcespace->search_form_fields();
        exit(json_encode($form_fields));
    }

    public function save_plugin_settings()
    {
        foreach ($_REQUEST['roles'] as $role_def) {
            $role = $GLOBALS['wp_roles']->role_objects[$role_def['role']];
            $check_variable = ($role_def['status'] === 'true');
            if ($role->has_cap(RESOURCESPACE_SEARCH_CAPACITY) != $check_variable) {
                if ($check_variable) {
                    $role->add_cap(RESOURCESPACE_SEARCH_CAPACITY);
                } else {
                    $role->remove_cap(RESOURCESPACE_SEARCH_CAPACITY);
                }
            }
        }
        $opt_val = array(
            'api_credentials' => $_REQUEST['apiCredentials'],
            'search_form_settings' => array("first_tab" => $_REQUEST['first_tab'], "second_tab" => $_REQUEST['second_tab']),
            'media_libary_fields' => $_REQUEST['mediaLibaryFields'],
        );
        update_option(RESOURCESPACE_OPTION, serialize($opt_val));
        exit(json_encode($opt_val));
    }
    private function getFieldName($field_name)
    {
        if ($field_name == 'metadata_field_') {
            return 0;
        } elseif (strpos($field_name, 'metadata_field') === 0) {
            return substr($field_name, 15);
        } else {
            return $field_name;
        }
    }
    public function insert_into_media_library()
    {
        try {
            $uploaded = true;
            $image_url = $_REQUEST['resource']['orig_file'];
            $upload_dir = wp_upload_dir();

            $image_data = file_get_contents($image_url);
            $filename = basename($image_url);

            if (wp_mkdir_p($upload_dir['path'])) {
                $file = $upload_dir['path'] . '/' . $filename;
            } else {
                $file = $upload_dir['basedir'] . '/' . $filename;
            }
            file_put_contents($file, $image_data);
            $wp_filetype = wp_check_filetype($filename, null);

            $opt_val = $this->get_config_values();
            $attachment = array(
                'post_mime_type' => $wp_filetype['type'],
                'post_status' => 'inherit',
            );

            if (!empty($opt_val['media_libary_fields']['post_title']) && !empty($_REQUEST['resource']['all_fields'][$this->getFieldName($opt_val['media_libary_fields']['post_title'])])) {
                $attachment['post_title'] = $_REQUEST['resource']['all_fields'][$this->getFieldName($opt_val['media_libary_fields']['post_title'])];
            } else {
                $attachment['post_title'] = '';
            }

            if (!empty($opt_val['media_libary_fields']['post_content']) && !empty($_REQUEST['resource']['all_fields'][$this->getFieldName($opt_val['media_libary_fields']['post_content'])])) {
                $attachment['post_content'] = $_REQUEST['resource']['all_fields'][$this->getFieldName($opt_val['media_libary_fields']['post_content'])];
            } else {
                $attachment['post_content'] = '-';
            }

            if (!empty($opt_val['media_libary_fields']['post_author']) && !empty($_REQUEST['resource']['all_fields'][$this->getFieldName($opt_val['media_libary_fields']['post_author'])])) {
                $attachment['post_author'] = $_REQUEST['resource']['all_fields'][$this->getFieldName($opt_val['media_libary_fields']['post_author'])];
            } else {
                $attachment['post_author'] = 'ResourceSpace';
            }

            if (!empty($opt_val['media_libary_fields']['post_excerpt']) && !empty($_REQUEST['resource']['all_fields'][$this->getFieldName($opt_val['media_libary_fields']['post_excerpt'])])) {
                $attachment['post_excerpt'] = $_REQUEST['resource']['all_fields'][$this->getFieldName($opt_val['media_libary_fields']['post_excerpt'])];
            } else {
                $attachment['post_excerpt'] = '';
            }

            if (!empty($opt_val['media_libary_fields']['_wp_attachment_image_alt']) && !empty($_REQUEST['resource']['all_fields'][$this->getFieldName($opt_val['media_libary_fields']['_wp_attachment_image_alt'])])) {
                $_wp_attachment_image_alt = $_REQUEST['resource']['all_fields'][$this->getFieldName($opt_val['media_libary_fields']['_wp_attachment_image_alt'])];
            } else {
                $_wp_attachment_image_alt = '';
            }

            $attach_id = wp_insert_attachment($attachment, $file);
            require_once ABSPATH . 'wp-admin/includes/image.php';
            $attach_data = wp_generate_attachment_metadata($attach_id, $file);
            wp_update_attachment_metadata($attach_id, $attach_data);
            update_post_meta($attach_id, 'post_resource_space_id', $_REQUEST['resourceId']);
            update_post_meta($attach_id, '_wp_attachment_image_alt', $_wp_attachment_image_alt);
        } catch (Exception $e) {
            $uploaded = false;
        }
        $return = array('uploaded' => $uploaded);
        exit(json_encode($return));
    }
    public function check_media_library()
    {
        $query_images_args = array(
            'post_type' => 'attachment',
            //'post_mime_type' => 'image',
            'post_status' => 'inherit',
            'posts_per_page' => -1,
            //'post_content' => $_REQUEST['resource_id'],
            //'post_resource_space_id' => $_REQUEST['resource_id'],
            'meta_key' => 'post_resource_space_id',
            'meta_value' => $_REQUEST['resource_id'],
        );
        $query_images = new WP_Query($query_images_args);
        exit(json_encode($query_images->post_count));
    }

    public function custom_media_add_media_custom_field($form_fields, $post)
    {
        $field_value = get_post_meta($post->ID, 'post_resource_space_id', true);

        $form_fields['post_resource_space_id'] = array(
            'value' => $field_value ? $field_value : '',
            'label' => __('ResourceSpace ID'),
            'input' => 'text',
            'disabled' => true,
            'required' => false,
            'custom_attributes' => array('readonly' => 'readonly'),
            'readonly' => 'readonly',
        );

        return $form_fields;
    }
    public function custom_media_save_attachment($attachment_id)
    {
        if (isset($_REQUEST['attachments'][$attachment_id]['post_resource_space_id'])) {
            $post_resource_space_id = $_REQUEST['attachments'][$attachment_id]['post_resource_space_id'];
            update_post_meta($attachment_id, 'post_resource_space_id', $post_resource_space_id);

        }
    }

}
